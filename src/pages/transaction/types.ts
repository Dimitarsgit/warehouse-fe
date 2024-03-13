import { Item } from '../item/types';
import { Warehouse } from '../warehouse/types';

export enum TransactionType {
  Export = 'export',
  Import = 'import',
}

export type Transaction = {
  datetime: string;
  quantity: number;
  type: TransactionType;
  item: Item;
};

export type TransactionInput = {
  itemId: string;
  warehouseId: number;
  quantity: string;
  datetime: string;
  type: TransactionType;
};

export type WarehouseTransactionResponse = {
  warehouse: Warehouse;
  transactionsByWarehouseId: Transaction[];
};
