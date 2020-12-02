import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Container, Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import UserForm from '../components/UserForm';
import useCreateUser from '../hooks/useCreateUser';
import { parseError } from '../utils';

const AddUser = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [mutate] = useCreateUser();
  const handleSubmit = async ({ name, email, gender, status }) => {
    setError(false);
    try {
      setIsLoading(true);
      const data = await mutate({ name, email, gender, status });

      if (data.code !== 201) {
        const errorMessage = parseError(data);
        setError(errorMessage);
        return;
      }
      setIsOpen(true);
      setIsCreated(true);
    } catch {
      setError('An error occurred, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    history.push('/');
  };

  return (
    <>
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
            {error && (
              <Alert icon={false} severity="error">
                {error}
              </Alert>
            )}
            <Grid item>
              <UserForm
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                isCreated={isCreated}
              />
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Created
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddUser;
