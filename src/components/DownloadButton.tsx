import React, { useState } from 'react';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';
import { generateBiodataPDF } from '../utils/pdfGenerator';

interface DownloadButtonProps {
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileName: fileNameProp }) => {
  const { formData } = useBiodata();
  const t = useTranslation(formData.language);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleDownload = async () => {
    try {
      setLoading(true);
      const fileName = fileNameProp || formData.personal.fullName || 'Biodata';
      await generateBiodataPDF(fileName);
      setSnackbar({
        open: true,
        message: 'PDF यशस्वीरित्या डाऊनलोड झाले! ✓',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'PDF बनवताना error आला. पुन्हा प्रयत्न करा.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
        onClick={handleDownload}
      >
        {t('downloadPDF')}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DownloadButton;
