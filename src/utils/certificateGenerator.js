
import { jsPDF } from 'jspdf';

/**
 * Generate a modern DigiCitizen certificate PDF.
 * The design matches the Certificate Preview page.
 */
export function generateCertificatePDF({
  studentName,
  certificateNumber,
  issuedDate
}) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  const centerX = width / 2;

  // Colors
  const navy = [30, 58, 138];
  const blue = [37, 99, 235];
  const gray = [100, 116, 139];
  const dark = [15, 23, 42];
  const lightBlue = [239, 246, 255];

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, 'F');

  // Outer blue border
  doc.setDrawColor(...navy);
  doc.setLineWidth(1.2);
  doc.roundedRect(7, 7, width - 14, height - 14, 4, 4, 'S');

  // Inner blue border
  doc.setDrawColor(...navy);
  doc.setLineWidth(0.8);
  doc.roundedRect(9, 9, width - 18, height - 18, 3, 3, 'S');

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(100, 116, 139);

  doc.text(
    'DIGICITIZEN EDUCATIONAL INITIATIVE',
    centerX,
    37,
    { align: 'center' }
  );

  // Main title
  doc.setFontSize(28);
  doc.setTextColor(...navy);

  doc.text(
    'Certificate of Digital Citizenship',
    centerX,
    55,
    { align: 'center' }
  );

  // Subtitle
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...gray);

  doc.text(
    'THIS ACCREDITATION IS PROUDLY CONFERRED UPON',
    centerX,
    65,
    { align: 'center' }
  );

  // Student name
  const name = studentName || 'Student Learner';

  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(15, 23, 42);

  doc.text(name, centerX, 86, {
    align: 'center',
    maxWidth: 230
  });

  // Name underline
  doc.setDrawColor(...blue);
  doc.setLineWidth(0.8);

  const nameWidth = Math.min(doc.getTextWidth(name), 90);
  const underlineWidth = Math.max(nameWidth + 35, 70);

  doc.line(
    centerX - underlineWidth / 2,
    93,
    centerX + underlineWidth / 2,
    93
  );

  // Certificate description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);

  const description =
    'For successfully demonstrating exemplary mastery in digital ethics, cybersecurity defense, ' +
    'data privacy sovereignty, responsible communication, and critical media literacy across all ' +
    '6 core modules and verified assessments of the DigiCitizen Platform.';

  const descriptionLines = doc.splitTextToSize(description, 215);

  doc.text(descriptionLines, centerX, 105, {
    align: 'center',
    lineHeightFactor: 1.5
  });

  // Horizontal divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(25, 132, width - 25, 132);

  // Actual issuance status
  const hasValidIssueDate =
    issuedDate && !Number.isNaN(new Date(issuedDate).getTime());

  const isIssued = Boolean(certificateNumber && hasValidIssueDate);

  // Left: Conferment date
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...dark);

  const formattedDate = isIssued
    ? new Date(issuedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      })
    : 'Not Yet Issued';

  doc.text(`Conferment Date: ${formattedDate}`, 25, 145);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...gray);

  doc.text('DigiCitizen Academic Registry', 25, 153);

  // Center: Verification badge
  const badgeText = isIssued
    ? 'VERIFIED ACCREDITATION'
    : 'NOT YET ISSUED';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);

  const badgeWidth = isIssued ? 72 : 48;
  const badgeHeight = 12;
  const badgeX = centerX - badgeWidth / 2;
  const badgeY = 143;

  doc.setFillColor(...lightBlue);
  doc.setDrawColor(191, 219, 254);
  doc.setLineWidth(0.5);

  doc.roundedRect(
    badgeX,
    badgeY,
    badgeWidth,
    badgeHeight,
    6,
    6,
    'FD'
  );

  doc.setTextColor(...blue);

  doc.text(
    badgeText,
    centerX,
    badgeY + 7.5,
    { align: 'center' }
  );

  // Right: Credential details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...dark);

  doc.text(
    `Credential ID: ${isIssued ? certificateNumber : 'Not Issued'}`,
    width - 25,
    145,
    { align: 'right', maxWidth: 90 }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...gray);

  doc.text(
    isIssued
      ? 'Tamper-evident verification'
      : 'Certificate pending issuance',
    width - 25,
    153,
    { align: 'right' }
  );

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);

  doc.text(
    'DigiCitizen Educational Initiative  •  Academic Registry',
    centerX,
    height - 16,
    { align: 'center' }
  );

  // Save PDF
  const safeName = name.replace(/[^a-zA-Z0-9]/g, '_');

  doc.save(`DigiCitizen_Certificate_${safeName}.pdf`);
}
