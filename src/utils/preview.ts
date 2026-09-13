import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';

export function startPreviewServer(readmePath: string, port = 3000): void {
  const readmeContent = readFileSync(readmePath, 'utf-8');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>README Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #0d1117; color: #c9d1d9; }
    .toolbar { background: #161b22; border-bottom: 1px solid #30363d; padding: 12px 24px; display: flex; gap: 12px; align-items: center; }
    .toolbar h1 { font-size: 14px; color: #8b949e; font-weight: 400; }
    .mode-btn { background: #21262d; border: 1px solid #30363d; color: #c9d1d9; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
    .mode-btn.active { background: #1f6feb; border-color: #1f6feb; color: #fff; }
    .container { max-width: 1012px; margin: 0 auto; padding: 32px; }
    .markdown-body { color: #c9d1d9; font-size: 16px; line-height: 1.6; }
    .markdown-body h1 { font-size: 2em; border-bottom: 1px solid #30363d; padding-bottom: 0.3em; margin: 24px 0 16px; }
    .markdown-body h2 { font-size: 1.5em; border-bottom: 1px solid #21262d; padding-bottom: 0.3em; margin: 24px 0 16px; }
    .markdown-body h3 { font-size: 1.25em; margin: 24px 0 16px; }
    .markdown-body p { margin: 0 0 16px; }
    .markdown-body a { color: #58a6ff; text-decoration: none; }
    .markdown-body a:hover { text-decoration: underline; }
    .markdown-body img { max-width: 100%; height: auto; }
    .markdown-body table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    .markdown-body th, .markdown-body td { border: 1px solid #30363d; padding: 6px 13px; }
    .markdown-body th { background: #161b22; font-weight: 600; }
    .markdown-body tr:nth-child(even) { background: #161b22; }
    .markdown-body code { background: #161b22; padding: 0.2em 0.4em; border-radius: 6px; font-size: 85%; }
    .markdown-body pre { background: #161b22; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 16px 0; }
    .markdown-body hr { border: none; border-top: 1px solid #30363d; margin: 24px 0; }
    .markdown-body ul, .markdown-body ol { padding-left: 2em; margin: 16px 0; }
    .markdown-body li { margin: 4px 0; }
    .markdown-body div[align="center"] { text-align: center; }
    .markdown-body table { display: table; }
    .markdown-body td { vertical-align: top; }
    .width-mobile { max-width: 375px; margin: 32px auto; padding: 16px; border: 1px solid #30363d; border-radius: 6px; }
    .width-desktop { max-width: 1012px; }
    .badge { display: inline-block; margin: 2px; }
    .badge img { height: 20px; }
  </style>
</head>
<body>
  <div class="toolbar">
    <h1>README Preview</h1>
    <button class="mode-btn active" onclick="setMode('light')">Light</button>
    <button class="mode-btn" onclick="setMode('dark')">Dark</button>
    <button class="mode-btn" onclick="setWidth('desktop')">Desktop</button>
    <button class="mode-btn" onclick="setWidth('mobile')">Mobile</button>
  </div>
  <div class="container width-desktop" id="container">
    <article class="markdown-body">
      ${readmeToHtml(readmeContent)}
    </article>
  </div>
  <script>
    function setMode(mode) {
      document.body.style.background = mode === 'light' ? '#ffffff' : '#0d1117';
      document.body.style.color = mode === 'light' ? '#24292f' : '#c9d1d9';
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
    }
    function setWidth(w) {
      const c = document.getElementById('container');
      c.className = w === 'mobile' ? 'width-mobile' : 'container width-desktop';
    }
  </script>
</body>
</html>`;

  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });

  server.listen(port, () => {
    console.log(`README preview running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop.');
  });
}

function readmeToHtml(md: string): string {
  let html = md;

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

  html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
    return '<ul>' + match + '</ul>';
  });
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p>\s*<(h[1-3]|hr|pre|div|table|ul|ol|img)/g, '<$1');
  html = html.replace(/<\/(h[1-3]|hr|pre|div|table|ul|ol|img)>\s*<\/p>/g, '</$1>');
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}
