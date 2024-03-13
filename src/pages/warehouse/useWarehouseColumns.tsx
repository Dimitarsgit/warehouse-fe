import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export const useWarehouseColumns = (): GridColDef<GridValidRowModel>[] => {
  return [
    { field: 'name', headerName: 'Name', flex: 0.1 },
    {
      field: 'capacity',
      headerName: 'Capacity',
      flex: 0.1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'remainingCapacity',
      headerName: 'Remaining Capacity',
      flex: 0.1,
      headerAlign: 'center',
      align: 'center',
    },
  ];
};
