import React from 'react';
import { Box, Card, Typography, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { deityOptions, getDeityLabel } from '../utils/deityOptions';
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

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.primary.main,
          marginBottom: 2,
          fontWeight: 600,
        }}
      >
        देवतेची प्रतिमा निवडा | Choose Deity Symbol
      </Typography>

      <Grid container spacing={2}>
        {deityOptions.map((deity) => {
          const isSelected = selectedDeity === deity.id;
          return (
            <Grid
              item
              xs={6}
              sm={3}
              key={deity.id}
              sx={{
                display: 'flex',
              }}
            >
              <Card
                onClick={() => onSelectDeity(deity.id)}
                sx={{
                  width: '100%',
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: isSelected ? `3px solid ${theme.palette.primary.main}` : '2px solid #e0e0e0',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    border: `3px solid ${theme.palette.secondary.main}`,
                    transform: 'scale(1.05)',
                    boxShadow: `0 4px 12px rgba(212, 175, 55, 0.3)`,
                  },
                  backgroundColor: isSelected ? 'rgba(139, 0, 0, 0.05)' : 'transparent',
                }}
              >
                <Box
                  sx={{
                    fontSize: '48px',
                    mb: 1,
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {deity.svgPath && deity.id !== 'none' ? (
                    <img
                      src={deity.svgPath}
                      alt={getDeityLabel(deity.id, language)}
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'contain',
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          parent.textContent = deity.symbol;
                        }
                      }}
                    />
                  ) : (
                    <span>{deity.symbol}</span>
                  )}
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    display: 'block',
                    color: theme.palette.text.primary,
                    wordBreak: 'break-word',
                  }}
                >
                  {getDeityLabel(deity.id, language)}
                </Typography>

                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 24 }} />
                  </Box>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DeitySelector;
