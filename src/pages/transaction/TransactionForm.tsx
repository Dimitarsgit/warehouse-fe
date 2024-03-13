import React, { FC, useEffect, useMemo } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ITEMS } from '../../graphql/item.gql';
import { GetItemsResponse, Item } from '../item/types';
import { TransactionInput, TransactionType } from './types';
import { useFormik } from 'formik';
import { Error, Title } from '../../common';
import * as Yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { GET_WAREHOUSE_TRANSACTION_DATA } from '../../graphql/warehouse.gql';
import { CREATE_TRANSACTION } from '../../graphql/transaction.gql';

const validationSchema = Yup.object().shape({
  itemId: Yup.string().required('Item is required'),
  type: Yup.string().required('Type is required'),
  warehouseId: Yup.number()
    .min(1, 'Warehouse is required')
    .required('Warehouse is required'),
  quantity: Yup.string()
    .matches(/^[0-9]+$/, { message: 'Quantity should match /^[0-9]+$/' })
    .required('Quantity is required'),
  datetime: Yup.date().required('Date is required'),
});

const initialValues = {
  itemId: '',
  type: TransactionType.Export,
  quantity: '',
  datetime: new Date().toISOString(),
};

type Props = {
  warehouseId: number;
};
export const TransactionForm: FC<Props> = ({ warehouseId }) => {
  const getItemsQueryState = useQuery<GetItemsResponse>(GET_ITEMS);
  const [createTransaction, createTransactionQueryState] = useMutation<Item>(
    CREATE_TRANSACTION,
    {
      refetchQueries: [GET_WAREHOUSE_TRANSACTION_DATA],
    },
  );

  const {
    handleSubmit,
    resetForm,
    errors,
    handleChange,
    values,
    setFieldValue,
    touched,
    setFieldTouched,
  } = useFormik<Partial<TransactionInput>>({
    initialValues: { ...initialValues, warehouseId },
    validationSchema,
    onSubmit: ({ quantity, ...rest }) => {
      createTransaction({
        variables: {
          input: { quantity: Number(quantity), ...rest },
        },
      })
        .then(() => {
          resetForm();
          setFieldValue('warehouseId', warehouseId);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  useEffect(() => {
    if (getItemsQueryState.data?.items.length) {
      setFieldValue('itemId', getItemsQueryState.data.items[0].id);
    }
  }, [getItemsQueryState.data]);

  useEffect(() => {
    setFieldValue('warehouseId', warehouseId);
  }, [warehouseId]);

  const Items = useMemo(
    () =>
      getItemsQueryState.data?.items.map((item) => (
        <MenuItem value={item.id} key={item.id}>
          {item.name}
        </MenuItem>
      )),
    [getItemsQueryState.data],
  );

  const setTouchedOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFieldTouched(e.target.name);
  };

  const isLoading = useMemo(
    () => getItemsQueryState.loading || createTransactionQueryState.loading,
    [getItemsQueryState.loading, createTransactionQueryState.loading],
  );

  return (
    <Stack alignItems="center" mt={2}>
      <form onSubmit={handleSubmit}>
        <Stack component={Paper} alignContent="center" p={2} width={'50vw'}>
          <Title title="Create Transaction" />
          <Error error={getItemsQueryState.error} />
          <Error error={createTransactionQueryState.error} />
          {errors.warehouseId && touched.warehouseId && (
            <Error error={{ message: errors.warehouseId }} />
          )}

          <Stack gap={2}>
            <Stack direction="row" gap={2}>
              <FormControl fullWidth>
                <InputLabel aria-label="item-select">Item</InputLabel>
                <Select
                  error={!!errors?.itemId && touched.itemId}
                  disabled={isLoading}
                  label="Item"
                  name="itemId"
                  onChange={handleChange}
                  value={values.itemId}
                  id="item-select"
                >
                  {Items}
                </Select>
                <FormHelperText aria-label="item-select">
                  <Typography sx={{ fontSize: '0.75rem' }} color="error">
                    {touched.itemId && errors.itemId}
                  </Typography>
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel aria-label="transaction-type-select">
                  Transaction Type
                </InputLabel>
                <Select
                  disabled={isLoading}
                  id="transaction-type-select"
                  label="Transaction Type"
                  name="type"
                  onChange={handleChange}
                  value={values.type}
                >
                  <MenuItem value={TransactionType.Export}>Export</MenuItem>
                  <MenuItem value={TransactionType.Import}>Import</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" gap={2} justifyContent="space-between">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Controlled picker"
                  value={dayjs(values.datetime!)}
                  onChange={(newValue) => setFieldValue('datetime', newValue)}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                disabled={isLoading}
                label="Quantity"
                name="quantity"
                value={values.quantity}
                onBlur={setTouchedOnBlur}
                helperText={touched.quantity && errors.quantity}
                error={!!errors?.quantity && touched.quantity}
                onChange={handleChange}
                variant="filled"
              />
            </Stack>
            <Stack direction="row" gap={2} justifyContent="flex-end">
              <Button variant="outlined" type="submit" disabled={isLoading}>
                CREATE
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
