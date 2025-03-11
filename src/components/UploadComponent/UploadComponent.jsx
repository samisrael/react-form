// components/UploadButton.js
import React from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// Reusable UploadButton Component
const UploadButton = ({ onChange, label, accept }) => (
  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
    {label}
    <input
      type="file"
      style={{ display: "none" }}
      accept={accept}
      onChange={onChange}
    />
  </Button>
);

export default UploadButton;
