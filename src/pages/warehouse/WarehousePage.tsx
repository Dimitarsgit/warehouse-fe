import React from 'react';
import { Layout } from '../../layout';
import { WarehouseForm } from './WarehouseForm.component';
import { WarehouseList } from './WarehouseList';
import { Box } from '@mui/material';

export const WarehousePage = () => {
  return (
    <Layout>
      <Box>
        <WarehouseForm />
        <WarehouseList />
      </Box>
    </Layout>
  );
};
