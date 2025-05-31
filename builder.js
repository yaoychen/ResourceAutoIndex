const fs = require('fs');
const path = require('path');

function humanFileSize(size) {
  if (size < 1024) return size + ' B';
  let i = Math.floor(Math.log(size) / Math.log(1024));
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  return (size / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

function listDir(dir, rel = '') { // 可以在这里修改自定义list样式
  let html = '<ul class="list-group">';
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const relPath = path.join(rel, file);
    if (fs.statSync(fullPath).isDirectory()) {
      html += `<li class="list-group-item"><strong>${file}</strong>${listDir(fullPath, relPath)}</li>`;
    } else {
      const size = humanFileSize(fs.statSync(fullPath).size);
      html += `
<li class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center">
  <span>${file}</span>
  <div>
    <a href="/nodejs${relPath.replace(/\\/g, '/')}" class="btn btn-sm btn-primary ms-2" download>
      <i class="fa-solid fa-download"></i> 下载
    </a>
    <p class="mb-0 text-muted" style="font-size:0.9em;">${size}</p>
  </div>
</li>`;
    }
  });
  html += '</ul>';
  return html;
}
function build() {
const rootDir = '???'; //请在这里放置需要编制索引的目录，Win/Linux格式均可
const html = `???`; //请在这里放置sample_HTML.html的内容

fs.writeFileSync('???', html); //请在这里放置推送到的文件（例如resources.html）
console.log('resources.html 已生成');
}

listDir(); 

/*
可以复制多个function，生成多个目录
Author: Patrick
*/
