const popupConsult = document.querySelector(".need-consult-popup");
const popupOverlay = document.querySelector(".popup-overlay");
const openButton = document.querySelector(".get-consult-button");
const popupButtonClose = popupConsult.querySelector('.popup__button__close');
const popupMessageButtonClose = popupConsult.querySelector('.popup__message__button__close');
const popupContent = popupConsult.querySelector(".popup__content");
const form = popupConsult.querySelector(".popup__form");
const popupMessage = popupConsult.querySelector('.popup__message');
const body = document.body;
const phoneInput = document.getElementById('phone');

const inputMask = () => {
    if (!this.value) {
        this.value = '+7 (';
    }
}

const inputMaskFormat = (event) => {
    // Сохраняем текущее значение и позицию курсора
    let oldValue = event.target.value;
    let cursorPosition = event.target.selectionStart;

    // Очищаем значение от всех нецифровых символов
    let value = event.target.value.replace(/\D/g, '');

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
    event.target.value = formatted;

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
    event.target.setSelectionRange(newCursorPosition, newCursorPosition);
}

const centerPopup = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop; // Current scroll position
    const windowHeight = window.innerHeight; // Viewport height
    const popupHeight = popupConsult.offsetHeight; // Popup height

    // Calculate the top position to center the popup vertically
    const topPosition = scrollTop + (windowHeight / 2) - (popupHeight / 12);

    // Set the popup's top position
    popupConsult.style.top = `${topPosition}px`;
};
// Функция открытия попапа
const openPopup = () => {
    popupConsult.classList.add("popup__active");
    popupOverlay.classList.add("popup__active");
    body.style.overflow = "hidden";
    body.style.overflow = "hidden"; // Блокировка прокрутки фона
    body.style.backdropFilter = "blur(5px)"; // Размытие фона
    openButton.classList.add('get-consult-button-active');
    popupOverlay.addEventListener("click", closePopup);
    popupButtonClose.addEventListener("click", closePopup);
    popupMessageButtonClose.addEventListener("click", closePopup);
    phoneInput.addEventListener('focus', inputMask);
    phoneInput.addEventListener('input', inputMaskFormat);
    centerPopup();
};

// Функция закрытия попапа
const closePopup = () => {
    popupConsult.classList.remove("popup__active");
    popupOverlay.classList.remove("popup__active");
    body.style.overflow = ""; // Разблокировка прокрутки фона
    body.style.backdropFilter = ""; // Удаление размытия фона
    popupOverlay.removeEventListener("click", closePopup);
    popupButtonClose.removeEventListener("click", closePopup);
    popupMessageButtonClose.removeEventListener("click", closePopup);
    phoneInput.removeEventListener('focus', inputMask);
    phoneInput.removeEventListener('input', inputMaskFormat);
    form.reset();
};

// Открытие попапа при клике на кнопку
openButton.addEventListener("click", openPopup);


// Обработка отправки формы
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");
    let isValid = true;
    inputs.forEach((input) => {
        if (!input.checkValidity()) {
            isValid = false;
        }
    });

    if (isValid) {
        popupContent.innerHTML = '';
        popupContent.prepend(popupMessage);
        popupMessage.style.display = "block";

        setTimeout(closePopup, 2000);
    }
});