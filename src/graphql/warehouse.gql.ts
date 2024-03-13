import { gql } from '@apollo/client';

export const GET_WAREHOUSES = gql(`
query Warehouses {
  warehouses {
    remainingCapacity
    name
    id
    capacity
  }
}
`);

export const GET_WAREHOUSE_TRANSACTION_DATA = gql(`
query WarehouseTransactionData($id: ID!,  ) {
  warehouse(id: $id) {
    name,
    capacity
    remainingCapacity
    items {
      id
      name
      isHazardous
      warehouseItem {
        quantity
      }
    }
  }

  transactionsByWarehouseId(id: $id) {
    id
    datetime
    item {
      name
    }
    quantity
    type
  }
}
`);

export const CREATE_WAREHOUSE = gql(`
mutation CreateWarehouse($input: WarehouseInput) {
  createWarehouse(input: $input) {
    id
  }
}
`);
