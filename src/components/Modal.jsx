import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export const SuccessModal = ({ open, handleClose, uid, submissionTime }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Form Submitted Successfully</DialogTitle>
            <DialogContent>
                <p>Your Grievance ID is: {uid}</p>
                <p>Submission Time: {submissionTime}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
