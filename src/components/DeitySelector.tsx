import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeitySelectorModal from './DeitySelectorModal';
import { deityOptions } from '../utils/deityOptions';
import { Language } from '../types/biodata.types';

interface DeitySelectorProps {
  selectedDeity: string;
  onSelectDeity: (deityId: string) => void;
  language: Language;
}

const DeitySelector: React.FC<DeitySelectorProps> = ({
  selectedDeity,
  onSelectDeity,
  language,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [modalOpen, setModalOpen] = useState(false);

  const selectedDeityData = deityOptions.find((d) => d.id === selectedDeity);

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            marginBottom: 2,
            fontWeight: 600,
          }}
        >
          देवतेची प्रतिमा
        </Typography>

        <Card
          sx={{
            padding: 3,
            textAlign: 'center',
            backgroundColor: 'rgba(139, 0, 0, 0.02)',
            border: `2px solid ${theme.palette.primary.main}`,
            maxWidth: '300px',
          }}
        >
          <Box
            sx={{
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              overflow: 'hidden',
            }}
          >
            {selectedDeityData?.imagePath &&
            selectedDeityData.id !== 'none' ? (
              <img
                src={selectedDeityData.imagePath}
                alt={selectedDeity}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <span style={{ fontSize: '64px' }}>
                {selectedDeityData?.id}
              </span>
            )}
          </Box>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Change Deity
          </Button>
        </Card>
      </Box>

      <DeitySelectorModal
        open={modalOpen}
        selectedDeity={selectedDeity}
        onSelectDeity={onSelectDeity}
        onClose={() => setModalOpen(false)}
        language={language}
      />
    </>
  );
};

export default DeitySelector;