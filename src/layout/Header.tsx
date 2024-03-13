import React, { FC } from 'react';
import { Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  to: string;
  title: string;
};
const StyledRouterLink: FC<Props> = ({ to, title }) => (
  <Link component={RouterLink} to={to} underline="none">
    <Typography>{title}</Typography>
  </Link>
);

export const Header = () => {
  return (
    <Stack
      direction="row"
      gap={2}
      p={2}
      sx={{ backgroundColor: '#ffffff14' }}
      justifyContent="center"
    >
      <StyledRouterLink to={'/'} title="TRANSACTION" />
      <StyledRouterLink to={'/item'} title="ITEM" />
      <StyledRouterLink to={'/warehouse'} title="WAREHOUSE" />
    </Stack>
  );
};
