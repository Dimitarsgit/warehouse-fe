import React, { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ApolloError } from '@apollo/client';
import { useWarehouseItemsColumns } from './useWarehouseItemsColumns';
import { Item } from '../item/types';

type Props = { loading: boolean; error?: ApolloError; rows: Item[] };
export const WarehouseItemList: FC<Props> = ({ error, rows, loading }) => {
  const warehouseItemColumns = useWarehouseItemsColumns();

  return (
    <Stack width="50vw" height="40vh" p={2} component={Paper}>
      <Typography variant="h4" gutterBottom component="h1" textAlign="center">
        Warehouses Items List
      </Typography>
      {error ? (
        <Typography
          variant="h6"
          gutterBottom
          component="h6"
          textAlign="center"
          color="error"
        >
          {error.message}
        </Typography>
      ) : null}
      <DataGrid
        hideFooter
        rows={rows}
        columns={warehouseItemColumns}
        loading={loading}
      />
    </Stack>
  );
};
