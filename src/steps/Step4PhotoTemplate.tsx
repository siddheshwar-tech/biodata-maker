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
  Theme,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';
import DownloadButton from '../components/DownloadButton';
import DeitySelector from '../components/DeitySelector';
import ShlokaEditor from '../components/ShlokaEditor';
import { TemplateId } from '../types/biodata.types';
import { BoxOwnProps } from '@mui/system';
import { JSX } from 'react/jsx-runtime';

const Step4PhotoTemplate: React.FC = () => {
  const theme = useTheme();
  const { formData, updatePhoto, updateTemplate, setCurrentStep, fieldOrder, updateFieldOrder, resetFieldOrder, updateDeity, updateShlokaText } = useBiodata();
  const t = useTranslation(formData.language);

  // Helper function to get translated field names
  const getFieldLabel = (section: 'personal' | 'family' | 'education' | 'address', fieldKey: string): string => {
    const fieldLabelMap: Record<string, Record<string, string>> = {
      personal: {
        fullName: 'fullName',
        dateOfBirth: 'dateOfBirth',
        timeOfBirth: 'timeOfBirth',
        placeOfBirth: 'placeOfBirth',
        rashi: 'rashi',
        nakshatra: 'nakshatra',
        gotra: 'gotra',
        religion: 'religion',
        caste: 'caste',
        subCaste: 'subCaste',
        height: 'height',
        complexion: 'complexion',
        bloodGroup: 'bloodGroup',
        manglik: 'manglik',
      },
      family: {
        fatherName: 'fatherName',
        fatherOccupation: 'fatherOccupation',
        motherName: 'motherName',
        motherOccupation: 'motherOccupation',
        totalBrothers: 'brothers',
        marriedBrothers: 'married',
        totalSisters: 'sisters',
        marriedSisters: 'married',
        familyType: 'familyType',
        nativePlace: 'nativePlace',
      },
      education: {
        qualification: 'qualification',
        university: 'university',
        additionalCertifications: 'certifications',
        occupation: 'occupation',
        companyName: 'companyName',
        jobTitle: 'jobTitle',
        annualIncome: 'annualIncome',
      },
      address: {
        fullAddress: 'fullAddress',
        city: 'city',
        district: 'district',
        state: 'state',
        pincode: 'pincode',
        mobile: 'mobile',
        whatsappSameAsMobile: 'sameAsMobile',
        whatsapp: 'whatsapp',
        email: 'email',
      },
    };

    const translationKey = fieldLabelMap[section]?.[fieldKey];
    return translationKey ? t(translationKey as any) : fieldKey;
  };

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
          {/* SECTION C: download */}
      <Paper sx={{ padding: 3, mt: 3, background: theme.palette.background.default }}>
        <Typography variant="h6">{t('biodataReady')}</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {t('clickButtonBelow')}
        </Typography>
        <DownloadButton />
        <Alert severity="info" sx={{ mt: 2 }}>
          {t('pdfDownloadFolder')}
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
          {/* SECTION: Customize Layout (drag & drop) */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6">{t('customizeLayoutData')}</Typography>
            <Box>
              <IconButton size="small" onClick={() => resetFieldOrder()} title="Reset order">
                <RestartAltIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <DragDropContext
            onDragEnd={(result: { source: any; destination: any; }) => {
              const { source, destination } = result;
              if (!destination) return;
              // only allow reordering within same droppable (section)
              if (source.droppableId !== destination.droppableId) return;

              const section = source.droppableId as 'personal' | 'address' | 'family' | 'education' ;
              const current = (fieldOrder && fieldOrder[section]) || [];

              // compute visible fields based on formData values
              const isVisible = (key: string) => {
                const value = (formData as any)[section]?.[key];
                if (value === null || value === undefined) return false;
                if (typeof value === 'string') return value.trim() !== '';
                if (typeof value === 'number') return value !== 0;
                if (typeof value === 'boolean') return value === true;
                return true;
              };
              const visible = current.filter(isVisible);
              const movedKey = visible[source.index];
              // remove movedKey from original order
              const without = current.filter((k) => k !== movedKey);
              // determine insertion position in `without` based on destination.index among visible
              let count = 0;
              let insertPos = without.length;
              for (let i = 0; i < without.length; i++) {
                if (isVisible(without[i])) {
                  if (count === destination.index) {
                    insertPos = i;
                    break;
                  }
                  count++;
                }
              }
              const newOrder = [...without.slice(0, insertPos), movedKey, ...without.slice(insertPos)];
              updateFieldOrder(section, newOrder);
            }}
          >
            <Grid container spacing={0.5} alignItems="flex-start">
              {(['personal','address', 'family','education'] as const).map((section) => (
                <Grid item xs={12} md={6} key={section}>
                  <Paper sx={{ p: 1 }}>
                    <Typography sx={{ fontWeight: 500, mb: 1, textTransform: 'capitalize' }}>{section}</Typography>
                    <Droppable droppableId={section}>
                      {(provided, snapshot: { isDraggingOver: any; }) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          sx={{
                            // minHeight: 48,
                            borderRadius: 1,
                            p: 1,
                            background: snapshot.isDraggingOver ? '#FFF9E6' : 'transparent',
                            border: snapshot.isDraggingOver ? '1px dashed #D4AF37' : '1px solid transparent',
                          }}
                        >
                          {((fieldOrder && fieldOrder[section]) || []).
                            filter((key) => {
                              const value = (formData as any)[section]?.[key];
                              if (value === null || value === undefined) return false;
                              if (typeof value === 'string') return value.trim() !== '';
                              if (typeof value === 'number') return value !== 0;
                              if (typeof value === 'boolean') return value === true;
                              return true;
                            }).map((fieldKey, idx) => (
                            <Draggable key={fieldKey} draggableId={`${section}:${fieldKey}`} index={idx}>
                              {(prov: any, snap: any) => (
                                <Box
                                  ref={prov.innerRef}
                                  {...prov.draggableProps}
                                  {...prov.dragHandleProps}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1,
                                    mb: 1,
                                    borderRadius: 1,
                                    background: snap.isDragging ? '#FFF9E6' : '#fff',
                                    boxShadow: snap.isDragging ? 3 : 'none',
                                    border: '1px solid rgba(0,0,0,0.04)',
                                  }}
                                >
                                  <Box sx={{ color: '#8B0000', display: 'flex', alignItems: 'center' }} {...prov.dragHandleProps}>
                                    <DragIndicatorIcon />
                                  </Box>
                                  <Typography sx={{ flex: 1 }}>{getFieldLabel(section, fieldKey)}</Typography>
                                </Box>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DragDropContext>
        </AccordionDetails>
      </Accordion>


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
              <Chip label={photoName || t('uploadedPhoto')} />
              <Button
                size="small"
                variant="outlined"
                startIcon={<AutoAwesomeIcon />}
                onClick={handleFileClick}
              >
                {t('changePhoto')}
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeletePhoto}
              >
                {t('deletePhoto')}
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
              {t('addPhotoOptional')}
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

      {/* SECTION — Deity Selector and Shloka Editor */}
      <Paper sx={{ padding: 3, mt: 3 }}>
        <DeitySelector
          selectedDeity={formData.selectedDeity}
          onSelectDeity={updateDeity}
          language={formData.language}
        />

        <Divider sx={{ my: 3 }} />

        <ShlokaEditor
          shlokaText={formData.shlokaText}
          onUpdateShloka={updateShlokaText}
          language={formData.language}
        />
      </Paper>

      {/* SECTION B: template chooser */}
      <Paper sx={{ padding: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t('chooseYourTemplate')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {t('beautyDesigns')}
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
                    {t('traditionMarathi')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {t('goldenDecor')}
                  </Typography>
                  <Chip
                    label={t('mostPopular')}
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
                    {t('religiousMarathi')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {t('ganeshStyle')}
                  </Typography>
                  <Chip
                    label={t('traditional')}
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
                    {t('modernMarathi')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {t('cleanProfessional')}
                  </Typography>
                  <Chip
                    label={t('professional')}
                    size="small"
                    color="secondary"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Step4PhotoTemplate;
