import React from 'react';
import { Layout } from '../../layout';
import { ItemForm } from './ItemForm';
import { ItemList } from './ItemList';
import { Box } from '@mui/material';

export const ItemPage = () => {
  return (
    <Layout>
      <Box>
        <ItemForm />
        <ItemList />
      </Box>
    </Layout>
  );
};
