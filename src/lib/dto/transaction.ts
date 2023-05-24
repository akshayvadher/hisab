export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  groupId: string;
  paidById: string;
  paidFor: string[];
  splitOption: 'equal' | 'share' | 'amount' | 'percentage';
  category: 'general';
}
