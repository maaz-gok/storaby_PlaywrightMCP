import { existsSync, renameSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const archiveDir = join(root, 'reports-archive');
const dirs = ['playwright-report', 'allure-results', 'allure-report'];

mkdirSync(archiveDir, { recursive: true });

// Preserve Allure history from previous report so trend charts carry forward
const prevHistory = join(root, 'allure-report', 'history');
const resultsHistory = join(root, 'allure-results', 'history');
if (existsSync(prevHistory)) {
  mkdirSync(resultsHistory, { recursive: true });
  cpSync(prevHistory, resultsHistory, { recursive: true });
  console.log('Preserved allure-report/history/ → allure-results/history/');
}

for (const dir of dirs) {
  const src = join(root, dir);
  if (existsSync(src)) {
    const dest = join(archiveDir, `${dir}-${ts}`);
    renameSync(src, dest);
    console.log(`Archived ${dir}/ → reports-archive/${dir}-${ts}/`);
  }
}
