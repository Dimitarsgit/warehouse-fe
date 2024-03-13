import { gql } from '@apollo/client';

export const GET_ITEMS = gql(`
query Items {
    items {
            id
            isHazardous
            length
            height
            name
            width
        }
    }
`);
export const CREATE_ITEM = gql(`
mutation CreateItem($input: ItemInput){
  createItem(input: $input) {
    id
  }
}
`);
