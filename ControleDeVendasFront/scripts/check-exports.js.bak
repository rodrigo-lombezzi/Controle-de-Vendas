#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const EXTS = ['.ts', '.tsx', '.js', '.jsx', '.d.ts'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', '.venv', 'dist', 'build'].includes(e.name)) continue;
      files.push(...await walk(res));
    } else {
      if (/\.(ts|tsx|js|jsx)$/.test(e.name)) files.push(res);
    }
  }
  return files;
}

function parseExports(content) {
  const hasDefault = /export\s+default\b/.test(content);
  const named = new Set();
  // export { A, B as C }
  for (const m of content.matchAll(/export\s*\{([^}]+)\}/g)) {
    m[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean).forEach(n => named.add(n));
  }
  // export const|function|class NAME
  for (const m of content.matchAll(/export\s+(?:const|let|var|function|class|type|interface)\s+([A-Za-z0-9_$]+)/g)) {
    named.add(m[1]);
  }
  return { hasDefault, named: Array.from(named) };
}

function parseImports(content) {
  const imports = [];
  for (const m of content.matchAll(/import\s+([\s\S]+?)\s+from\s+['"](.+?)['"]/g)) {
    const spec = m[1].trim();
    const from = m[2];
    if (spec.startsWith('{')) {
      const names = spec.replace(/[{}]/g, '').split(',').map(s => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
      imports.push({ type: 'named', names, from });
    } else if (spec.startsWith('*')) {
      imports.push({ type: 'namespace', names: [], from });
    } else {
      // default or mixed: "Default, {A,B}"
      const parts = spec.split(',').map(p => p.trim()).filter(Boolean);
      const def = parts[0] && !parts[0].startsWith('{') ? parts[0] : null;
      const namedPart = parts.find(p => p.startsWith('{')) || '';
      const names = namedPart.replace(/[{}]/g, '').split(',').map(s => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
      imports.push({ type: 'mixed', default: def, names, from });
    }
  }
  return imports;
}

async function resolveModule(fromFile, modulePath) {
  if (!modulePath.startsWith('.')) return null; // skip external
  const base = path.resolve(path.dirname(fromFile), modulePath);
  // try file.ext
  for (const ext of EXTS) {
    const file = base + ext;
    try { await fs.access(file); return file; } catch(e){}
  }
  // try index files in dir
  for (const ext of EXTS) {
    const file = path.join(base, 'index' + ext);
    try { await fs.access(file); return file; } catch(e){}
  }
  return null;
}

async function analyze() {
  console.log('Scanning project (this may take a few seconds)...');
  const files = await walk(ROOT);
  const fileMap = Object.create(null);
  for (const f of files) {
    const content = await fs.readFile(f, 'utf8');
    fileMap[f] = { content, exports: parseExports(content), imports: parseImports(content) };
  }

  const problems = [];

  for (const [file, info] of Object.entries(fileMap)) {
    for (const imp of info.imports) {
      const resolved = await resolveModule(file, imp.from);
      if (!resolved) continue; // external module or cannot resolve
      const target = fileMap[resolved];
      if (!target) continue;
      if (imp.type === 'named' || imp.type === 'mixed') {
        // check named imports
        for (const name of imp.names) {
          if (!target.exports.named.includes(name)) {
            problems.push({ file, importLine: imp, target: resolved, issue: `Named import '{${name}}' not found in target` });
          }
        }
      }
      if (imp.type === 'mixed') {
        if (imp.default && !target.exports.hasDefault) {
          problems.push({ file, importLine: imp, target: resolved, issue: `Default import '${imp.default}' not found in target` });
        }
      }
      if (imp.type === 'default') {
        if (!target.exports.hasDefault) {
          problems.push({ file, importLine: imp, target: resolved, issue: `Default import not found in target` });
        }
      }
    }
  }

  // print report
  console.log('\nExport summary (files with default export):');
  for (const [f, v] of Object.entries(fileMap)) {
    if (v.exports.hasDefault) console.log(' -', path.relative(ROOT, f));
  }

  console.log('\nExport summary (files with named exports):');
  for (const [f, v] of Object.entries(fileMap)) {
    if (v.exports.named.length) console.log(' -', path.relative(ROOT, f), '=>', v.exports.named.join(', '));
  }

  if (!problems.length) console.log('\nNo obvious import/export mismatches detected.');
  else {
    console.log(`\nFound ${problems.length} potential issues:`);
    for (const p of problems) {
      console.log(`\nFile: ${path.relative(ROOT, p.file)}`);
      console.log(`Target: ${path.relative(ROOT, p.target)}`);
      console.log(`Issue: ${p.issue}`);
      console.log(`Import: ${JSON.stringify(p.importLine)}`);
    }
  }
}

analyze().catch(err => { console.error(err); process.exit(2); });
