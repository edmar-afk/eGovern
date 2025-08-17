import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
function MsViewer({ fileUrl, extension }) {
  const [open, setOpen] = useState(false);
  console.log("url of file in msviewer: ", fileUrl);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let viewerUrl = "";

  if (extension === "pdf") {
    // browser can render PDF directly
    viewerUrl = fileUrl;
  } else if (
    ["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(extension)
  ) {
    // Use Microsoft Office Online viewer
    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
      fileUrl
    )}`;
  }

  return (
    <>
      <button onClick={handleOpen} className="text-blue-600 ml-2 hover:scale-110 duration-300 cursor-pointer">
        <VisibilityIcon />
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "80%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1 }}>
            {viewerUrl ? (
              <iframe
                src={viewerUrl}
                title="File Viewer"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <p>Preview not available for this file type.</p>
            )}
          </Box>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ mt: 1, width: "100px" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default MsViewer;
