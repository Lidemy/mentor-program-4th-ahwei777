/* global $ */
//  變數宣告
let uncompletedtodoCount = 0;
const apiBaseUrl = 'http://mentor-program.co/mtr04group4/ahwei777/week12/hw2';
//  URLSearchParams 可直接取得網址列中對應參數
const searchParams = new URLSearchParams(window.location.search);
const getTodoID = searchParams.get('id');

//  函數宣告
//  特殊字元跳脫處理，預防 XSS 攻擊
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
//  每次未完成數量變動時更新
function updateCounter() {
  $('.uncompletedtodoCount').text(uncompletedtodoCount);
}
//  將取得資料後放進 DOM 中
function restoreTodos(todos) {
  // eslint-disable-next-line
  for (const todo of todos) {
    $('.todos').append(`
      <div class="input-group mb-3 todo">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" class="input_check" ${todo.is_completed ? 'checked' : ''}>
          </div>
        </div>
        <input type="text" class="form-control ${todo.is_completed ? 'checked' : ''}" value='${escape(todo.content)}' ${escape(todo.is_completed) ? 'disabled' : ''}>
        <i class="fas fa-trash-alt ml-5"></i>
      </div>
    `);
    if (!todo.is_completed) {
      uncompletedtodoCount += 1;
    }
  }
  updateCounter();
}
//  擷取輸入新增至 DOM
function addTodo() {
  const value = $('.input_content').val();
  //  空值處理
  if (!value) {
    // eslint-disable-next-line
    alert('請輸入內容!');
    return;
  }
  $('.todos').append(`
    <div class="input-group mb-3 todo">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" class="input_check">
        </div>
      </div>
      <input type="text" class="form-control" value='${escape(value)}'>
      <i class="fas fa-trash-alt ml-5"></i>
    </div>
  `);
  $('.input_content').val('');
  uncompletedtodoCount += 1;
  updateCounter();
}
//  如果有帶上 id 參數→提取資料庫對應資料並加入 DOM
if (getTodoID) {
  $.getJSON(`${apiBaseUrl}/api_get_todo.php?id=${getTodoID}`, (data) => {
    const todos = JSON.parse(data.data.todo);
    restoreTodos(todos);
  });
}
//  監聽點擊新增 todos
$('.btn_add').click(() => {
  addTodo();
});
//  監聽 ENTER 新增 todos
$('.input_content').keydown((e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});
//  監聽刪除(上層代理)
$('.todos').on('click', '.fa-trash-alt', (e) => {
  $(e.target).parent().remove();
  const isChecked = $(e.target).parent().find('.input_check').is(':checked');
  if (!isChecked) {
    uncompletedtodoCount -= 1;
  }
  updateCounter();
});
//  偵測 checked 後添加屬性
$('.todos').on('change', '.input_check', (e) => {
  const isChecked = $(e.target).is(':checked');
  const inputText = $(e.target).parents('.todo').find('input[type=text]');
  if (isChecked) {
    uncompletedtodoCount -= 1;
    inputText.addClass('checked');
    inputText.prop('disabled', true);
  } else {
    uncompletedtodoCount += 1;
    inputText.removeClass('checked');
    inputText.prop('disabled', false);
  }
  updateCounter();
});
//  篩選按鈕(上層代理)
$('.options').on('click', 'button', (e) => {
  const dataFilter = $(e.target).attr('data_filter');
  if (dataFilter === 'all') {
    $('.todo').each((i, el) => {
      $(el).show();
    });
  } else if (dataFilter === 'active') {
    $('input[type=checkbox]').each((i, el) => {
      if ($(el).is(':checked')) {
        $(el).parents('.todo').hide();
      } else {
        $(el).parents('.todo').show();
      }
    });
  //  completed
  } else {
    $('input[type=checkbox]').each((i, el) => {
      if ($(el).is(':checked')) {
        $(el).parents('.todo').show();
      } else {
        $(el).parents('.todo').hide();
      }
    });
  }
});
//  Clear Completed 按鈕(清除所有 checked)
$('.btn_clearCompleted').click(() => {
  $('input[type=checkbox]').each((i, el) => {
    if ($(el).is(':checked')) {
      $(el).parents('.todo').remove();
    }
  });
});
//  儲存功能
$('.btn_save').click(() => {
  const todos = [];
  $('.todo').each((i, el) => {
    const text = $(el).find('input[type=text]');
    todos.push({
      content: text.val(),
      is_completed: text.hasClass('checked'),
    });
  });
  //  空值處理
  if (todos.length === 0) {
    // eslint-disable-next-line
    alert('請至少輸入一筆資料');
    return;
  }
  const data = JSON.stringify(todos);
  //  將字串化後的 data 存進資料庫
  $.ajax({
    type: 'POST',
    url: `${apiBaseUrl}/api_add_todo.php`,
    data: {
      todo: data,
    },
    success: (resp) => {
      if (!resp.ok) {
        // eslint-disable-next-line
        alert(resp.message);
      }
      //  後端會同時回傳此筆資料 ID (不重複) 作為之後進入時的索引值
      window.location = `index.html?id=${resp.id}`;
    },
    error: (error) => {
      console.log('Error', error);
    },
  });
});
