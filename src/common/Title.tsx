import React, { FC } from 'react';
import { Typography } from '@mui/material';

type Props = {
  title: string;
};
export const Title: FC<Props> = ({ title }) => {
  return (
    <Typography variant="h4" gutterBottom component="h1" textAlign="center">
      {title}
    </Typography>
  );
};
