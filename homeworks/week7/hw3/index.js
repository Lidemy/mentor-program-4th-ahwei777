//  設置函數處理特殊符號，除正確顯示外也避免使用者利用語法特性組合文字危害安全
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
document.querySelector('.btn-new').addEventListener('click', () => {
  const text = document.querySelector('.input-bar').value;
  const div = document.createElement('div');
  if (text) {
    div.classList.add('todo');
    div.innerHTML = `
      <input class = 'todo-checkbox' type = 'checkbox' name = 'checkbox'/>
      <div class = 'todo-title'>${escapeHtml(text)}</div>
      <button class = 'btn-delete'>刪除</button>
    `;
    document.querySelector('.todos-block').appendChild(div);
    document.querySelector('.input-bar').value = '';
  }
});
//  動態新增元素需利用上層元素進行代理事件監聽
document.querySelector('.todos-block').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    e.target.parentNode.remove();
    return;
  }
  if (e.target.type === 'checkbox') {
    e.target.parentNode.classList.toggle('checked');
  }
});
