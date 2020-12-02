import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import UserForm from '../components/UserForm';
import useSaveUser from '../hooks/useSaveUser';
import { parseError } from '../utils';

const EditUser = ({ location }) => {
  const user = location.state.user;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mutate] = useSaveUser();
  const handleSubmit = async ({
    id = user.id,
    name,
    email,
    gender,
    status,
  }) => {
    setError(false);
    try {
      setIsLoading(true);
      const data = await mutate({ id, name, email, gender, status });

      if (data.code !== 200) {
        const errorMessage = parseError(data);
        setError(errorMessage);
        return;
      }
      setIsOpen(true);
    } catch {
      setError('An error occurred, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
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
              <Typography variant="h4">Edit User</Typography>
            </Grid>
            {error && (
              <Alert icon={false} severity="error">
                {error}
              </Alert>
            )}
            <Grid item>
              <UserForm
                user={user}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Saved
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditUser;
