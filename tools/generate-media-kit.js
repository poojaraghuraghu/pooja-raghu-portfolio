// Regenerates /media-kit.pdf. Run from repo root: npm install pdfkit && node tools/generate-media-kit.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'img');
const OUT = path.join(ROOT, 'media-kit.pdf');

const A4 = [595.28, 841.89];
const M = 48;                       // page margin
const W = A4[0] - M * 2;            // content width

const INK   = '#FFFFFF';
const BODY  = '#A6A6A6';
const DIM   = '#6E6E6E';
const FAINT = '#3A3A3C';
const BG    = '#0B0B0C';
const ACC   = '#C4F648';

const doc = new PDFDocument({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 }, info: {
  Title: 'Pooja Raghu — Media Kit 2026',
  Author: 'Pooja Raghu',
  Subject: 'Athlete · Creator · Strategist — partnership media kit',
}});
doc.pipe(fs.createWriteStream(OUT));

function bg() { doc.rect(0, 0, A4[0], A4[1]).fill(BG); }

function label(txt, x, y, color = DIM) {
  doc.font('Courier-Oblique').fontSize(7.5).fillColor(color)
     .text(txt.toUpperCase(), x, y, { characterSpacing: 1.6, lineBreak: false });
}

function rule(x, y, w, color = FAINT) {
  doc.moveTo(x, y).lineTo(x + w, y).lineWidth(0.6).strokeColor(color).stroke();
}

function factRow(key, val, x, y, w) {
  label(key, x, y + 1.5, DIM);
  doc.font('Helvetica').fontSize(9.5).fillColor('#CFCFCF')
     .text(val, x + 118, y, { width: w - 118 });
  const h = Math.max(doc.heightOfString(val, { width: w - 118 }) , 12);
  rule(x, y + h + 7, w);
  return y + h + 15;
}

/* ══ PAGE 1 ══ */
bg();

// top bar
label('Media Kit · 2026', M, M);
label('poojaraghu.com', A4[0] - M - 110, M, ACC);
rule(M, M + 16, W);

// name block
doc.font('Helvetica-Bold').fontSize(44).fillColor(INK).text('POOJA', M, M + 40, { characterSpacing: 1 });
doc.font('Helvetica-Bold').fontSize(44).fillColor(INK).text('RAGHU', M, M + 86, { characterSpacing: 1 });
label('Athlete · Creator · Strategist', M, M + 142, ACC);

// intro
const introY = M + 170;
doc.font('Helvetica').fontSize(10.5).fillColor(BODY).text(
  'International multi-sport athlete from Bengaluru, India — fresh from mixed-division gold at the ' +
  'TRIO Invitational 2026 in Malaysia, and headed to the World Ultimate Club Championships in Limerick, ' +
  'Ireland, with only the second Indian mixed club in history to qualify.',
  M, introY, { width: 300, lineGap: 3.5 });
doc.font('Helvetica').fontSize(10.5).fillColor(BODY).text(
  'Also an architect, UX designer, marketing strategist, and commercial model. One partner for ' +
  'performance campaigns, brand films, editorial shoots, product stories, and the stage — with the ' +
  'strategy built in.',
  M, introY + 92, { width: 300, lineGap: 3.5 });

// photo right
const imgW = 200, imgH = 266;
const imgX = A4[0] - M - imgW, imgY = M + 40;
doc.image(`${IMG}/trio2026_gold_pooja.jpg`, imgX, imgY, { width: imgW, height: imgH });
doc.rect(imgX, imgY, imgW, imgH).lineWidth(0.8).strokeColor(FAINT).stroke();
label('TRIO Invitational 2026 · Gold', imgX, imgY + imgH + 10, DIM);

// facts
let fy = 400;
label('The Short Version', M, fy, ACC);
fy += 22;
fy = factRow('result', 'Gold, Mixed Division — TRIO Invitational 2026, Putrajaya, Malaysia (14-team international field)', M, fy, W);
fy = factRow('next', 'World Ultimate Club Championships 2026 — Limerick, Ireland · August 15–22', M, fy, W);
fy = factRow('career', '10+ years competing internationally · 9+ championships across 4 continents', M, fy, W);
fy = factRow('disciplines', 'Ultimate Frisbee · Surfing · Snowboarding · Rugby · Trekking · Modelling', M, fy, W);
fy = factRow('profession', 'Architect · UX/UI Designer · Marketing Strategist · Public Speaker', M, fy, W);
fy = factRow('audience', '9K+ Instagram · 3K+ LinkedIn · 100K+ reel views — engaged, not bought', M, fy, W);

// press
fy += 14;
label('As Featured In', M, fy, ACC);
doc.font('Helvetica-Bold').fontSize(11).fillColor('#DADADA')
   .text('The Hindu   ·   Indulge Xpress   ·   Condé Nast Traveller   ·   Manorama News', M, fy + 18);

// stats band
const sy = A4[1] - M - 112;
rule(M, sy - 18, W);
const stats = [
  ['10+', 'years competing\ninternationally'],
  ['9+',  'international\nchampionships'],
  ['4',   'continents.\none career.'],
  ['10+', 'gold medals.\nmore to come.'],
];
const colW = W / 4;
stats.forEach(([num, lab], i) => {
  const sx = M + i * colW;
  doc.font('Helvetica-Bold').fontSize(30).fillColor(i === 3 ? ACC : INK).text(num, sx, sy);
  doc.font('Courier-Oblique').fontSize(7.5).fillColor(DIM)
     .text(lab.toUpperCase(), sx, sy + 38, { characterSpacing: 1.2, lineGap: 2 });
});

// footer
label('Pooja Raghu · Bengaluru, India', M, A4[1] - M - 10);
label('hello@poojaraghu.com', A4[0] - M - 128, A4[1] - M - 10, ACC);

/* ══ PAGE 2 ══ */
doc.addPage();
bg();

label('Media Kit · 2026', M, M);
label('poojaraghu.com', A4[0] - M - 110, M, ACC);
rule(M, M + 16, W);

// campaigns
let y2 = M + 40;
label('Campaigns & Collaborations', M, y2, ACC);
doc.font('Helvetica').fontSize(10).fillColor('#CFCFCF').text(
  'WhatsApp (Meta) · Samsung · CSK × Etihad · 82°E · Arata · Nua · Mossant · Ashton Gray · RiteBite Max Protein',
  M, y2 + 18, { width: W, lineGap: 3 });
doc.font('Helvetica').fontSize(9.5).fillColor(DIM).text(
  'Campaign work spans brand films, editorial photography, product storytelling, and multi-year athlete partnerships.',
  M, y2 + 50, { width: W });

// ways to work together
y2 += 92;
label('Ways to Work Together', M, y2, ACC);
y2 += 22;
const fmt = [
  ['Story & Social',        'Social-first campaigns woven into training, travel, recovery, and daily life. Wellness journeys, skincare routines for active life, outdoor adventure content.'],
  ['Performance & On-Field','Kit presence at a world championship, international livestream visibility, nutrition and recovery storytelling from real competition.'],
  ['Integrated Campaign',   'Brand films, commercial shoots, and editorial photography built as one story arc — from training camps in India to the tournament in Ireland.'],
  ['Product & Lifestyle',   'Product testing in real-world environments. Honest, story-driven review content. Gear, nutrition, suncare, and tech, field-tested outdoors.'],
];
for (const [k, v] of fmt) {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(k, M, y2);
  doc.font('Helvetica').fontSize(9.5).fillColor(BODY).text(v, M + 150, y2 - 1, { width: W - 150, lineGap: 2.5 });
  const h = doc.heightOfString(v, { width: W - 150, lineGap: 2.5 });
  rule(M, y2 + h + 8, W);
  y2 += h + 17;
}
doc.font('Helvetica').fontSize(9).fillColor(DIM).text(
  'Also: ambassador programs · product launches · event appearances · speaking engagements · corporate workshops · women-in-sport initiatives',
  M, y2, { width: W });

// spaces
y2 += 34;
label('Spaces I Play In', M, y2, ACC);
doc.font('Helvetica').fontSize(9.5).fillColor('#CFCFCF').text(
  'Sports performance · Energy & hydration · Nutrition & recovery · Skincare & sun protection · Outdoor & adventure · ' +
  'Travel & tourism · Fashion, footwear & apparel · Women’s health · Healthcare · Technology & creative tools · Hospitality & automotive · Education',
  M, y2 + 18, { width: W, lineGap: 3 });

// quote
y2 += 78;
doc.font('Helvetica-Bold').fontSize(26).fillColor(ACC).text('“', M, y2);
doc.font('Helvetica-Oblique').fontSize(11).fillColor('#CFCFCF').text(
  'She’s actively using her platform for good, living as a role model for girls in the next generation. We love working with her.',
  M + 26, y2 + 6, { width: W - 120, lineGap: 3 });
label('Liesl Goecker · Head of Marketing, Nua', M + 26, y2 + 48, DIM);

// contact
const cy = A4[1] - M - 96;
rule(M, cy - 14, W);
label('Start a Conversation', M, cy, ACC);
doc.font('Helvetica-Bold').fontSize(13).fillColor(INK).text('hello@poojaraghu.com', M, cy + 20);
doc.font('Helvetica').fontSize(9.5).fillColor(BODY).text('+91 98867 47996 (WhatsApp)', M, cy + 40);
doc.font('Helvetica').fontSize(9.5).fillColor(BODY).text('instagram.com/pooja_raghu   ·   linkedin.com/in/poojaraghu   ·   poojaraghu.com', M, cy + 56);

doc.image(`${IMG}/trio2026_medal.jpg`, A4[0] - M - 96, cy - 6, { width: 96, height: 128 });
doc.rect(A4[0] - M - 96, cy - 6, 96, 128).lineWidth(0.8).strokeColor(FAINT).stroke();

doc.end();
console.log('written', OUT);
