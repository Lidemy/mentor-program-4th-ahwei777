//  CSS
export const cssTemplate = `
nav {
  box-shadow: 10px 10px 20px midnightblue;
}
body {
  background: url(./img/bg.jpg) center/cover no-repeat;
}
.wrapper {
  padding: 30px;
  border-radius: 10px;
  background: white;
  opacity: 0.9;
  max-width: 600px;
  margin: 50px auto;
}
.form_header {
  text-align: center;
  font-size: 20px;
}
`;

//  html 內固定模板
export function getForm(formClassName, commentsClassName) {
  return `
  <div class = 'wrapper'>
    <form class="needs-validation ${formClassName}" novalidate>
      <div class = "form_header">隨便寫點東西吧！</div>
      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label>暱稱</label>
          <input name = 'nickname' type="text" class="form-control" required>
          <div class="invalid-feedback">
            請輸入暱稱！
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col mb-3">
          <label">想說的話：</label>
          <textarea name = 'content' style = 'resize: none;' class="form-control" rows="5" required></textarea>
          <div class="invalid-feedback">
            請輸入留言！
          </div>
        </div>
      </div>
      <button class="btn btn-primary" type="submit">送出</button>
    </form>
    <!-- 留言 container -->
    <div class = "${commentsClassName}">
    </div>
    <!-- btn_more -->
  </div>
  `;
}

//  載入更多按鈕
export function getLoadMoreButton(className) {
  return `<button type="button" class="btn btn-secondary btn-lg btn-block ${className}">載入更多</button>`;
}
