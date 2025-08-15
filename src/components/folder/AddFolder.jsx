import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  Fade,
  CircularProgress,
} from "@mui/material";
import api from "../../assets/api";
import { getUserInfoFromToken } from "../../utils/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AddFolder({ onFolderCreated }) {
  const token = localStorage.getItem("access");
  const userInfo = getUserInfoFromToken(token);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setName("");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Folder name is required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await api.post(`/api/folders/create/${userInfo.id}/`, {
        name,
      });
      setLoading(false);
      setName("");
      if (onFolderCreated) onFolderCreated(res.data);
      handleClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.name || "Failed to create folder");
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Create New Folder
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        aria-labelledby="create-folder-title"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="create-folder-title" variant="h6" mb={2}>
              Create New Folder
            </Typography>
            <TextField
              label="Folder Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error}
              helperText={error}
              margin="normal"
            />
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
