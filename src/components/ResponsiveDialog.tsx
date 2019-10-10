import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type ResponsiveDialogProps = {
  open: boolean,
  title: string,
  content: string,
  buttonAccept: string,
  buttonRefuse: string,
  handleAccept: () => void,
  handleRefuse: () => void,
  handleClose: () => void
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({ open, title, content, buttonAccept, buttonRefuse, handleAccept, handleRefuse, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRefuse} color="primary">
            {buttonRefuse}
          </Button>
          <Button onClick={handleAccept} color="primary" autoFocus>
            {buttonAccept}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResponsiveDialog;