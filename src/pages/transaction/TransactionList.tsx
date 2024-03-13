import React, { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ApolloError } from '@apollo/client';
import { Transaction } from './types';
import { useTransactionColumns } from './useTransactionColumns';

type Props = {
  error?: ApolloError;
  loading: boolean;
  rows: Transaction[];
};
export const TransactionList: FC<Props> = ({ error, loading, rows }) => {
  const transactionColumns = useTransactionColumns();

  return (
    <Stack width="50vw" height="40vh" p={2} component={Paper}>
      <Typography variant="h4" gutterBottom component="h1" textAlign="center">
        Transactions List
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
        columns={transactionColumns}
        loading={loading}
      />
    </Stack>
  );
};
