/**
 * Shared one-pager renderer for the JazzX Design Studio framework.
 *
 * Every one-pager uses the same eight sections so the pack reads as one system:
 *   Purpose / Owner & RACI / Decisions this document makes / The framework /
 *   Artifacts & templates / Cadence / Definition of done / Risks & escalation
 *
 * Content lives in content-*.js; this file only knows how to draw it.
 */

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageOrientation, LevelFormat, Footer, PageNumber, convertInchesToTwip,
} = require('docx');

// US Letter, 1" margins => 9360 DXA of content width.
const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - MARGIN * 2;

const NAVY = '0E3A4F';
const TEAL = '1B6B7C';
const LIGHT = '3E8FA3';
const RULE = 'C9D6DC';
const ZEBRA = 'F2F6F8';
const INK = '1A1A1A';
const MUTED = '5A6B73';

const FONT = 'Calibri';

/* ---------------------------------------------------------------- helpers */

const run = (text, o = {}) => new TextRun({ text, font: FONT, ...o });

function para(text, o = {}) {
  const { spacing, indent, ...runOpts } = o;
  return new Paragraph({
    spacing: spacing || { after: 120, line: 276 },
    indent,
    children: [run(text, runOpts)],
  });
}

/** Section heading: small caps-ish teal label with a hairline rule under it. */
function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 280, after: 140 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 6 } },
    children: [run(text.toUpperCase(), { bold: true, size: 20, color: TEAL, characterSpacing: 20 })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    spacing: { after: 80, line: 276 },
    children: parseInline(text),
  });
}

function numbered(text, level = 0, instance = 0) {
  return new Paragraph({
    // A distinct `instance` per list; without it docx continues one shared sequence
    // across every ordered list in the document (decisions 1-5, then steps 6, 7...).
    numbering: { reference: 'steps', level, instance },
    spacing: { after: 80, line: 276 },
    children: parseInline(text),
  });
}

/** Minimal **bold** support so content files stay readable as plain strings. */
function parseInline(text, base = {}) {
  const out = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(run(text.slice(last, m.index), { size: 21, color: INK, ...base }));
    out.push(run(m[1], { size: 21, color: INK, bold: true, ...base }));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(run(text.slice(last), { size: 21, color: INK, ...base }));
  return out.length ? out : [run(text, { size: 21, color: INK, ...base })];
}

function body(text) {
  return new Paragraph({ spacing: { after: 120, line: 276 }, children: parseInline(text) });
}

function subHeading(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [run(text, { bold: true, size: 22, color: NAVY })],
  });
}

/* ----------------------------------------------------------------- tables */

function cell(text, o = {}) {
  const { width, header = false, shade, bold = false, align } = o;
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: shade ? { type: ShadingType.CLEAR, fill: shade, color: 'auto' } : undefined,
    margins: { top: 80, bottom: 80, left: 110, right: 110 },
    // Arrays become multiple paragraphs in the cell (never "\n" — Word ignores it).
    children: (Array.isArray(text) ? text : [text]).map((line) => new Paragraph({
      alignment: align,
      spacing: { after: 0, line: 260 },
      children: header
        ? [run(String(line), { bold: true, size: 19, color: 'FFFFFF' })]
        : parseInline(String(line), bold ? { bold: true } : {}),
    })),
  });
}

/**
 * table = { columns: [...], widths: [fractions], rows: [[...]], boldFirstCol }
 * Widths are fractions of the content width; they are normalised here so
 * column widths always sum exactly to the table width (Google Docs is strict).
 */
function buildTable(t) {
  const fr = t.widths || t.columns.map(() => 1 / t.columns.length);
  const total = fr.reduce((a, b) => a + b, 0);
  const widths = fr.map((f) => Math.floor((f / total) * CONTENT_W));
  widths[widths.length - 1] += CONTENT_W - widths.reduce((a, b) => a + b, 0);

  const rows = [
    new TableRow({
      tableHeader: true,
      children: t.columns.map((c, i) => cell(c, { width: widths[i], header: true, shade: NAVY })),
    }),
    ...t.rows.map((r, ri) => new TableRow({
      children: r.map((v, i) => cell(v, {
        width: widths[i],
        shade: ri % 2 ? ZEBRA : undefined,
        bold: t.boldFirstCol && i === 0,
      })),
    })),
  ];

  return new Table({
    columnWidths: widths,
    width: { size: CONTENT_W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      left: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      right: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: RULE },
    },
    rows,
  });
}

function tableBlock(t) {
  const out = [];
  if (t.title) out.push(subHeading(t.title));
  out.push(buildTable(t));
  if (t.note) {
    out.push(new Paragraph({
      spacing: { before: 80, after: 160 },
      children: [run(t.note, { size: 18, italics: true, color: MUTED })],
    }));
  } else {
    out.push(new Paragraph({ spacing: { after: 160 }, children: [] }));
  }
  return out;
}

/* ------------------------------------------------------------------ title */

function titleBlock(doc) {
  const out = [];

  out.push(new Paragraph({
    spacing: { after: 40 },
    children: [run(`${doc.section.toUpperCase()}  │  ONE-PAGER ${doc.id}`,
      { bold: true, size: 17, color: LIGHT, characterSpacing: 30 })],
  }));

  out.push(new Paragraph({
    spacing: { after: 60 },
    children: [run(doc.title, { bold: true, size: 40, color: NAVY })],
  }));

  out.push(new Paragraph({
    spacing: { after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: TEAL, space: 8 } },
    children: [run(doc.strap || '', { size: 21, color: MUTED, italics: true })],
  }));

  return out;
}

/* ------------------------------------------------------------- assembling */

function renderDoc(doc) {
  const c = [];

  c.push(...titleBlock(doc));

  c.push(sectionHeading('Purpose'));
  c.push(body(doc.purpose));

  if (doc.raci) {
    c.push(sectionHeading('Owner & RACI'));
    c.push(buildTable({
      columns: ['Role', 'Who (fill in at G0)', 'R / A / C / I'],
      widths: [0.34, 0.4, 0.26],
      rows: doc.raci,
    }));
    c.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  }

  // Each ordered list gets its own numbering instance so all of them start at 1.
  let listInstance = 0;

  if (doc.decisions && doc.decisions.length) {
    c.push(sectionHeading('Decisions this document makes'));
    const inst = listInstance++;
    doc.decisions.forEach((d) => c.push(numbered(d, 0, inst)));
  }

  c.push(sectionHeading('The framework'));
  (doc.framework || []).forEach((blk) => {
    if (blk.heading) c.push(subHeading(blk.heading));
    (blk.body || []).forEach((p) => c.push(body(p)));
    (blk.bullets || []).forEach((b) => {
      if (typeof b === 'string') c.push(bullet(b));
      else c.push(bullet(b.text, b.level || 0));
    });
    if (blk.steps && blk.steps.length) {
      const inst = listInstance++;
      blk.steps.forEach((st) => c.push(numbered(st, 0, inst)));
    }
    (blk.tables || []).forEach((t) => c.push(...tableBlock(t)));
  });

  if (doc.tables && doc.tables.length) {
    c.push(sectionHeading('Artifacts & templates'));
    doc.tables.forEach((t) => c.push(...tableBlock(t)));
  }

  if (doc.cadence && doc.cadence.length) {
    c.push(sectionHeading('Cadence'));
    c.push(buildTable({
      columns: ['When', 'What happens', 'Output'],
      widths: [0.22, 0.48, 0.3],
      rows: doc.cadence,
      boldFirstCol: true,
    }));
    c.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  }

  if (doc.dod && doc.dod.length) {
    c.push(sectionHeading('Definition of done'));
    doc.dod.forEach((d) => c.push(bullet(d)));
  }

  if (doc.risks && doc.risks.length) {
    c.push(sectionHeading('Risks & escalation'));
    c.push(buildTable({
      columns: ['Risk', 'Mitigation', 'Escalates to'],
      widths: [0.3, 0.45, 0.25],
      rows: doc.risks,
    }));
  }

  return new Document({
    creator: 'Design Studio Program Office',
    title: doc.title,
    description: doc.strap || doc.purpose,
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [0, 1, 2].map((lvl) => ({
            level: lvl,
            format: LevelFormat.BULLET,
            text: ['●', '○', '▪'][lvl],
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: convertInchesToTwip(0.28 + lvl * 0.25), hanging: convertInchesToTwip(0.18) },
              },
              run: { size: 21, color: lvl === 0 ? TEAL : MUTED },
            },
          })),
        },
        {
          reference: 'steps',
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: convertInchesToTwip(0.32), hanging: convertInchesToTwip(0.22) } },
                run: { size: 21, bold: true, color: TEAL },
              },
            },
            {
              level: 1,
              format: LevelFormat.LOWER_LETTER,
              text: '%2.',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: convertInchesToTwip(0.58), hanging: convertInchesToTwip(0.22) } },
                run: { size: 21, color: MUTED },
              },
            },
          ],
        },
      ],
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H, orientation: PageOrientation.PORTRAIT },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 6 } },
            children: [
              run(`JazzX Design Studio — 90-Day Framework  │  ${doc.title}   `,
                { size: 16, color: MUTED }),
              new TextRun({ children: ['Page ', PageNumber.CURRENT], font: FONT, size: 16, color: MUTED }),
            ],
          })],
        }),
      },
      children: c,
    }],
  });
}

async function write(doc, outPath) {
  const fs = require('fs');
  const buf = await Packer.toBuffer(renderDoc(doc));
  fs.writeFileSync(outPath, buf);
  return outPath;
}

module.exports = { write, renderDoc, CONTENT_W };
