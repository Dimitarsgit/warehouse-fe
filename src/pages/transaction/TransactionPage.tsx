import React, { useMemo, useState } from 'react';
import { Layout } from '../../layout';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GetWarehousesResponse } from '../warehouse/types';
import {
  GET_WAREHOUSE_TRANSACTION_DATA,
  GET_WAREHOUSES,
} from '../../graphql/warehouse.gql';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { WarehouseTransactionResponse } from './types';
import { WarehouseItemList } from './WarehouseItemList';
import { TransactionList } from './TransactionList';
import { TransactionForm } from './TransactionForm';
import { Title } from '../../common';
export const TransactionPage = () => {
  const warehouseQueryState = useQuery<GetWarehousesResponse>(GET_WAREHOUSES);

  const [getWarehouseTransactionData, warehouseTransactionQueryState] =
    useLazyQuery<WarehouseTransactionResponse>(GET_WAREHOUSE_TRANSACTION_DATA);

  const [warehouseId, setWarehouseId] = useState('');

  const Warehouses = useMemo(
    () =>
      warehouseQueryState.data?.warehouses.map((warehouse) => (
        <MenuItem value={warehouse.id} key={warehouse.id}>
          {warehouse.name}
        </MenuItem>
      )),
    [warehouseQueryState.data],
  );

  const handleWarehouseSelect = ({ target: { value } }: SelectChangeEvent) => {
    setWarehouseId(value);
    getWarehouseTransactionData({ variables: { id: value } });
  };

  return (
    <Layout>
      <Stack gap={2}>
        <Stack component={Paper} alignContent="center" p={2} width={'50vw'}>
          <FormControl fullWidth>
            <InputLabel>Warehouse</InputLabel>
            <Select
              label="Warehouse"
              onChange={handleWarehouseSelect}
              value={warehouseId}
            >
              {Warehouses}
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          {warehouseTransactionQueryState.data?.warehouse && (
            <Title
              title={`Capacity: ${warehouseTransactionQueryState.data?.warehouse?.remainingCapacity}/${warehouseTransactionQueryState.data?.warehouse?.capacity}`}
            />
          )}
        </Stack>
        <WarehouseItemList
          error={warehouseQueryState.error}
          loading={warehouseQueryState.loading}
          rows={warehouseTransactionQueryState.data?.warehouse?.items || []}
        />
        <TransactionForm warehouseId={Number(warehouseId)} />
        <TransactionList
          rows={
            warehouseTransactionQueryState.data?.transactionsByWarehouseId || []
          }
          loading={warehouseTransactionQueryState.loading}
          error={warehouseTransactionQueryState.error}
        />
      </Stack>
    </Layout>
  );
};
