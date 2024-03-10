import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const EditDialog = ({ open, handleClose, rowData, handleSaveChanges }) => {
  const [updatedData, setUpdatedData] = useState({});

  const handleChange = (field, value) => {
    setUpdatedData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = () => {
    handleSaveChanges(updatedData);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Grievance</DialogTitle>
      <DialogContent>
        {Object.keys(rowData).map((key) => (
          <TextField
            key={key}
            margin="normal"
            label={key}
            value={updatedData[key] || rowData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
