const TOKEN = '7939174229:AAHN028UeGCRKJZxLcZVDglYfzLq8uZH4Fk';
const CHAT_ID = '-1002412654982';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('form-submit').click();
  }
});

//  присваеивается к форме уникальный id="order_form"
document.getElementById('order_form').addEventListener('submit', function (e) {
  e.preventDefault();

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
        // Успешная отправка
        this.name.value = '';
        this.phone.value = '';
        this.message.value = '';

        window.location.href = '/thanks.html'; // Перенаправление на страницу благодарности
      } else {
        // Ошибка обработки
        throw new Error('Error sending message.');
      }
    })
    .catch((err) => {
      // Ошибка отправки
      alert('Things have gone wrong. Try again.');
      console.warn(err);
    });
});
