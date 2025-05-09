// Общий класс для фильтра
class BaseFilter {
  sendRequest(url, data) {
    // return html
  }
}

class BaseInput {
  constructor(default_value, fclass, fname) {
    this.value = default_value
    this.fclass = fclass;
    this.fname = fname;
  }

  // get value() {
  //     return this.value();
  // }
  // get request_part() {

  // }
}

class ButtonsInput extends BaseInput {
  constructor(fclass, fname, default_value = null) {
    super(default_value, fclass, fname,);
    this.fobjects = null;
    if (this.init()) {
      this.initListener();
    } else {
      // raise error
    }

  }

  init() {
    this.fobjects = document.querySelectorAll(`.${this.fclass}[name="${this.fname}"]`)
    // console.log(this.fobjects)
    if (this.fobjects.length === 0) {
      return false;
    }
    return true;
  }

  set_value(value) {
    this.value = value;
  }

  buttonClick = (e) => {
    for (let j = 0; j < this.fobjects.length; j++) {
      this.fobjects[j].classList.remove('filter-button-active');
    }
    e.target.classList.add("filter-button-active");
    this.set_value(e.target.dataset.value);
    console.log(this.value);
  }

  initListener() {
    for (let i = 0; i < this.fobjects.length; i++) {
      this.fobjects[i].addEventListener("click", this.buttonClick);
    }
  }

  createDictionary() {
    return {[this.fname]: this.value}
  }
}

class ButtonsOpen extends BaseInput {
  constructor(fclass, fname, default_value = null) {
    super(default_value, fclass, fname,);
    this.fobjects = null;
    if (this.init()) {
      this.initListener();
    } else {
      // raise error
    }

  }

  init() {
    this.fobjects = document.querySelectorAll(`.${this.fclass}[name="${this.fname}"]`)
    // console.log(this.fobjects)
    if (this.fobjects.length === 0) {
      return false;
    }
    return true;
  }


  buttonClick = () => {
    document.querySelector('.filter-details-popup').style.display = 'block';
    document.querySelector('.footer').style.display = 'none';
  }

  initListener() {
    this.fobjects.forEach((el) => {
      el.addEventListener('click', this.buttonClick);
    })
  }
}

class ButtonsClose extends BaseInput {
  constructor(fclass, fname, default_value = null) {
    super(default_value, fclass, fname,);
    this.fobjects = null;
    if (this.init()) {
      this.initListener();
    } else {
      // raise error
    }

  }

  init() {
    this.fobjects = document.querySelectorAll(`.${this.fclass}[name="${this.fname}"]`)
    // console.log(this.fobjects)
    if (this.fobjects.length === 0) {
      return false;
    }
    return true;
  }


  buttonClick = () => {
    document.querySelector('.filter-details-popup').style.display = 'none';
    document.querySelector('.footer').style.display = 'block';
  }

  initListener() {
    this.fobjects.forEach((el) => {
      el.addEventListener('click', this.buttonClick);
    })
  }
}

class RangeFilter extends BaseInput {
  constructor(fclass, fname, default_value = []) {
    super(default_value, fclass, fname,);
    this.fobjects = null;
    if (this.init()) {
      this.initVisual();
    } else {
      // raise error
    }
  }

  init() {
    this.fobjects =
      {
        min_number: document.querySelector(`.${this.fclass}[name="${this.fname}_min_number"]`),
        max_number: document.querySelector(`.${this.fclass}[name="${this.fname}_max_number"]`),

        min_range: document.querySelector(`.${this.fclass}[name="${this.fname}_min_range"]`),
        max_range: document.querySelector(`.${this.fclass}[name="${this.fname}_max_range"]`),
      };
    // console.log(this.fobjects)
    // console.log(`.${this.fclass}[name="${this.fname}_min_number"]`);
    for (const [key, value] of Object.entries(this.fobjects)) {
      // console.log(value);
      if (!value) {
        return false;
      }
    }
    return true;
  }

  initVisual() {
    const numbers = [this.fobjects.min_number, this.fobjects.max_number];
    const ranges = [this.fobjects.min_range, this.fobjects.max_range];
    ranges.forEach(function (el) {
      el.oninput = function () {
        //!-------Остановочная
        var slide1 = parseFloat(ranges[0].value),
          slide2 = parseFloat(ranges[1].value);

        if (slide1 > slide2) {
          [slide1, slide2] = [slide2, slide1];
        }

        numbers[0].value = slide1;
        numbers[1].value = slide2;
        console.log(slide1, slide2);
      }
    });

    numbers.forEach(function (el) {
      el.oninput = function () {
        var number1 = parseFloat(numbers[0].value),
          number2 = parseFloat(numbers[1].value);

        if (number1 > number2) {
          var tmp = number1;
          numbers[0].value = number2;
          numbers[1].value = tmp;
        }

        ranges[0].value = number1;
        ranges[1].value = number2;
      }
    });
  }
}

class SelectDropdown extends BaseInput {
  constructor(fclass, fname, default_value = []) {
    super(default_value, fclass, fname);
    this.fobjects = null;
    this.initialTexts = {}; // Для хранения исходного текста каждого селекта
    this.selectedItemsMap = new Map(); // Для хранения выбранных элементов для каждого селекта
    if (this.init()) {
      this.initVisual();
    } else {
      throw new Error(`Не удалось инициализировать SelectDropdown для ${this.fclass} с именем ${this.fname}`);
    }
  }

  init() {
    // Ищем все селекты с заданным классом и именем
    this.fobjects = document.querySelectorAll(`.${this.fclass}[name="${this.fname}"]`);
    if (this.fobjects.length === 0) {
      return false;
    }
    // Для каждого селекта сохраняем исходный текст и инициализируем выбранные элементы
    this.fobjects.forEach(select => {this.initSelectItems(select)});

    return true;
  }

  initSelectItems(select) {
    const currentText = select.querySelector('.select__current');
    if (!currentText) return false; // Если нет select__current, возвращаем false

    const selectId = select.dataset.id || Math.random().toString(36).substring(2);
    select.dataset.id = selectId;
    this.initialTexts[selectId] = currentText.innerText.trim();
    this.selectedItemsMap.set(selectId, [...this.value]); // Инициализируем выбранные элементы из default_value
  }

  initVisual() {
    this.fobjects.forEach(select => {
      const header = select.querySelector('.select__header');
      const items = select.querySelectorAll('.select__item');
      const currentText = select.querySelector('.select__current');
      const isMultiple = header.classList.contains('select__multiply');
      const selectId = select.dataset.id;

      this.selectToggle(header, select);

      // Обработчик для выбора элементов
      items.forEach(item => {this.initItemListeners(select, item, selectId, isMultiple, currentText)});

    });
  }

  selectToggle(item, select) {
    item.addEventListener('click', () => {
      select.classList.toggle('is-active');
    });
    document.addEventListener('click', (event) => {
      if (select.classList.contains('is-active') && !select.contains(event.target)) {
        select.classList.remove('is-active');
      }
    });
  }

  initItemListeners(select, item, selectId, isMultiple, currentText) {
    item.addEventListener('click', () => {
      const text = item.innerText.trim();
      let selectedItems = this.selectedItemsMap.get(selectId);

      if (isMultiple) {
        // Логика для множественного селекта
        let isSelected = item.querySelector('.checkRounded') !== null;

        // Если это первый выбор, сбрасываем текст
        if (selectedItems.length === 1 && selectedItems[0] === this.initialTexts[selectId]) {
          selectedItems = [];
        }

        if (isSelected) {
          // Удаляем элемент, если он уже выбран
          selectedItems = selectedItems.filter(selected => selected !== text);
          item.querySelector('.checkRounded').remove();
        } else {
          // Добавляем элемент, если он не выбран
          selectedItems.push(text);
          const checkDiv = document.createElement('div');
          checkDiv.className = 'checkRounded';
          const img = document.createElement('img');
          img.src = 'img/checkRounded.svg';
          img.alt = 'Картинка галочки';
          checkDiv.appendChild(img);
          item.appendChild(checkDiv);
        }

        // Обновляем текст в select__current через запятую
        currentText.innerText = selectedItems.length > 0 ? selectedItems.join(', ') : this.initialTexts[selectId];
        // Не закрываем селект при выборе
      } else {
        // Логика для обычного селекта
        selectedItems = [text];
        currentText.innerText = text;
        select.classList.remove('is-active');
        select.classList.add('is-chosen');
      }

      // Обновляем выбранные элементы для данного селекта
      this.selectedItemsMap.set(selectId, selectedItems);
      // Обновляем общее значение фильтра
      this.updateValue();
    });
  }

  // Метод для обновления значения фильтра
  updateValue() {
    // Если у нас только один селект, берём его значения
    if (this.fobjects.length === 1) {
      this.value = this.selectedItemsMap.get(this.fobjects[0].dataset.id) || [];
    } else {
      // Если селектов несколько, собираем все значения в массив
      this.value = Array.from(this.selectedItemsMap.values());
    }
  }

  // Геттер для получения значения
  get value() {
    return this._value;
  }

  // Сеттер для установки значения
  set value(newValue) {
    console.log(newValue)
    this._value = newValue;
  }

  // Метод для формирования части запроса
  get request_part() {
    if (!this.value || this.value.length === 0) return {};
    return { [this.fname]: this.value };
  }
}

class SmallFilter extends BaseFilter {
  constructor() {
    super();
    this.type_buttons = new ButtonsInput("filter-button-small-filter", "type");
    this.type_ranges = new RangeFilter("small-filter-price-range", "small_filter_price_range");
    this.type_buttons_open = new ButtonsOpen("filter-button-details-open", "open");
  }
}

class BigFilter extends BaseFilter {
  constructor() {
    super()
    this.type_button_close = new ButtonsClose("filter-button-close", "close");
    this.type_buttons = new ButtonsInput("filter-button-big-filter", "type");
    this.type_buttons_room_count = new ButtonsInput("filter-button-big-filter", "type_room");
    this.type_ranges_price = new RangeFilter("big-filter-price-range", "big_filter_price_range");
    this.type_ranges_square = new RangeFilter("big-filter-square-range", "big_filter_square_range")
    this.type_select = new SelectDropdown("big-filter-select", "big_filter_select");
  }
}

// DI данные для запросов
class ServerDependancies {
  constructor() {

  }
}

// DI данные для запросов
class HtmlClassesDependancies {
  constructor() {

  }
}

// Класс для общей инициализаии при рендере
class Filter {
  constructor() {
    const small_filter = new SmallFilter();
    const big_filter = new BigFilter();
    // Инициализация маленького фильтра
    // Инициализация большого фильтра
  }
}

const filter = new Filter();
