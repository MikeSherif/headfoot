// Инициализация Swiper
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false, // Отключаем зацикливание, чтобы слайды строго соответствовали кнопкам

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // Делаем пагинацию кликабельной
  },
});

// Получаем все кнопки навигации
const buttons = document.querySelectorAll('.swiper-types-scrollbar-el');

// Добавляем обработчик клика для каждой кнопки
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Переключаем слайдер на соответствующий слайд
    swiper.slideTo(index);

    // Удаляем активный класс у всех кнопок
    buttons.forEach(btn => btn.classList.remove('active'));
    // Добавляем активный класс текущей кнопке
    button.classList.add('active');
  });
});

// Добавляем обработчик события смены слайда, чтобы синхронизировать активную кнопку
swiper.on('slideChange', () => {
  const activeIndex = swiper.activeIndex;
  buttons.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === activeIndex);
  });
});

// Устанавливаем первую кнопку активной при загрузке
buttons[0].classList.add('active');
