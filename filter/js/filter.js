const filterPopup = document.querySelector('.filter-details-popup');
const filterButtonOpen = document.querySelectorAll('.filter-button-details-open');
const filterButtonClose = document.querySelector('.filter-button-close');
const footer = document.querySelector('.footer');

filterButtonOpen.forEach(el => {
  el.addEventListener('click', (e) => {
    filterPopup.style.display = 'block';
    footer.style.display = 'none';
  })
})

filterButtonClose.addEventListener('click', (e) => {
  filterPopup.style.display = 'none';
  footer.style.display = 'block';
})

function RangeSlider() {

  var parent = document.querySelector("#rangeSlider");
  if(!parent) return;

  var
    rangeS = parent.querySelectorAll("input[type=range]"),
    numberS = parent.querySelectorAll("input[type=number]");

  rangeS.forEach(function(el) {
    el.oninput = function() {
      var slide1 = parseFloat(rangeS[0].value),
        slide2 = parseFloat(rangeS[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
        // var tmp = slide2;
        // slide2 = slide1;
        // slide1 = tmp;
      }

      numberS[0].value = slide1;
      numberS[1].value = slide2;
      console.log(slide1, slide2);
    }
  });

  numberS.forEach(function(el) {
    el.oninput = function() {
      var number1 = parseFloat(numberS[0].value),
        number2 = parseFloat(numberS[1].value);

      if (number1 > number2) {
        var tmp = number1;
        numberS[0].value = number2;
        numberS[1].value = tmp;
      }

      rangeS[0].value = number1;
      rangeS[1].value = number2;

    }
  });

}

RangeSlider();

// let select = function () {
//   let selectHeader = document.querySelectorAll('.select__header');
//   let selectItem = document.querySelectorAll('.select__item');
//
//   selectHeader.forEach(item => {
//     item.addEventListener('click', selectToggle)
//   });
//
//   selectItem.forEach(item => {
//     item.addEventListener('click', selectChoose)
//   });
//
//   document.addEventListener('click', function(event) {
//     let dropdown = document.querySelector('.select.is-active');
//     if (dropdown && !dropdown.contains(event.target)) {
//       dropdown.classList.remove('is-active');
//     }
//   });
//
//   function selectToggle() {
//     this.parentElement.classList.toggle('is-active');
//   }
//
//   function selectChoose() {
//     let text = this.innerText,
//       select = this.closest('.select'),
//       currentText = select.querySelector('.select__current');
//     currentText.innerText = text;
//     select.classList.remove('is-active');
//     select.classList.add('is-chosen');
//   }
//
// };
//
// select();

let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  // Объект для хранения исходного текста каждого селекта
  let initialTexts = {};

  // Сохраняем исходный текст для каждого селекта при инициализации
  document.querySelectorAll('.select').forEach(select => {
    const currentText = select.querySelector('.select__current').innerText.trim();
    const selectId = select.dataset.id || Math.random().toString(36).substring(2); // Уникальный ID для селекта
    select.dataset.id = selectId; // Присваиваем ID селекту
    initialTexts[selectId] = currentText; // Сохраняем исходный текст
  });

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  document.addEventListener('click', function(event) {
    let dropdown = document.querySelector('.select.is-active');
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    let text = this.innerText.trim(),
      select = this.closest('.select'),
      currentText = select.querySelector('.select__current'),
      isMultiple = select.querySelector('.select__header').classList.contains('select__multiply');

    if (isMultiple) {
      // Логика для множественного селекта
      let selectedItems = currentText.innerText.split(',').map(item => item.trim()).filter(item => item !== '');
      let isSelected = this.querySelector('.checkRounded') !== null;

      // Если это первый выбор, сбрасываем текст в select__current
      if (selectedItems.length === 1 && selectedItems[0] === initialTexts[select.dataset.id]) {
        selectedItems = [];
      }

      if (isSelected) {
        // Удаляем элемент, если он уже выбран
        selectedItems = selectedItems.filter(item => item !== text);
        this.querySelector('.checkRounded').remove();
      } else {
        // Добавляем элемент, если он не выбран
        selectedItems.push(text);
        let checkDiv = document.createElement('div');
        checkDiv.className = 'checkRounded';
        let img = document.createElement('images');
        img.src = 'images/checkRounded.svg';
        img.alt = 'Картинка галочки';
        checkDiv.appendChild(img);
        this.appendChild(checkDiv);
      }

      // Обновляем текст в select__current через запятую
      currentText.innerText = selectedItems.length > 0 ? selectedItems.join(', ') : initialTexts[select.dataset.id];
      // Не закрываем селект при выборе
    } else {
      // Логика для обычного селекта
      currentText.innerText = text;
      select.classList.remove('is-active');
      select.classList.add('is-chosen');
    }
  }
};

select();
