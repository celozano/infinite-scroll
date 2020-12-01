import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const AlertDialog = ({
  isOpen,
  isLoading,
  error,
  success,
  handleCancelClick,
  handleDeleteClick,
}) => {
  const isConfirmation = !error && !success;

  const title = isConfirmation
    ? 'Delete'
    : error
    ? 'Error'
    : success
    ? 'Success'
    : '';

  const content = isConfirmation
    ? 'Are you sure you want to delete this user?'
    : error
    ? 'Failed to delete user'
    : success
    ? 'User deleted'
    : '';

  const cancelButtonText = isConfirmation ? 'Cancel' : 'Close';

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleCancelClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            {cancelButtonText}
          </Button>
          {isConfirmation && (
            <Button
              onClick={handleDeleteClick}
              color="primary"
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
