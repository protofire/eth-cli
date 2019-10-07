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

export interface NetworkInfo {
  name: string
  url: string
  id?: number
  label?: string
}
