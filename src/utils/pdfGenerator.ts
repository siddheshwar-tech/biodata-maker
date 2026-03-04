import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * generateBiodataPDF
 *
 * WHY WE USE A HIDDEN CLONE:
 * The live preview panel uses CSS `transform: scale(0.6)` to shrink the
 * template to fit the sidebar. html2canvas captures whatever CSS is applied —
 * so capturing the scaled preview produces a tiny, blurry PDF.
 *
 * Fix: we clone the element at FULL SIZE (794px, no transform), capture that
 * clone off-screen, then remove it. The PDF is pixel-perfect and matches
 * the template exactly.
 */
export const generateBiodataPDF = async (fileName: string = 'Biodata'): Promise<void> => {

  // 1. Find the original template container
  const original = document.getElementById('biodata-preview-container');
  if (!original) {
    console.error('[PDF] biodata-preview-container not found in DOM');
    return;
  }

  // 2. Clone the element so we can reset its styles without affecting the preview
  const clone = original.cloneNode(true) as HTMLElement;

  // 3. Position clone off-screen (invisible to user)
  clone.style.position   = 'fixed';
  clone.style.top        = '-9999px';
  clone.style.left       = '-9999px';
  clone.style.width      = '794px';    // exact A4 width
  clone.style.transform  = 'none';     // ← KEY FIX: remove scale transform
  clone.style.maxHeight  = 'none';
  clone.style.overflow   = 'visible';
  clone.style.zIndex     = '-1';
  clone.style.marginBottom = '0';

  // 4. Append clone to body so html2canvas can read its layout
  document.body.appendChild(clone);

  try {
    // 5. Small delay — lets browser render the clone fully before capture
    await new Promise((resolve) => setTimeout(resolve, 150));

    // 6. Capture clone with html2canvas
    const canvas = await html2canvas(clone, {
      scale: 2,              // retina quality (2x pixel density)
      useCORS: true,         // allow cross-origin images (uploaded photos)
      allowTaint: false,
      backgroundColor: '#FFFBF0',
      logging: false,
      // Capture full height even if taller than viewport
      windowWidth: 794,
      windowHeight: clone.scrollHeight,
    });

    // 7. Create A4 PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',         // 210mm × 297mm
    });

    const pageWidth  = 210;  // mm
    const pageHeight = 297;  // mm

    // 8. Scale canvas image to fit A4 maintaining aspect ratio
    const canvasWidth  = canvas.width;
    const canvasHeight = canvas.height;
    const ratio        = canvasHeight / canvasWidth;

    const imgWidth  = pageWidth;
    const imgHeight = pageWidth * ratio;

    // 9. If biodata is taller than one page, add new pages
    if (imgHeight <= pageHeight) {
      // Single page
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95),
        'JPEG',
        0, 0,
        imgWidth, imgHeight
      );
    } else {
      // Multi-page: slice canvas into page-height chunks
      const pageHeightPx = canvasWidth * (pageHeight / pageWidth);
      let yOffset = 0;

      while (yOffset < canvasHeight) {
        const sliceHeight = Math.min(pageHeightPx, canvasHeight - yOffset);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width  = canvasWidth;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(canvas, 0, -yOffset);
        }

        if (yOffset > 0) pdf.addPage();

        pdf.addImage(
          pageCanvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0, 0,
          pageWidth,
          pageWidth * (sliceHeight / canvasWidth)
        );

        yOffset += pageHeightPx;
      }
    }

    // 10. Save with formatted filename
    const date = new Date().toLocaleDateString('en-IN').replace(/\//g, '-');
    const safeName = fileName.replace(/[^a-zA-Z0-9\u0900-\u097F ]/g, '').trim() || 'Biodata';
    pdf.save(`${safeName}_Biodata_${date}.pdf`);

  } catch (error) {
    console.error('[PDF] Generation failed:', error);
    throw error;
  } finally {
    // 11. Always remove the clone from DOM
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  }
};