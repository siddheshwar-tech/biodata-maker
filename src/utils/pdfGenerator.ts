// src/utils/pdfGenerator.ts

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateBiodataPDF = async (fileName: string = 'Biodata'): Promise<void> => {
  try {
    // Get DOM element for PDF capture
    const element = document.getElementById('biodata-preview-container');
    if (!element) {
      console.error('Biodata preview container not found');
      return;
    }

    // Store original styles
    const originalStyles = {
      width: element.style.width,
      position: element.style.position,
      left: element.style.left,
    };

    // Temporarily set element styles for PDF capture
    element.style.width = '794px';
    element.style.position = 'absolute';
    element.style.left = '-9999px';

    // Capture canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Restore original styles
    element.style.width = originalStyles.width;
    element.style.position = originalStyles.position;
    element.style.left = originalStyles.left;

    // Create jsPDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Get canvas dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Generate filename with date
    const dateStr = new Date().toLocaleDateString('en-IN');
    const filename = `${fileName}_Biodata_${dateStr}.pdf`;

    // Save PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
