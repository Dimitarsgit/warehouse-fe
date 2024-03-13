import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const useWarehouseItemsColumns = (): GridColDef<GridValidRowModel>[] => {
  return [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.1,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (values) => values.row.warehouseItem.quantity,
    },
    {
      field: 'isHazardous',
      headerName: 'Is Hazardous',
      flex: 0.1,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row: { isHazardous } }) =>
        isHazardous ? (
          <CheckIcon color="success" />
        ) : (
          <CloseIcon color="error" />
        ),
    },
  ];
};
