import React from "react";
import { Modal, Box, Button } from "@mui/material";

function BackupModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          width: 350,
          mx: "auto",
          mt: "20vh",
        }}
      >
        <h2>Backup Modal</h2>

        <Button variant="contained" color="primary" fullWidth onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default BackupModal;
