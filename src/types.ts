export type ABI = ABIItem[]

export interface ABIItem {
  type: string
  name?: string
  inputs: ABIInput[]
}

export interface ABIInput {
  name: string
  type: string
  components: any
}

export type Contract = {
  abi: any
  address: string
  name: string
}

export interface NetworkInfo {
  url: string
  id?: number
  label?: string
}

export enum Unit {
  Eth = 'eth',
  Gwei = 'gwei',
  Wei = 'wei',
}
