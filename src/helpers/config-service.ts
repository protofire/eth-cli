import { Interface } from '@ethersproject/abi'
import Conf from 'conf'
import * as fs from 'fs'
import _ from 'lodash'
import * as path from 'path'
import { keccak } from 'ethereumjs-util'

import { Networks, defaultNetworks } from './networks'
import { ABI, ABIInput, ABIItem, Contract } from '../types'
import { Abis, knownAbis } from './knownAbis'
import { add0x } from './utils'

export class ConfigService {
  config: Conf<any>

  constructor(config: Conf<any>) {
    this.config = config
  }

  getPrivateKey = (pk: string, networkId: number) => {
    const addresses = this.config.get('addresses', {})

    // if it's a known address, use its private key; throw error if it doesn't have one
    // otherwise, interpret the parameter as a private key
    const knownAddress = addresses[pk]

    if (!knownAddress) {
      return add0x(pk)
    }

    const knownAddressForNetwork = knownAddress[networkId] || knownAddress['*']

    if (!knownAddressForNetwork) {
      throw new Error(`Selected address doesn't exist on network ${networkId}`)
    }

    if (knownAddressForNetwork.privateKey) {
      return add0x(knownAddressForNetwork.privateKey)
    } else {
      throw new Error("Selected address doesn't have a known private key")
    }
  }

  updateAbis = (abis: any): void => {
    this.config.set('abis', abis)
  }

  getAddresses = () => {
    return this.config.get('addresses', {})
  }

  updateAddresses = (addresses: any) => {
    this.config.set('addresses', addresses)
  }

  getContracts = () => {
    return this.config.get('contracts', {})
  }

  updateContracts = (contracts: any) => {
    this.config.set('contracts', contracts)
  }

  addContract = (name: string, abi: string, address: string) => {
    const contracts = this.getContracts()

    this.updateContracts({
      ...contracts,
      [name]: { abi, address },
    })
  }

  removeContract = (name: string): boolean => {
    const contracts = this.getContracts()

    if (!contracts[name]) {
      return false
    }

    delete contracts[name]

    this.updateContracts(contracts)

    return true
  }

  getContract = (name: string): Maybe<{ abi: string; address: string }> => {
    const contracts = this.getContracts()

    return contracts[name] || null
  }

  getAddress = (name: string, networkId: number) => {
    const addresses = this.getAddresses()

    if (addresses[name]) {
      if (networkId && addresses[name][networkId]) {
        return add0x(addresses[name][networkId].address)
      } else if (addresses[name]['*']) {
        return add0x(addresses[name]['*'].address)
      } else {
        throw new Error(`No known address named ${name}`)
      }
    } else {
      return add0x(name)
    }
  }

  getNetworks = (): Networks => {
    const addedNetworks = this.config.get('networks', {})

    return { ...defaultNetworks, ...addedNetworks }
  }

  getAbis = () => {
    const addedAbis: Abis = this.config.get('abis', {})
    return { ...knownAbis, ...addedAbis }
  }

  getAbiByName = (name: string): object | null => {
    const knownAbis = this.getAbis()
    if (knownAbis[name]) {
      return knownAbis[name]
    }
    return null
  }

  getStringAbiByName = (abiName: string): string | null => {
    const abiObj = this.getAbiByName(abiName)
    if (abiObj) {
      return JSON.stringify(abiObj)
    }
    return abiObj
  }

  getAbiList = (): string[] => {
    const knownAbis = this.getAbis()
    return Object.keys(knownAbis)
  }

  updateNetworks = (networks: Networks): void => {
    this.config.set('networks', networks)
  }

  loadContract = (contract: string, networkId: number): Contract => {
    let abiArg: string
    let addressArg: string
    let name: Maybe<string> = null
    if (contract.indexOf('@') !== -1) {
      ;[abiArg, addressArg] = ConfigService.parseAbiAtAddress(contract)
    } else {
      const knownContract = this.getContract(contract)
      name = _.camelCase(contract)
      if (!knownContract) {
        throw new Error(
          `Unknown contract ${contract}, add one with contract:add or use abi@address syntax`,
        )
      }

      abiArg = knownContract.abi
      addressArg = knownContract.address
    }

    const { abi, name: defaultName } = this.loadABI(abiArg)
    const address = this.getAddress(addressArg, networkId)

    return {
      abi,
      address,
      name: name || defaultName,
    }
  }

  static parseAbiAtAddress = (abiAtAddress: string): [string, string] => {
    const [abi, address] = abiAtAddress.split('@')
    if (!abi || !address) {
      throw new Error(`Invalid argument '${abiAtAddress}', expected <abi>@<contractAddress>`)
    }

    return [abi, address]
  }

  loadABI = (abiPath: string): { abi: any; name: string } => {
    // Try to get the abi from the default list of supported abi's
    let abiStr: string | null = this.getStringAbiByName(abiPath)
    let name: Maybe<string> = null

    if (abiStr) {
      name = _.camelCase(abiPath)
    } else {
      if (fs.existsSync(abiPath)) {
        // If not found, check if the given string is a path to a file
        const [filename] = path.basename(abiPath).split('.')
        name = _.camelCase(filename)
        abiStr = fs.readFileSync(abiPath).toString()
      } else {
        // if it's not a file, check if it's a human readable ABI
        name = 'contract'
        const iface: any = new Interface([abiPath])

        // fix for null components
        const fragment = JSON.parse(JSON.stringify(iface.fragments[0]))
        const inputs = fragment.inputs.map((x: any) => {
          if (x.components === null) {
            delete x.components
          }
          return x
        })
        const outputs = fragment.outputs
          ? fragment.outputs.map((x: any) => {
              if (x.components === null) {
                delete x.components
              }
              return x
            })
          : []
        const fixedFragment = {
          ...fragment,
          inputs,
          outputs,
        }
        abiStr = JSON.stringify([fixedFragment])
      }
    }
    let abi = null

    try {
      abi = JSON.parse(abiStr)

      // Allow using truffle artifacts files too.
      // If abi variable it's an object and it has an abi property, interpret it as a truffle artifact
      if (abi.abi) {
        abi = abi.abi
      }
    } catch (e) {
      console.error('Error parsing abi', e)
      process.exit(1)
    }

    return { abi, name }
  }

  getMethodsAndEvents = (abiPath: string) => {
    const { abi } = this.loadABI(abiPath)

    const methods = ConfigService.extractMethodsAndEventsFromABI(abi).map(
      ({ name, inputs, kind }) => {
        const params = inputs.map((x: ABIInput) => x.type).join(',')
        const signature = `${name}(${params})`
        const signatureHash = keccak(signature)
          .toString('hex')
          .slice(0, 8)

        return { signature, signatureHash, kind }
      },
    )

    return methods
  }

  getMethods = (abiPath: string) => {
    return this.getMethodsAndEvents(abiPath).filter(x => x.kind === 'function')
  }

  getEvents = (abiPath: string) => {
    return this.getMethodsAndEvents(abiPath).filter(x => x.kind === 'event')
  }

  static extractMethodsAndEventsFromABI = (
    abi: ABI,
  ): Array<{ name: string | undefined; inputs: any | undefined; kind: 'function' | 'event' }> => {
    return abi
      .filter((x: ABIItem) => x.type === 'function' || (x.type === 'event' && 'name' in x))
      .map(({ name, inputs, type }) => ({
        name,
        inputs,
        kind: type === 'function' ? 'function' : 'event',
      }))
  }
}

export const configService = new ConfigService(new Conf<any>({ projectName: 'eth-cli' }))
