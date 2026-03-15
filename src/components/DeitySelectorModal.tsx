import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Card,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from '@mui/material/GridLegacy';
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { deityOptions } from "../utils/deityOptions";
import { Language } from "../types/biodata.types";

interface DeitySelectorModalProps {
  open: boolean;
  selectedDeity: string;
  onSelectDeity: (deityId: string) => void;
  onClose: () => void;
  language: Language;
}

const DeitySelectorModal: React.FC<DeitySelectorModalProps> = ({
  open,
  selectedDeity,
  onSelectDeity,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelect = (id: string) => {
    onSelectDeity(id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: { borderRadius: isMobile ? 0 : 3 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        देवतेची प्रतिमा निवडा
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Grid container spacing={2}>
          {deityOptions.map((deity) => {
            const isSelected = selectedDeity === deity.id;

            return (
              <Grid item xs={4} sm={3} key={deity.id}>
                <Card
                  onClick={() => handleSelect(deity.id)}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: 3,
                    border: isSelected
                      ? `2px solid ${theme.palette.secondary.main}`
                      : "1px solid #e0e0e0",
                    position: "relative",
                    transition: "all 0.25s ease",
                    background: isSelected
                      ? "linear-gradient(180deg,#fff8e1,#ffffff)"
                      : "#fff",

                    "&:hover": {
                      transform: "translateY(-4px) scale(1.05)",
                      borderColor: theme.palette.secondary.main,

                      boxShadow: `
        0 6px 14px rgba(0,0,0,0.15),
        0 0 12px rgba(212,175,55,0.45)
      `,

                      background:
                        "linear-gradient(180deg, rgba(255,248,225,0.9), rgba(255,255,255,1))",
                    },
                  }}
                >
                  {/* Deity Image */}

                  <Box
                    sx={{
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    {deity.imagePath && deity.id !== "none" &&
                      <img
                        src={deity.imagePath}
                        alt={deity.id}
                        style={{
                          maxHeight: "60px",
                          objectFit: "contain",
                        }}
                      />}

                  </Box>

                  {/* <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  >
                    {deity.labelMarathi}
                  </Typography> */}

                  {isSelected && (
                    <CheckCircleIcon
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        color: theme.palette.secondary.main,
                        fontSize: 22,
                      }}
                    />
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DeitySelectorModal;