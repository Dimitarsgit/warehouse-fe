import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { ApolloError } from '@apollo/client';

type Props = {
  error?: ApolloError | { message: string };
};
export const Error: FC<Props> = ({ error }) =>
  error?.message ? (
    <Typography variant="h6" gutterBottom color="error" textAlign="center">
      {error.message}
    </Typography>
  ) : null;
