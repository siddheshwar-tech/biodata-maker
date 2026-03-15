import React from "react";
import { Box, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface FieldRowProps {
  label: React.ReactNode;
  children: React.ReactNode;
  onDelete?: () => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, children, onDelete }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "30% 65% 5%",
        },
        alignItems: "center",
        gap: 1.5,
        mb: 2,
      }}
    >
      {/* Label */}
      {label}

      {/* Input Field */}
      {children}

      {/* Delete Icon */}
      <Box sx={{ textAlign: "center" }}>
        {onDelete && (
          <IconButton
            size="small"
            color="error"
            onClick={onDelete}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default FieldRow;