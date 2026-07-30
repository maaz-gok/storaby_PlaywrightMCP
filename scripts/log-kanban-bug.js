import { readFile } from 'fs/promises';

const apiBase = process.env.KANBAN_BASE_URL || 'https://pm-gok-release.onrender.com';
const loginEmail = process.env.KANBAN_EMAIL;
const loginPassword = process.env.KANBAN_PASSWORD;
const projectId = process.env.KANBAN_PROJECT_ID;
const bugFilePath = process.argv[2];

if (!loginEmail || !loginPassword) {
  throw new Error('KANBAN_EMAIL and KANBAN_PASSWORD environment variables are required.');
}
if (!bugFilePath) {
  throw new Error('Usage: node scripts/log-kanban-bug.js <path-to-bug-file>');
}

const authUrl = `${apiBase}/auth/login`;
const projectsUrl = `${apiBase}/api/projects/my-projects`;
const tasksUrl = `${apiBase}/api/tasks`;

const log = (...args) => console.log('[kanban-bug]', ...args);

async function login() {
  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://gok-pm-tool.vercel.app',
      Referer: 'https://gok-pm-tool.vercel.app/',
      'User-Agent': 'Mozilla/5.0',
    },
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Login failed: ${response.status} ${response.statusText} - ${body}`);
  }

  return await response.json();
}

async function getProjectId(token) {
  if (projectId) {
    log('Using configured projectId:', projectId);
    return projectId;
  }

  const response = await fetch(projectsUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Fetching projects failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('No projects returned from projects endpoint.');
  }

  return data[0]?.id || data[0]?._id;
}

async function createTask(token, payload) {
  const response = await fetch(tasksUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Origin: 'https://gok-pm-tool.vercel.app',
      Referer: 'https://gok-pm-tool.vercel.app/',
      'User-Agent': 'Mozilla/5.0',
    },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Create task failed: ${response.status} ${response.statusText}\n${body}`);
  }

  return JSON.parse(body);
}

function normalizeDescription(text) {
  const normalized = text
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  const sanitizedPaths = normalized
    .replace(/(?:Resources|resources)\/[\w\-\.\/]+/g, 'a large file')
    .replace(/\(e\.g\.\s*a large file\)/gi, '(e.g. a large file)')
    .replace(/-\s*\d+(?:\.\d+)?MB/gi, '')
    .replace(/https?:\/\/[\w\-\.\/]+/gi, 'the app');

  const withHeadings = sanitizedPaths.replace(
    /\*\*(Summary|Steps to Reproduce|Actual Result|Expected Result|Environment|Related Test):\*\*\s*/gi,
    '**$1:**\n\n'
  );

  const withStepLines = withHeadings
    .replace(/Steps to Reproduce:\n\n\s*(\d+)\./gi, 'Steps to Reproduce:\n\n$1.')
    .replace(/\s+(\d+)\.\s+/g, '\n$1. ');

  const compacted = withStepLines.replace(/\n{3,}/g, '\n\n').trim();

  return compacted;
}

async function main() {
  log('Reading bug file:', bugFilePath);
  const raw = await readFile(bugFilePath, 'utf8');
  const [titleLine, ...rest] = raw.split('\n');
  const title = titleLine.replace(/^#\s*/, '').trim() || 'Kanban bug report';
  const description = normalizeDescription(rest.join('\n'));

  log('Logging in to Kanban API:', authUrl);
  const loginResult = await login();
  const token = loginResult?.token || loginResult?.accessToken;
  if (!token) {
    throw new Error('Could not extract token from login response.');
  }
  log('Login successful. Token obtained.');

  log('Fetching project list from:', projectsUrl);
  const resolvedProjectId = await getProjectId(token);
  log('Resolved projectId:', resolvedProjectId);

  const payload = {
    projectId: resolvedProjectId,
    title,
    description,
    status: 'To Do',
    priority: 'Medium',
    type: 'Bug',
  };

  log('Creating task at:', tasksUrl);
  const created = await createTask(token, payload);
  log('Task created successfully:', created);
}

main().catch((error) => {
  console.error('[kanban-bug] Error:', error.message || error);
  process.exit(1);
});
