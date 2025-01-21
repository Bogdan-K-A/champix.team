const TOKEN = '7939174229:AAHN028UeGCRKJZxLcZVDglYfzLq8uZH4Fk';
const CHAT_ID = '-1002412654982';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

let formLoadTime = Date.now();
let lastSubmitTime = 0;

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('form-submit').click();
  }
});

document.getElementById('order_form').addEventListener('submit', function (e) {
  e.preventDefault();

  const currentTime = Date.now();

  // Honeypot проверка
  const hiddenField = document.getElementById('anti_spam').value;
  if (hiddenField) {
    alert('Spam detected!');
    return;
  }

  // Проверка времени загрузки формы
  if (currentTime - formLoadTime < 5000) {
    alert('Too fast! Are you a bot?');
    return;
  }

  // Ограничение частоты отправки
  if (currentTime - lastSubmitTime < 10000) {
    alert('Please wait before submitting again.');
    return;
  }

  // Проверка длины полей
  if (this.name.value.trim().length < 2 || this.phone.value.trim().length < 7) {
    alert('Please fill out all fields correctly.');
    return;
  }

  // Обновляем время последней отправки
  lastSubmitTime = currentTime;

  // Тіло повідомлення
  let message = `<b>Заявка с сайта!</b>\n`;
  message += `<b>Имя: </b> ${this.name.value}\n`;
  message += `<b>Телефон: </b> ${this.phone.value}\n`;
  message += `<b>Вопрос: </b> ${this.message.value}`;

  // Запит
  axios
    .post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    })
    .then((res) => {
      if (res.status === 200 && res.data.ok) {
        this.name.value = '';
        this.phone.value = '';
        this.message.value = '';
        window.location.href = '/thanks.html';
      } else {
        throw new Error('Error sending message.');
      }
    })
    .catch((err) => {
      alert('Things have gone wrong. Try again.');
      console.warn(err);
    });
});

// ===========================================================================================
// const TOKEN = '7939174229:AAHN028UeGCRKJZxLcZVDglYfzLq8uZH4Fk';
// const CHAT_ID = '-1002412654982';
// const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// document.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     e.preventDefault();
//     document.getElementById('form-submit').click();
//   }
// });

// //  присваеивается к форме уникальный id="order_form"
// document.getElementById('order_form').addEventListener('submit', function (e) {
//   e.preventDefault();

//   // Тіло повідомлення
//   let message = `<b>Заявка с сайта!</b>\n`;
//   message += `<b>Имя: </b> ${this.name.value}\n`;
//   message += `<b>Телефон: </b> ${this.phone.value}\n`;
//   message += `<b>Вопрос: </b> ${this.message.value}`;

//   // Запит
//   axios
//     .post(URI_API, {
//       chat_id: CHAT_ID,
//       parse_mode: 'html',
//       text: message,
//     })
//     .then((res) => {
//       if (res.status === 200 && res.data.ok) {
//         // Успешная отправка
//         this.name.value = '';
//         this.phone.value = '';
//         this.message.value = '';

//         window.location.href = '/thanks.html'; // Перенаправление на страницу благодарности
//       } else {
//         // Ошибка обработки
//         throw new Error('Error sending message.');
//       }
//     })
//     .catch((err) => {
//       // Ошибка отправки
//       alert('Things have gone wrong. Try again.');
//       console.warn(err);
//     });
// });
