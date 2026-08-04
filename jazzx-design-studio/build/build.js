#!/usr/bin/env node
/**
 * Builds every one-pager in the JazzX Design Studio pack.
 *
 *   NODE_PATH=<...>/node_modules node build/build.js [outDir]
 *
 * Content is data (content-*.js); layout is code (render.js). Adding a
 * one-pager means adding an object, never touching the renderer.
 */

const fs = require('fs');
const path = require('path');
const { write } = require('./render');

const groups = ['./content-program', './content-logistics', './content-execution'];

async function main() {
  const outDir = path.resolve(process.argv[2] || path.join(__dirname, '..', 'one-pagers'));
  fs.mkdirSync(outDir, { recursive: true });

  const docs = groups.flatMap((g) => {
    try {
      return require(g);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND' && e.message.includes(g.slice(2))) return [];
      throw e;
    }
  });

  const seen = new Set();
  for (const d of docs) {
    if (seen.has(d.id)) throw new Error(`Duplicate one-pager id: ${d.id}`);
    seen.add(d.id);
    const out = path.join(outDir, `${d.file}.docx`);
    await write(d, out);
    console.log(`  ${d.id}  ${path.basename(out)}`);
  }
  console.log(`\n${docs.length} one-pager(s) written to ${outDir}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
