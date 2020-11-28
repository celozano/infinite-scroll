import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { createUser } from '../api';

const validationSchema = yup.object({
  name: yup
    .string('Enter you name')
    .required('Full Name is required')
    .max(20)
    .test('alphabets', 'Name cannot contain numbers', (value) => {
      return /^[a-zA-Z\s]*$/.test(value);
    }),
  email: yup
    .string('Enter you email')
    .email('Enter a valid email')
    .required('Email is required'),
  gender: yup.string('Select your gender').required('Gender is required'),
});

const AddUser = () => {
  const [error, setError] = useState(false);
  const [mutate] = useMutation(createUser);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ name, email, gender, status = 'Active' }) => {
      setError(false);
      try {
        const { code } = await mutate({ name, email, gender, status });
        if (code !== 201) {
          setError('An error occurred, please try again later.');
          return;
        }
        history.push('/');
      } catch {
        setError('An error occurred, please try again later.');
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box mt={20}>
        <Grid item>
          <Typography color="primary" component={Link} to="/">
            Back
          </Typography>
        </Grid>
        <Box mt={10}>
          <Grid item>
            <Typography variant="h4">Create User</Typography>
          </Grid>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="name"
                label="Full Name"
                margin="normal"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="email"
                label="Email"
                margin="normal"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                select
                name="gender"
                label="Gender"
                margin="normal"
                variant="outlined"
                fullWidth
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={formik.isSubmitting}
              >
                Create User
              </Button>
            </form>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AddUser;
