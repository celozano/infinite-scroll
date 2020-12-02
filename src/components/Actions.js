import { useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import AlertDialog from './AlertDialog';
import useDeleteUser from '../hooks/useDeleteUser';

const Actions = ({ row }) => {
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mutate, { isLoading }] = useDeleteUser();

  const handleOpenClick = () => {
    setOpen(!isOpen);
  };

  const handleCancelClick = () => {
    setOpen(false);
    setError(false);
    setSuccess(false);
  };

  const handleDeleteClick = async () => {
    setError(false);
    try {
      const { code } = await mutate(row.id);
      if (code !== 204) {
        setError('An error occurred, please try again later.');
        return;
      }
      setSuccess('User deleted successfully');
    } catch {
      setError('An error occurred, please try again later.');
    }
  };

  return (
    <Grid container justify="space-between">
      <AlertDialog
        isOpen={isOpen}
        isLoading={isLoading}
        error={error}
        success={success}
        handleCancelClick={handleCancelClick}
        handleDeleteClick={handleDeleteClick}
      />
      <Grid item>
        <IconButton
          size="small"
          color="primary"
          component={Link}
          to={{ pathname: '/edit-user', state: { user: { ...row } } }}
        >
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton size="small" color="primary" onClick={handleOpenClick}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Actions;
