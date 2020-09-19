//  函數宣告
//  跳脫特殊字防範 XSS
function escape(unsafeStr) {
  /* eslint-disable */
  return String(unsafeStr).replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
  /* eslint-enable */
}

//  加入 CSS 至 head 內 <style>
export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
}

//  新增留言至 DOM 容器內
export function addCommentsToDom(container, comment, isPrepend) {
  const html = `
    <div class="card my-3">
      <div class="card-body">
        <h5 class="card-title">ID: ${escape(comment.id)}</h5>
        <h5 class="card-title">${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
        <p class="card-text"><small class="text-muted">${escape(comment.created_at)}</small></p>
      </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}
