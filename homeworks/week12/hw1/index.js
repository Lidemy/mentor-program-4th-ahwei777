/* global $ */
//  變數宣告
const apiBaseUrl = 'http://mentor-program.co/mtr04group4/ahwei777/week12/hw1';
const siteKey = 'lidemy';
const container = $('.comments');
let lastID = null;
let isLast = false;

//  函數宣告
//  跳脫特殊字防範 XSS
function escape(unsafeStr) {
  /* eslint-disable */
  return unsafeStr.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
  /* eslint-enable */
}
//  負責 call api 取得資料
function getCommentsAPI(before, cb) {
  let url = `${apiBaseUrl}/api_comments.php?site_key=${siteKey}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    type: 'GET',
    url,
    success: (resp) => {
      cb(resp);
    },
    error: (error) => {
      cb(null, error);
    },
  });
}
//  新增留言至 DOM 容器內
function addComments(comment, isPrepend) {
  const html = `
    <div class="card my-3">
      <div class="card-body">
        <h5 class="card-title">ID: ${comment.id}</h5>
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
//  負責串接 API 與 DOM
function getComments() {
  getCommentsAPI(lastID, (resp, error) => {
    if (error) {
      console.log(error);
      return;
    }
    //  後端成功接收但回傳錯誤(例如資料庫尚無資料)
    if (!resp.ok) {
      // eslint-disable-next-line
      alert(resp.message);
      return;
    }
    const { comments } = resp;
    // eslint-disable-next-line
    for (const comment of comments) {
      addComments(comment);
    }
    //  更新當前 lastID
    lastID = comments[comments.length - 1].id;
    isLast = comments[comments.length - 1].is_last;
    //  從一開始至每次 call API 時都記錄該次抓取到的最後一個元素是否為資料庫最後一個，否的話就顯示按鈕
    if (!isLast) {
      $('.btn_more').removeClass('d-none');
    } else {
      $('.btn_more').addClass('d-none');
    }
  });
}
//  抓取輸入框並發送留言至後端
function sendComment() {
  const nickname = $('input[name=nickname]').val();
  const content = $('textarea[name=content]').val();
  const newComment = {
    site_key: siteKey,
    nickname,
    content,
  };
  $.ajax({
    type: 'POST',
    url: `${apiBaseUrl}/api_add_comments.php?site_key=${siteKey}`,
    data: newComment,
    success: (response) => {
      //  後端成功接收但回傳錯誤
      if (!response.ok) {
        // eslint-disable-next-line
        alert(response.message);
      }
      //  傳送成功後取得剛發送的最新一筆留言並 prepend 回去
      $.ajax({
        type: 'GET',
        url: `${apiBaseUrl}/api_comments.php?site_key=${siteKey}`,
        success: (r) => {
          addComments(r.comments[0], true);
        },
        error: (error) => {
          console.log('Error', error);
        },
      });
    },
    error: (error) => {
      console.log('Error', error);
    },
  });
}

//  頁面載入時先抓取資料庫最新五筆留言
getComments();
//  當顯示載入更多且被點擊時發 GET 取得之後的五筆留言
$('.btn_more').click(() => {
  getComments();
});
//  偵測點擊後新增留言
const formComment = $('.form_comment');
formComment.submit((e) => {
  e.preventDefault();
  //  檢查空值
  if (formComment[0].checkValidity() === false) {
    formComment[0].classList.add('was-validated');
    return;
  }
  formComment[0].classList.remove('was-validated');
  sendComment();
  //  傳送後清空輸入框
  $('input[name=nickname]').val('');
  $('textarea[name=content]').val('');
});
