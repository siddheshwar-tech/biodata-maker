import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Card,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import CloseIcon from '@mui/icons-material/Close';
import { deityOptions } from '../utils/deityOptions';
import { Language } from '../types/biodata.types';

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
  language,
}) => {
  const [tempSelectedDeity, setTempSelectedDeity] = useState(selectedDeity);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleConfirm = () => {
    onSelectDeity(tempSelectedDeity);
    onClose();
  };

  const handleClose = () => {
    setTempSelectedDeity(selectedDeity);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 600,
        }}
      >
        <span>देवतेची प्रतिमा निवडा | Choose Deity Symbol</span>
        <CloseIcon
          onClick={handleClose}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          py: 3,
          px: isMobile ? 2 : 4,
        }}
      >
        <Grid container spacing={2}>
          {deityOptions.map((deity) => {
            const isSelected = tempSelectedDeity === deity.id;
            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={deity.id}
                sx={{
                  display: 'flex',
                }}
              >
                <Card
                  onClick={() => setTempSelectedDeity(deity.id)}
                  sx={{
                    width: '100%',
                    padding: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: isSelected
                      ? `3px solid ${theme.palette.primary.main}`
                      : '2px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      border: `3px solid ${theme.palette.secondary.main}`,
                      transform: 'scale(1.05)',
                      boxShadow: `0 4px 12px rgba(212, 175, 55, 0.3)`,
                    },
                    backgroundColor: isSelected
                      ? 'rgba(139, 0, 0, 0.05)'
                      : 'transparent',
                  }}
                >
                  <Box
                    sx={{
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      overflow: 'hidden',
                    }}
                  >
                    {deity.imagePath && deity.id !== 'none' ? (
                      <img
                        src={deity.imagePath}
                        alt={deity.id}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement)
                            .parentElement;
                          if (parent) {
                            parent.textContent = deity.id;
                            (parent as HTMLElement).style.fontSize = '48px';
                          }
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '48px' }}>{deity.id}</span>
                    )}
                  </Box>

                  {/* <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      display: 'block',
                      color: theme.palette.text.primary,
                      wordBreak: 'break-word',
                      fontSize: '0.75rem',
                    }}
                  >
                    {deity.id}
                  </Typography> */}

                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: theme.palette.secondary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        ✓
                      </Typography>
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          padding: 2,
          gap: 1,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeitySelectorModal;
