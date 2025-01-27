/* -------------------------------- ОРИГИНАЛ -------------------------------- */
// const TOKEN = '7939174229:AAHN028UeGCRKJZxLcZVDglYfzLq8uZH4Fk';
// const CHAT_ID = '-1002412654982';
// const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

/* -------------------------------- ТЕСТОВЫЙ -------------------------------- */
const TOKEN = '6451110971:AAE8esedmIq_5d0PzVIlU3EpDdZWNYWVAw0';
const CHAT_ID = '-1002097078768';
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

  const language = document.getElementById('language').value;

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

        switch (language) {
          case 'ua':
            window.location.href = '/thanks-ua.html';
            break;
          case 'en':
            window.location.href = '/thanks-en.html';
            break;

          default:
            window.location.href = '/thanks-de.html';
        }
      } else {
        throw new Error('Error sending message.');
      }
    })
    .catch((err) => {
      alert('Things have gone wrong. Try again.');
      console.warn(err);
    });
});
