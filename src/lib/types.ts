export type ItemCategory = 'Phone' | 'Wallet' | 'ID' | 'Laptop' | 'Vehicle' | 'Bag' | 'Other';

export const itemCategories: ItemCategory[] = ['Phone', 'Wallet', 'ID', 'Laptop', 'Vehicle', 'Bag', 'Other'];

export type LostItem = {
  id: string;
  userId: string;
  itemName: string;
  category: ItemCategory;
  description: string;
  identifier: string;
  dateLost: string;
  location: string;
  imageUrl: string;
  status: 'Reported' | 'Under Review' | 'Matched' | 'Recovered';
};

export type FoundItem = {
  id: string;
  finderId: string | null; // Can be anonymous
  category: ItemCategory;
  description: string;
  dateFound: string;
  location: string;
  imageUrl: string;
  status: 'Available' | 'Claimed' | 'Archived';
};
