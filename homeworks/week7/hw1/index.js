//  提取已儲存 localStorage 資料
const oldElements = document.querySelectorAll('input[type = text]');
// eslint-disable-next-line
for (const element of oldElements) {
  const oldData = localStorage.getItem(element.name);
  document.querySelector(`input[name = ${element.name}]`).value = oldData;
}
//  點擊暫存後儲存輸入格式為文字的值
document.querySelector('.buttons__block-save').addEventListener('click', () => {
  const newElements = document.querySelectorAll('input[type = text]');
  // eslint-disable-next-line
  for (const element of newElements) {
    localStorage.setItem(element.name, element.value);
  }
});
//  送出表單前的檢查
document.querySelector('form').addEventListener('submit', (e) => {
  //  取消送出表單的預設動作
  e.preventDefault();
  const originals = document.querySelectorAll('.input-block__error');
  // eslint-disable-next-line
  for (const original of originals) {
    original.innerText = original.getAttribute('value');
  }
  const values = {};
  let hasError = false;
  //  先找出所有必填項目
  const elements = document.querySelectorAll('.required');
  // eslint-disable-next-line
  for (const element of elements) {
    let isValid = true;
    //  依據 type 類型設定不同檢測方式
    const text = element.querySelector('input[type = text]');
    const radios = element.querySelectorAll('input[type = radio]');
    if (text) {
      //  如該欄位無輸入時設為未通過驗證，有輸入時則存取
      if (!text.value) {
        isValid = false;
      } else {
        //  利用正規表達式判斷各輸入欄位是否符合格式要求
        switch (text.name) {
          case 'title':
            if (!(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(text.value))) {
              document.querySelector('.title__check').innerText = '限使用中文/英文/數字/底線!';
              isValid = false;
            }
            break;
          case 'email':
            if (!(/^.+@.+\./.test(text.value))) {
              document.querySelector('.email__check').innerText = '電子郵件格式錯誤!';
              isValid = false;
            }
            break;
          case 'phone':
            if (!(/^09\d{8}$/.test(text.value))) {
              document.querySelector('.phone__check').innerText = '手機號碼格式錯誤!';
              isValid = false;
            }
            break;
          case 'answer':
            if (!(/^[\u4e00-\u9fa5a-zA-Z]+$/.test(text.value))) {
              document.querySelector('.answer__check').innerText = '限使用中文/英文!';
              isValid = false;
            }
            break;
          default: break;
        }
        //  存取各欄位輸入的值
        values[text.name] = text.value;
      }
    } else if (radios.length) {
      //  如至少有一項 radio 為 checked 即為 true
      isValid = [...radios].some(radio => radio.checked);
      if (isValid) {
        //  取出被勾選選項的值
        const r = document.querySelector('input[type = radio]:checked');
        values[r.name] = r.value;
      }
    } else {
      // eslint-disable-next-line
      continue;
    }
    //  未通過驗證時移除遮蔽屬性(顯示警告紅字)，並設定已產生錯誤
    if (!isValid) {
      element.classList.remove('hide-error');
      hasError = true;
    } else {
    //  如修改後通過驗證則再把警告紅字隱藏起來
      element.classList.add('hide-error');
    }
  }
  //  若所有欄位皆未產生錯誤，跳出 alert 展示使用者填寫資料
  if (!hasError) {
    //  以 template 呈現輸出格式
    // eslint-disable-next-line
    alert(` 
    以下為您所填寫的資料：
    您的暱稱：${values.title}
    您的電子郵件：${values.email}
    您的手機號碼：${values.phone}
    您的報名類型：${values.option}
    您怎麼知道這個活動的：${values.answer}
    其他：${document.querySelector('input[name=other]').value}
    `);
  }
});
