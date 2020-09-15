/* global $ */
//  負責 call api 取得資料
export function getCommentsAPI(apiBaseUrl, siteKey, before, cb) {
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

//  抓取輸入框並發送留言至後端
export function sendCommentAPI(apiBaseUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiBaseUrl}/api_add_comments.php?site_key=${siteKey}`,
    data,
    success: (response) => {
      cb(response);
    },
    error: (error) => {
      cb(null, error);
    },
  });
}
