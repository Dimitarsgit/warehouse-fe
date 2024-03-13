import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Stack, Typography } from '@mui/material';
import { useWarehouseColumns } from './useWarehouseColumns';
import { useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from '../../graphql/warehouse.gql';
import { GetWarehousesResponse } from './types';

export const WarehouseList = () => {
  const columns = useWarehouseColumns();

  const { loading, data, error } =
    useQuery<GetWarehousesResponse>(GET_WAREHOUSES);

  return (
    <Stack m={2} alignItems="center">
      <Stack width="50vw" height="65vh" p={2} component={Paper}>
        <Typography variant="h4" gutterBottom component="h1" textAlign="center">
          Warehouses List
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
          rows={data?.warehouses || []}
          columns={columns}
          loading={loading}
        />
      </Stack>
    </Stack>
  );
};
