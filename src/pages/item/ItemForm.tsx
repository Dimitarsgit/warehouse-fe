import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_ITEM, GET_ITEMS } from '../../graphql/item.gql';
import { Item } from './types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  width: Yup.string()
    .matches(/^[0-9]+$/, { message: 'Width should match /^[0-9]+$/' })
    .required('Width is required'),
  length: Yup.string()
    .matches(/^[0-9]+$/, { message: 'Length should match /^[0-9]+$/' })
    .required('Length is required'),
  height: Yup.string()
    .matches(/^[0-9]+$/, { message: 'Height should match /^[0-9]+$/' })
    .required('Hength is required'),
  isHazardous: Yup.bool(),
});

const initialValues = {
  name: '',
  width: '',
  length: '',
  height: '',
  isHazardous: false,
};

// Remove component to prevent coonfisions
export const ItemForm = () => {
  const [createItem, { loading, error }] = useMutation<Item>(CREATE_ITEM, {
    refetchQueries: [GET_ITEMS],
  });

  const { handleSubmit, resetForm, errors, handleChange, values } = useFormik<
    Partial<Item>
  >({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async ({ length, width, height, ...rest }) => {
      await createItem({
        variables: {
          input: {
            length: Number(length),
            width: Number(width),
            height: Number(height),
            ...rest,
          },
        },
      });
      resetForm();
    },
  });

  return (
    <Stack alignItems="center" mt={2} maxHeight="30vh">
      <form onSubmit={handleSubmit}>
        <Stack component={Paper} alignContent="center" p={2} width={'50vw'}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            textAlign="center"
          >
            Add Stock
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
                label="Height"
                name="height"
                value={values.height}
                helperText={errors.height}
                error={!!errors?.height}
                onChange={handleChange}
                variant="filled"
                fullWidth
              />
            </Stack>
            <Stack direction="row" gap={2}>
              <TextField
                disabled={loading}
                label="Length"
                name="length"
                helperText={errors.length}
                error={!!errors?.length}
                value={values.length}
                onChange={handleChange}
                variant="filled"
                fullWidth
              />
              <TextField
                disabled={loading}
                label="Width"
                variant="filled"
                name="width"
                value={values.width}
                helperText={errors.width}
                error={!!errors?.width}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <FormControlLabel
                disabled={loading}
                onChange={handleChange}
                name="isHazardous"
                control={<Checkbox checked={values.isHazardous} />}
                label="Is Hazardous:"
                labelPlacement="start"
              />
              <Button variant="outlined" type="submit" disabled={loading}>
                Add
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
