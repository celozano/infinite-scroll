import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string('Enter you name')
    .required('Full Name is required')
    .max(20)
    .test('alphabets', 'Full Name cannot contain numbers', (value) => {
      return /^[a-zA-Z\s]*$/.test(value);
    }),
  email: yup
    .string('Enter you email')
    .email('Enter a valid email')
    .required('Email is required'),
  gender: yup.string('Select your gender').required('Gender is required'),
  status: yup.string('Select a status').required('Status is required'),
});

const UserForm = ({ user, handleSubmit, isLoading, isCreated }) => {
  const submitButtonText = user ? 'SAVE' : 'CREATE USER';
  const formik = useFormik({
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      gender: user ? user.gender : '',
      status: user ? user.status : '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ name, email, gender, status }) => {
      handleSubmit({ name, email, gender, status });
    },
  });

  return (
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
      <Grid container justify="space-between" spacing={1}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            name="gender"
            label="Gender"
            margin="normal"
            variant="outlined"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            name="status"
            label="Status"
            margin="normal"
            variant="outlined"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={isLoading || isCreated}
      >
        {submitButtonText}
      </Button>
    </form>
  );
};

export default UserForm;
