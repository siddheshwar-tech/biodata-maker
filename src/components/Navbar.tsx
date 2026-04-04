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
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

const Navbar: React.FC = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletUp = useMediaQuery(theme.breakpoints.up('md'));

  const { formData, updateLanguage } = useBiodata();
  const t = useTranslation(formData.language);

  // Smart config instead of if-else mess
  const typingToolConfig: Record<
    string,
    { label: string; url: string }
  > = {
    hindi: {
      label: 'Hindi Typing Tool',
      url: 'https://www.google.com/intl/hi/inputtools/try/',
    },
    marathi: {
      label: 'Marathi Typing Tool',
      url: 'https://www.google.com/intl/mr/inputtools/try/',
    },
  };
  const navigate = useNavigate();

  const typingTool = typingToolConfig[formData.language];
  const showTypingLink = isTabletUp && !!typingTool;

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
            position: 'relative', // needed for center positioning
          }}
        >
          {/* Left - Logo */}
          <Box
            onClick={() => navigate('/')}
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

          {/* Center - Smart Typing Link */}
          {showTypingLink && (
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Typography
                component="a"
                href={typingTool.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: 14,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {typingTool.label}
              </Typography>
            </Box>
          )}

          {/* Right - Language Selector */}
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
