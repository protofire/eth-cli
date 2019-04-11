export type ABI = ABIItem[];

export interface ABIItem {
  type: string;
  name?: string;
  inputs: ABIInput[];
}

export interface ABIInput {
  name: string;
  type: string;
  components: any;
}
