import { Item } from '../item/types';

export type Warehouse = {
  id: number;
  name: string;
  capacity: string;
  remainingCapacity: string;
  items?: Item[];
};

export type GetWarehousesResponse = {
  warehouses: Warehouse[];
};
