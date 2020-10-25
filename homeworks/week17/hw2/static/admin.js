/* eslint-disable no-undef */
const apiBaseURL = 'https://obscure-refuge-93288.herokuapp.com/lotteries/';
const lotteryRowTemplate = `
  <tr class="lottery_row row_add">
    <td>
      <input class="form-control" type="text" name="name" placeholder="請輸入"/>
    </td>
    <td>
      <input class="form-control" type="text" name="content" placeholder="請輸入"/>
    </td>
    <td>
      <input class="form-control" type="text" name="imageURL" placeholder="請輸入"/>
    </td>
    <td>
      <input class="form-control checkChance" type="text" name="chance" placeholder="請輸入 1 ~ 100"/>
    </td>
    <td>
      <i class="fas fa-trash-alt"></i>
    </td>
  </tr>
`;
//  檢查 input 有無空值
function checkAllInput() {
  let hasEmpty = false;
  $('input[type=text]').each((i, el) => {
    //  排除已刪除的獎項不計算
    if (!$(el).parent().parent().hasClass('deleted') && $(el).val() === '') {
      $('.modal-body').text('輸入欄位不得為空!');
      $('#popupMsg').modal('show');
      hasEmpty = true;
      //  跳出 each
      return false;
    }
    return true;
  });
  if (hasEmpty) {
    return false;
  }
  return true;
}
//  檢查機率總和
function checkTotalChance() {
  let count = 0;
  $('.lottery_row').each((i, el) => {
    //  排除已刪除的獎項不計算
    if (!$(el).hasClass('deleted')) {
      const chance = $(el).find('input[name=chance]').val();
      count += Number(chance);
    }
  });
  if (count !== 100) {
    $('.modal-body').text('所有獎項機率總和需為 100 , 請重新修正後再送出!');
    $('#popupMsg').modal('show');
    return false;
  }
  return true;
}
//  新增獎項欄位按鈕
$('.btn_add_lottery').click(() => {
  $('table').append(lotteryRowTemplate);
});
//  監聽刪除(代理)
$('table').on('click', '.fa-trash-alt', (e) => {
  const deletedRow = $(e.target).parent().parent();
  deletedRow.addClass('deleted'); //  class 加上 deleted 作標記
  deletedRow.fadeOut(); //  隱藏該行
});
//  限制輸入機率為 1~100 的數字(代理)
// eslint-disable-next-line func-names
$('table').on('input propertychange', 'input[name=chance]', function () {
  const limitNum = $(this)
    .val()
    .replace(/[^0-9.]+/g, '');
  if (limitNum >= 1 && limitNum <= 100) {
    $(this).val(limitNum);
  } else {
    $(this).val('');
  }
});
//  送出更新按鈕
$('.submit_update').click(() => {
  //  檢查欄位空值
  if (!checkAllInput()) {
    return;
  }
  //  檢查機率總和是否為一百
  if (!checkTotalChance()) {
    return;
  }
  const waitToFetch = [];
  //  每個獎項有四個屬性
  $('.lottery_row').each((i, el) => {
    const id = $(el).find('input[name=id]').val();
    const name = $(el).find('input[name=name]').val();
    const content = $(el).find('input[name=content]').val();
    const imageURL = $(el).find('input[name=imageURL]').val();
    const chance = $(el).find('input[name=chance]').val();
    const isDelted = $(el).hasClass('deleted');
    const data = {
      name,
      content,
      imageURL,
      chance,
    };
    // 有 ID 的為原資料庫內容
    if (id) {
      if (isDelted) {
        // 刪除
        waitToFetch.push({
          method: 'DELETE',
          id,
          data: '',
        });
      } else {
        // 更新
        waitToFetch.push({
          method: 'PATCH',
          id,
          data,
        });
      }
    } else {
      //  新增
      waitToFetch.push({
        method: 'POST',
        id: '',
        data,
      });
    }
  });
  // 宣告多個 promise 進行非同步請求, 需使用 Array.map 才會回傳陣列用於 Promise.all
  const promises = waitToFetch.map((element) => {
    console.log(`發送非同步的 ${element.method} 請求到 API`);
    return fetch(`${apiBaseURL}${element.id}`, {
      method: element.method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: element.data.name,
        content: element.data.content,
        imageURL: element.data.imageURL,
        chance: element.data.chance,
      }),
    });
  });
  // 使用 Promise.all() 監聽所有非同步請求，傳入值須為 promise 的陣列。當全部執行完畢後會執行 then
  Promise.all(promises).then((results) => {
    console.log('所有 fetch 已執行完畢!');
    for (let i = 0; i < results.length; i += 1) {
      results[i].json().then((message) => {
        console.log(message);
      });
    }
    window.location.reload();
  });
});
