import React, { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  useTheme,
  Collapse,
} from '@mui/material';
import { shlokaPresets } from '../utils/shlokaPresets';
import { Language } from '../types/biodata.types';

interface ShlokaEditorProps {
  shlokaText: string;
  onUpdateShloka: (text: string) => void;
  language: Language;
}

const ShlokaEditor: React.FC<ShlokaEditorProps> = ({
  shlokaText,
  onUpdateShloka,
  language,
}) => {
  const theme = useTheme();
  const [isCustom, setIsCustom] = useState(false);
  const [customText, setCustomText] = useState(shlokaText);

  const handlePresetSelect = (newVal: string | null) => {
    if (!newVal) return;

    if (newVal === 'कस्टम लिहा...') {
      setIsCustom(true);
      setCustomText(shlokaText);
    } else {
      setIsCustom(false);
      onUpdateShloka(newVal);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 60);
    setCustomText(val);
    onUpdateShloka(val);
  };

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
        शुभ वचन निवडा | Choose Blessing Text
      </Typography>

      <Box
        sx={{
          overflowX: 'auto',
          pb: 1,
          mb: 2,
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: 4,
            '&:hover': {
              background: '#555',
            },
          },
        }}
      >
        <ToggleButtonGroup
          value={isCustom ? 'कस्टम लिहा...' : shlokaText}
          exclusive
          onChange={(_, newVal) => handlePresetSelect(newVal)}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            minWidth: 'min-content',
            width: '100%',
          }}
        >
          {shlokaPresets.map((preset, idx) => (
            <ToggleButton
              key={idx}
              value={preset}
              sx={{
                fontSize: '0.85rem',
                padding: '8px 12px',
                textTransform: 'none',
                fontFamily: '"Noto Sans Devanagari", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.3px',
                color: 'inherit',
                border: `1px solid #ccc`,
                borderRadius: 1,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  border: `1px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
                '&:hover:not(.Mui-selected)': {
                  borderColor: theme.palette.secondary.main,
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              {preset}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Collapse in={isCustom}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="कस्टम वचन | Custom Text"
            value={customText}
            onChange={handleCustomChange}
            inputProps={{ maxLength: 60, placeholder: 'Type custom blessing text...' }}
            multiline
            maxRows={2}
            sx={{
              fontFamily: '"Noto Sans Devanagari", sans-serif',
            }}
          />
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#666' }}>
            {customText?.length || 0}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ShlokaEditor;
