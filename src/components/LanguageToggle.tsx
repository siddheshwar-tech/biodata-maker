import React from 'react';
import { ToggleButtonGroup, ToggleButton, Box, Typography, useTheme } from '@mui/material';
import { useBiodata } from '../context/BiodataContext';

const LanguageToggle: React.FC = () => {
  const theme = useTheme();
  const { formData, updateLanguage } = useBiodata();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        भाषा / Language
      </Typography>
      <ToggleButtonGroup
        value={formData.language}
        exclusive
        onChange={(_e, newLanguage) => {
          if (newLanguage) {
            updateLanguage(newLanguage as any);
          }
        }}
        size="small"
        color="primary"
      >
        <ToggleButton value="marathi">मराठी</ToggleButton>
        <ToggleButton value="hindi">हिंदी</ToggleButton>
        <ToggleButton value="english">EN</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageToggle;
