export type WarehouseItem = {
  id: number;
  warehouseId: number;
  itemId: number;
  quantity: number;
};

export type Item = {
  id: number;
  width: string;
  length: string;
  height: string;
  name: string;
  isHazardous: boolean;
  warehouseItem?: WarehouseItem;
};

export type GetItemsResponse = {
  items: Item[];
};
