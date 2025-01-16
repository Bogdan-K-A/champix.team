// <!-- /scripts внести перед закрывающим тегом <body/> -->
//     <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//     <script src="formToTg.js"></script>

const TOKEN = '6451110971:AAE8esedmIq_5d0PzVIlU3EpDdZWNYWVAw0';
const CHAT_ID = '-1002097078768';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
// сделать или модалку или див что б при удачной отпраке вылазило сообщение
const alertMessage = document.getElementById('alert'); //обращается по ID

//  присваеивается к форме уникальный id="order_form"
document.getElementById('order_form').addEventListener('submit', function (e) {
  e.preventDefault();
  // Тіло повідомлення
  let message = `<b>Заявка з сайту!</b>\n`;
  message += `<b>Ім'я: </b> ${this.name.value}\n`;
  message += `<b>телефон: </b> ${this.phone.value}`;

  // Запит
  axios
    .post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    })
    .then((res) => {
      this.name.value = '';
      this.phone.value = '';
      alertMessage.innerHTML = 'Ваша заявка відправлена! Дякуємо!';
      alertMessage.style.color = 'green';
      alertMessage.style.display = 'block';
    })
    .catch((err) => {
      this.name.value = '';
      this.phone.value = '';
      alertMessage.innerHTML = 'Щось пішло не так!';
      alertMessage.style.color = 'red';
      alertMessage.style.display = 'block';
      console.warn(err);
    })
    .finally(() => {
      console.log('finally');
    });
});
