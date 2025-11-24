#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const EXCLUDE = new Set(['node_modules', '.git', 'dist', 'build']);
const IMPORT_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.png', '.jpg', '.jpeg', '.svg', '.webp'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (EXCLUDE.has(e.name)) continue;
      files.push(...await walk(res));
    } else {
      if (/\.(ts|tsx|js|jsx)$/.test(e.name)) files.push(res);
    }
  }
  return files;
}

function collectImports(content) {
  const imports = [];
  for (const m of content.matchAll(/import\s+([\s\S]+?)\s+from\s+['"](.+?)['"]/g)) {
    const spec = m[2];
    imports.push(spec);
  }
  // also dynamic imports: import('...')
  for (const m of content.matchAll(/import\(\s*['"](.+?)['"]\s*\)/g)) {
    imports.push(m[1]);
  }
  return Array.from(new Set(imports));
}

async function resolveImport(fromFile, imp) {
  if (!imp.startsWith('.')) return { resolved: true, reason: 'external' };
  const base = path.resolve(path.dirname(fromFile), imp);
  // try direct file
  for (const ext of IMPORT_EXTS) {
    const f = base + ext;
    try { await fs.access(f); return { resolved: true, path: f }; } catch(e){}
  }
  // try index files
  for (const ext of IMPORT_EXTS) {
    const f = path.join(base, 'index' + ext);
    try { await fs.access(f); return { resolved: true, path: f }; } catch(e){}
  }
  return { resolved: false };
}

async function run() {
  console.log('Scanning project for unresolved relative imports...');
  const files = await walk(ROOT);
  const report = [];
  for (const f of files) {
    const content = await fs.readFile(f, 'utf8');
    const imps = collectImports(content);
    for (const imp of imps) {
      const res = await resolveImport(f, imp);
      if (!res.resolved) report.push({ file: path.relative(ROOT, f), import: imp });
    }
  }
  if (!report.length) {
    console.log('No unresolved relative imports found.');
    return;
  }
  console.log('\nUnresolved imports:');
  for (const r of report) console.log(` - ${r.file} -> ${r.import}`);
  console.log('\nYou can remove or fix these imports. If you want, run the fixer script after reviewing.');
}

run().catch(err => { console.error(err); process.exit(2); });
