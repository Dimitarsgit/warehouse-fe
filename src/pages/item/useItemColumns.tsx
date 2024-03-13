import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const useItemColumns = (): GridColDef<GridValidRowModel>[] => {
  return [
    { field: 'name', headerName: 'Name', flex: 0.1 },
    {
      field: 'width',
      headerName: 'Width',
      flex: 0.1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'length',
      headerName: 'Length',
      flex: 0.1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'height',
      headerName: 'Height',
      flex: 0.1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isHazardous',
      headerName: 'Hazardous',
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
