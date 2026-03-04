import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { formData, updateLanguage } = useBiodata();
  const t = useTranslation(formData.language);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: { xs: '56px', md: '64px' },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {/* Left side - Logo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                color: theme.palette.secondary.main,
                fontWeight: 700,
              }}
            >
              ॐ
            </Typography>
            {!isMobile && (
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                {t('appName')}
              </Typography>
            )}
          </Box>

          {/* Right side - Language Selector */}
          <Select
            value={formData.language}
            onChange={(e) => updateLanguage(e.target.value as any)}
            size="small"
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            }}
          >
            <MenuItem value="marathi">मराठी</MenuItem>
            <MenuItem value="hindi">हिंदी</MenuItem>
            <MenuItem value="english">English</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Box sx={{ height: { xs: '56px', md: '64px' } }} />
    </>
  );
};

export default Navbar;
