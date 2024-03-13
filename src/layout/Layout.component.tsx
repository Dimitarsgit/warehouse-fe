import { FC, ReactNode } from 'react';
import { Stack } from '@mui/material';
import { Header } from './Header';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Stack height="100vh">
      <Header />
      <Stack ml={4} mr={4} alignItems="center">
        {children}
      </Stack>
    </Stack>
  );
};
