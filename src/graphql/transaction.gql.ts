import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql(`
mutation CreateTransaction($input: TransactionInput) {
  createTransaction(input: $input) {
    id,
    quantity
  }
}
`);
