export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  groupId: string;
  paidById: string;
  paidForIds: string[];
  splitOption: 'equal' | 'share' | 'amount' | 'percentage';
  category: 'general';
  debt: Debt[];
  doc: string;
}

export interface Debt {
  paidById: string;
  paidForId: string;
  amount: number;
}
