#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const EXCLUDE = ['node_modules', '.git', 'dist', 'build'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (EXCLUDE.includes(e.name)) continue;
      files.push(...await walk(res));
    } else {
      if (/\.jsx?$/.test(e.name)) files.push(res);
    }
  }
  return files;
}

function looksLikeJSX(content) {
  return /<\s*[A-Za-z]/.test(content) && /<\/.+>/.test(content) || /React\.createElement/.test(content);
}

async function backupAndRename(file) {
  const content = await fs.readFile(file, 'utf8');
  const isJsx = looksLikeJSX(content) || file.endsWith('.jsx');
  const newExt = isJsx ? '.tsx' : '.ts';
  const newPath = file.replace(/\.jsx?$/, newExt);
  const bakPath = file + '.bak';
  await fs.copyFile(file, bakPath);
  await fs.rename(file, newPath);
  return { old: file, bak: bakPath, renamed: newPath, isJsx };
}

async function updateImports(allFiles) {
  const importRegex = /(['"])(\.\/.+?|\.\.[^'"\n]+?)\.(js|jsx)\1/g;
  for (const f of allFiles) {
    const ext = path.extname(f).toLowerCase();
    if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) continue;
    let content = await fs.readFile(f, 'utf8');
    const newContent = content.replace(importRegex, (m, q, p) => `${q}${p}${q}`);
    if (newContent !== content) await fs.writeFile(f, newContent, 'utf8');
  }
}

async function run() {
  console.log('Scanning for .js/.jsx files...');
  const files = await walk(ROOT);
  if (!files.length) {
    console.log('No .js/.jsx files found.');
    return;
  }
  console.log(`Found ${files.length} files.`);
  const results = [];
  for (const f of files) {
    try {
      const res = await backupAndRename(f);
      results.push(res);
      console.log('Renamed:', path.relative(ROOT, res.old), '->', path.relative(ROOT, res.renamed));
    } catch (err) {
      console.error('Failed to rename', f, err.message);
    }
  }

  console.log('Updating import paths to remove .js/.jsx extensions...');
  async function collectAll(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const out = [];
    for (const e of entries) {
      const res = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (EXCLUDE.includes(e.name)) continue;
        out.push(...await collectAll(res));
      } else {
        out.push(res);
      }
    }
    return out;
  }

  const allFiles = await collectAll(ROOT);
  await updateImports(allFiles);

  console.log('\nSummary:');
  console.log(` - Files renamed: ${results.length}`);
  console.log(' - Original files backed up with .bak extension next to them.');
  console.log('\nNext steps:');
  console.log(' - Run TypeScript compiler / start dev server and fix any type errors.');
  console.log(' - When satisfied, remove .bak files and commit changes.');
}

run().catch(err => { console.error(err); process.exit(2); });
