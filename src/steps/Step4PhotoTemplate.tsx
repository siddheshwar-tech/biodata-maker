import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Paper,
  Divider,
  Avatar,
  Chip,
  Alert,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';
import DownloadButton from '../components/DownloadButton';
import { TemplateId } from '../types/biodata.types';

const Step4PhotoTemplate: React.FC = () => {
  const theme = useTheme();
  const { formData, updatePhoto, updateTemplate, setCurrentStep } = useBiodata();
  const t = useTranslation(formData.language);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<TemplateId>(
    formData.selectedTemplate
  );

  useEffect(() => {
    setPhotoPreview(formData.photo);
    setSelectedCard(formData.selectedTemplate);
  }, [formData.photo, formData.selectedTemplate]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('File must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      setPhotoName(file.name);
      updatePhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => {
    setPhotoPreview(null);
    setPhotoName('');
    updatePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTemplateSelect = (id: TemplateId) => {
    updateTemplate(id);
    setSelectedCard(id);
  };

  return (
    <>
      {/* SECTION A: photo upload */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('uploadPhoto')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {photoPreview ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={photoPreview}
              sx={{ width: 120, height: 120 }}
              variant="rounded"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Chip label={photoName || 'Uploaded Photo'} />
              <Button
                size="small"
                variant="outlined"
                startIcon={<AutoAwesomeIcon />}
                onClick={handleFileClick}
              >
                Change Photo
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeletePhoto}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              border: '2px dashed',
              borderColor: theme.palette.grey[400],
              py: 6,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={handleFileClick}
          >
            <CloudUploadIcon
              sx={{ fontSize: 48, color: theme.palette.secondary.main }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              फोटो जोडा (ऐच्छिक)
            </Typography>
            <Typography variant="caption" color="textSecondary">
              JPG, PNG • Max 2MB
            </Typography>
          </Box>
        )}
        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}
      </Paper>

      {/* SECTION B: template chooser */}
      <Paper sx={{ padding: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          तुमचा टेम्पलेट निवडा
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          3 सुंदर डिझाईन उपलब्ध आहेत
        </Typography>
        <Grid container spacing={2}>
          {/* card 1 traditional */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                position: 'relative',
                border:
                  selectedCard === 1
                    ? `3px solid ${theme.palette.primary.main}`
                    : undefined,
              }}
            >
              {selectedCard === 1 && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: theme.palette.success.main,
                  }}
                />
              )}
              <CardActionArea onClick={() => handleTemplateSelect(1)}>
                <Box
                  sx={{
                    height: 80,
                    background: 'linear-gradient(135deg, #8B0000, #D4AF37)',
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    पारंपारिक | Traditional
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    मराठी परंपरा, सुवर्ण सजावट
                  </Typography>
                  <Chip
                    label="Most Popular"
                    size="small"
                    color="secondary"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* card 2 religious */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                position: 'relative',
                border:
                  selectedCard === 2
                    ? `3px solid ${theme.palette.primary.main}`
                    : undefined,
              }}
            >
              {selectedCard === 2 && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: theme.palette.success.main,
                  }}
                />
              )}
              <CardActionArea onClick={() => handleTemplateSelect(2)}>
                <Box
                  sx={{
                    height: 80,
                    background: 'linear-gradient(135deg, #FF6B00, #8B0000)',
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    धार्मिक | Religious
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    गणेश वंदना, सनातन शैली
                  </Typography>
                  <Chip
                    label="Traditional"
                    size="small"
                    color="secondary"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* card 3 modern */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                position: 'relative',
                border:
                  selectedCard === 3
                    ? `3px solid ${theme.palette.primary.main}`
                    : undefined,
              }}
            >
              {selectedCard === 3 && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: theme.palette.success.main,
                  }}
                />
              )}
              <CardActionArea onClick={() => handleTemplateSelect(3)}>
                <Box
                  sx={{
                    height: 80,
                    background: 'linear-gradient(135deg, #1A237E, #D4AF37)',
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    आधुनिक | Modern
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Clean, professional design
                  </Typography>
                  <Chip
                    label="Professional"
                    size="small"
                    color="secondary"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* SECTION C: download */}
      <Paper sx={{ padding: 3, mt: 3, background: theme.palette.background.default }}>
        <Typography variant="h6">बायोडेटा तयार आहे! 🎉</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          खाली दिलेल्या बटनावर क्लिक करा
        </Typography>
        <DownloadButton />
        <Alert severity="info" sx={{ mt: 2 }}>
          PDF आपोआप download folder मध्ये जाईल
        </Alert>
        {/* navigation controls */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentStep(2)}
          >
            {t('back')}
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Step4PhotoTemplate;
