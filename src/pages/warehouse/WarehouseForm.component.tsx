import React from 'react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { Warehouse } from './types';
import { CREATE_WAREHOUSE, GET_WAREHOUSES } from '../../graphql/warehouse.gql';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  capacity: Yup.string()
    .matches(/^[0-9]+$/, { message: 'Capacity should match /^[0-9]+$/' })
    .required('Capacity is required'),
});

const initialValues = {
  name: '',
  capacity: '',
};

export const WarehouseForm = () => {
  const [createItem, { loading, error }] = useMutation<Warehouse>(
    CREATE_WAREHOUSE,
    {
      refetchQueries: [GET_WAREHOUSES],
    },
  );

  const { handleSubmit, resetForm, errors, handleChange, values } = useFormik<
    Partial<Warehouse>
  >({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: ({ capacity, ...rest }) => {
      createItem({
        variables: {
          input: {
            capacity: Number(capacity),
            ...rest,
          },
        },
      }).then(() => {
        resetForm();
      });
    },
  });

  return (
    <Stack alignItems="center" mt={2} maxHeight="25vh">
      <form onSubmit={handleSubmit}>
        <Stack component={Paper} alignContent="center" p={2} width={'50vw'}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            textAlign="center"
          >
            Add Warehouse
          </Typography>
          {error ? (
            <Typography
              variant="h6"
              gutterBottom
              color="error"
              textAlign="center"
            >
              {error.message}
            </Typography>
          ) : null}
          <Stack gap={2}>
            <Stack direction="row" gap={2}>
              <TextField
                disabled={loading}
                label="Name"
                name="name"
                value={values.name}
                helperText={errors.name}
                error={!!errors?.name}
                onChange={handleChange}
                variant="filled"
                fullWidth
              />
              <TextField
                disabled={loading}
                label="Capacity"
                name="capacity"
                value={values.capacity}
                helperText={errors?.capacity ? errors.capacity : ''}
                error={!!errors?.capacity}
                onChange={handleChange}
                variant="filled"
                fullWidth
              />
            </Stack>
            <Stack direction="row" justifyContent="end">
              <Button variant="outlined" type="submit">
                Add
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
