import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Stack, Typography } from '@mui/material';
import { useItemColumns } from './useItemColumns';
import { GetItemsResponse } from './types';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../../graphql/item.gql';

export const ItemList = () => {
  const { loading, data, error } = useQuery<GetItemsResponse>(GET_ITEMS);
  const columns = useItemColumns();

  return (
    <Stack m={2} alignItems="center">
      <Stack width="50vw" height="60vh" p={2} component={Paper}>
        <Typography variant="h4" gutterBottom component="h1" textAlign="center">
          Stock Master List
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
          rows={data?.items || []}
          columns={columns}
          loading={loading}
        />
      </Stack>
    </Stack>
  );
};
