import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export const useTransactionColumns = (): GridColDef<GridValidRowModel>[] => {
  return [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.1,
      valueGetter: ({ row }) => row.item.name,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.1,
      align: 'center',
      headerAlign: 'center',
    },
  ];
};
