// eslint-disable-next-line
import $ from 'jquery';
import { getCommentsAPI, sendCommentAPI } from './api';
import { addCommentsToDom, appendStyle } from './utils';
import { cssTemplate, getLoadMoreButton, getForm } from './templates';

//  創建一個可依據使用者輸入參數啟用的初始化函數，webpack 會將其作為全域參數以方便直接使用
// eslint-disable-next-line
export function init(options) {
  //  變數需宣告於 init 內以確保變數互相獨立，如宣告於全域，則呼叫第二次 init (置入兩個留言板) 時會將全域變數一併更動，造成選取錯誤
  const { apiBaseUrl, siteKey } = options;
  const templateContainer = $(options.containerSelector);
  let lastID = null;
  let isLast = false;

  //  選擇器依據不同網域命名，避免置入兩個留言板時 class 產生衝突
  const commentsClassName = `${siteKey}-comments`;
  const commentsSelector = `.${commentsClassName}`;
  const commentDOM = $(commentsSelector);
  const loadMoreClassName = `${siteKey}-btn_load-more`;
  const loadMoreSelector = `.${loadMoreClassName}`;
  const formClassName = `${siteKey}-add-comment-form`;
  const formSelector = `.${formClassName}`;

  //  負責串接 API 與 DOM
  function getComments() {
    //  先將先前的顯示更多按鈕隱藏
    $(loadMoreSelector).addClass('d-none');
    //  向後端取資料
    getCommentsAPI(apiBaseUrl, siteKey, lastID, (resp, error) => {
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
        addCommentsToDom(commentDOM, comment);
      }
      //  更新當前 lastID
      lastID = comments[comments.length - 1].id;
      isLast = comments[comments.length - 1].is_last;
      //  從一開始至每次 call API 時都記錄該次抓取到的最後一個元素是否為資料庫最後一個，否的話就顯示按鈕
      if (!isLast) {
        const loadMoreButtonHtml = getLoadMoreButton(loadMoreClassName);
        commentDOM.append(loadMoreButtonHtml);
      } else {
        $(loadMoreSelector).addClass('d-none');
      }
    });
  }

  //  載入頁面中固定部分
  templateContainer.append(getForm(formClassName, commentsClassName));

  //  載入 CSS
  appendStyle(cssTemplate);

  //  頁面載入時先抓取資料庫最新五筆留言
  getComments();
  //  當顯示載入更多且被點擊時發 GET 取得之後的五筆留言，因載入更多鈕為非同步處理後加入，故需使用上層代理以正確監聽
  commentDOM.on('click', loadMoreSelector, () => {
    getComments();
  });
  //  偵測點擊後新增留言
  $(formSelector).submit((e) => {
    e.preventDefault();
    //  檢查空值
    const formDOM = $(formSelector);
    if (formDOM[0].checkValidity() === false) {
      formDOM[0].classList.add('was-validated');
      return;
    }
    formDOM[0].classList.remove('was-validated');

    //  指定當前 form 底下的輸入框(置入兩個以上留言板時避免干擾)
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    //  抓取輸入框內文字
    const newComment = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    };

    sendCommentAPI(apiBaseUrl, siteKey, newComment, (response, error) => {
      if (error) {
        console.log(error);
        return;
      }
      //  後端成功接收但回傳錯誤
      if (!response.ok) {
        // eslint-disable-next-line
        alert(response.message);
        return;
      }
      //  傳送成功後清空輸入框
      nicknameDOM.val('');
      contentDOM.val('');
      //  傳送成功後取得剛發送的最新一筆留言並 prepend 回去
      $.ajax({
        type: 'GET',
        url: `${apiBaseUrl}/api_comments.php?site_key=${siteKey}`,
        success: (r) => {
          addCommentsToDom(commentDOM, r.comments[0], true);
        },
        error: (error1) => {
          console.log('Error', error1);
        },
      });
    });
  });
}
