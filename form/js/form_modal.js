const popupHelp = document.querySelector(".need-help-popup");
const popupOverlay = document.querySelector(".need-help-popup-overlay");
const openButtonBottom = document.querySelector(".send-application");
const body = document.body;
const popupContent = popupHelp.querySelector(".popup__content");
const form = popupHelp.querySelector(".popup__form");
const phoneInput = document.querySelector('#phone');

// Устанавливаем начальное значение при фокусе
phoneInput.addEventListener('focus', function() {
  if (!this.value) {
    this.value = '+7 (';
  }
});

// Обрабатываем ввод и форматируем значение
phoneInput.addEventListener('input', function(e) {
  // Сохраняем текущее значение и позицию курсора
  let oldValue = this.value;
  let cursorPosition = this.selectionStart;

  // Очищаем значение от всех нецифровых символов
  let value = this.value.replace(/\D/g, '');

  // Если начинается с '7', убираем её, так как +7 уже есть в маске
  if (value.startsWith('7')) {
    value = value.substring(1);
  }

  // Ограничиваем ввод до 10 цифр
  value = value.substring(0, 10);

  // Форматируем значение по шаблону
  let formatted = '+7 (';
  if (value.length > 0) {
    formatted += value.substring(0, 3);
  }
  if (value.length >= 3) {
    formatted += ') ' + value.substring(3, 6);
  }
  if (value.length >= 6) {
    formatted += '-' + value.substring(6, 8);
  }
  if (value.length >= 8) {
    formatted += '-' + value.substring(8, 10);
  }

  // Устанавливаем отформатированное значение
  this.value = formatted;

  // Вычисляем новую позицию курсора
  let digitsBeforeCursor = oldValue.substring(0, cursorPosition).replace(/\D/g, '').length;
  let newCursorPosition = 0;
  let digitsCount = 0;

  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      digitsCount++;
      if (digitsCount === digitsBeforeCursor) {
        newCursorPosition = i + 1;
        break;
      }
    } else {
      newCursorPosition = i + 1;
    }
  }

  // Устанавливаем курсор в правильную позицию
  this.setSelectionRange(newCursorPosition, newCursorPosition);
});

const centerPopup = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop; // Current scroll position
  const windowHeight = window.innerHeight; // Viewport height
  const popupHeight = popupHelp.offsetHeight; // Popup height

  // Calculate the top position to center the popup vertically
  const topPosition = scrollTop + (windowHeight / 2) - (popupHeight / 12);

  // Set the popup's top position
  popupHelp.style.top = `${topPosition}px`;
};
// Функция открытия попапа
const openPopup = () => {
  popupHelp.style.display = "block";
  popupOverlay.style.display = "block";
  body.style.overflow = "hidden";
  body.style.overflow = "hidden"; // Блокировка прокрутки фона
  body.style.backdropFilter = "blur(5px)"; // Размытие фона
  centerPopup();
};

// Функция закрытия попапа
const closePopup = () => {
  popupHelp.style.display = "none";
  popupOverlay.style.display = "none";
  body.style.overflow = ""; // Разблокировка прокрутки фона
  body.style.backdropFilter = ""; // Удаление размытия фона
};

// Открытие попапа при клике на кнопку
openButtonBottom.addEventListener("click", openPopup);

popupOverlay.addEventListener("click", closePopup);

// Обработка отправки формы
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Отменяем стандартное поведение формы

  // Проверка валидности полей (можно заменить на более сложную валидацию)
  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
    }
  });

  let formData = new FormData(form);
  let response = await fetch("/local/templates/main_catalog/ajax/send_reserve.php", {
    method: "POST",
    body: formData
  });

  if (isValid) {
    // Замена контента на сообщение
    popupContent.innerHTML = `
          <div class="popup__message">
          <h2 class="popup__title" style="text-align: center; line-height: 36px">Спасибо! Ваше обращение принято.</h2>
          <p class="popup__title" style="text-align: center; line-height: 36px">С вами свяжется менеджер по подбору недвижимости.</p>
          </div>
        `;

    // Закрытие попапа через 2 секунды
    setTimeout(closePopup, 2000);
  }
});
