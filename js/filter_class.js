// Общий класс для фильтра
class BaseFilter {
  sendRequest(url, data) {
    // return html
  }
}

class BaseInput {
  constructor(default_value, fclass, fname) {
    this._value = default_value;
    this.fclass = fclass;
    this.fname = fname;
    this.appliedFilterItems = [];
    this.isSingleValue = false;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
    this.updateAppliedFilterItems();
  }

  getFilterContainer() {
    return document.querySelector('.filter-container');
  }

  getOrCreateAppliedBlock() {
    const container = this.getFilterContainer();
    if (!container) return null;

    let appliedBlock = container.querySelector('.filter-block-applied');
    if (!appliedBlock) {
      const template = document.createElement('div');
      template.className = 'filter-block-applied';
      template.innerHTML = `
        <h3 class="filter-block-applied-title">Применённые фильтры</h3>
        <div class="filter-block-applied-wrapper"></div>
      `;
      const header = container.querySelector('.filter-header');
      if (header) {
        header.insertAdjacentElement('afterend', template);
      } else {
        container.insertAdjacentElement('afterbegin', template);
      }
      appliedBlock = template;
    }
    return appliedBlock;
  }

  formatValue(item) {
    if (!item) return '';
    if (this.isSingleValue && Array.isArray(this._value)) {
      // Проверяем, что оба значения существуют и валидны
      const [min, max] = this._value;
      console.log( this._value);
      if (min != null && max != null) {
        return `от ${min} до ${max}`;
      }
      return '';
    }
    return item.toString();
  }

  updateAppliedFilterItems() {
    const appliedBlock = this.getOrCreateAppliedBlock();
    if (!appliedBlock) return;

    const wrapper = appliedBlock.querySelector('.filter-block-applied-wrapper');
    if (!wrapper) return;

    this.appliedFilterItems.forEach(item => item.element.remove());
    this.appliedFilterItems = [];

    if (!this._value || (Array.isArray(this._value) && this._value.length === 0)) {
      if (wrapper.children.length === 0) {
        appliedBlock.remove();
      }
      return;
    }

    if (this.isSingleValue && Array.isArray(this._value)) {
      const formattedValue = this.formatValue();
      if (!formattedValue) return; // Не создаем плашку, если значения невалидны
      const itemEl = document.createElement('div');
      itemEl.className = 'filter-block-applied-wrapper-el';
      itemEl.innerHTML = `
        <span class="filter-block-applied-wrapper-el-text">${formattedValue}</span>
        <button class="filter-block-applied-wrapper-el-button-close">✕</button>
      `;
      const closeButton = itemEl.querySelector('.filter-block-applied-wrapper-el-button-close');
      closeButton.addEventListener('click', () => this.removeFilterItem(itemEl, null));

      wrapper.appendChild(itemEl);
      this.appliedFilterItems.push({ value: this._value, element: itemEl });
    } else {
      const values = Array.isArray(this._value) ? this._value : [this._value];
      const validValues = values.filter(value => value && value.toString().trim() !== '');
      validValues.forEach(value => {
        const itemEl = document.createElement('div');
        itemEl.className = 'filter-block-applied-wrapper-el';
        itemEl.innerHTML = `
          <span class="filter-block-applied-wrapper-el-text">${this.formatValue(value)}</span>
          <button class="filter-block-applied-wrapper-el-button-close">✕</button>
        `;
        const closeButton = itemEl.querySelector('.filter-block-applied-wrapper-el-button-close');
        closeButton.addEventListener('click', () => this.removeFilterItem(itemEl, value));

        wrapper.appendChild(itemEl);
        this.appliedFilterItems.push({ value, element: itemEl });
      });
    }
  }

  removeFilterItem(itemEl, valueToRemove) {
    itemEl.remove();
    this.appliedFilterItems = this.appliedFilterItems.filter(item => item.element !== itemEl);

    if (this.isSingleValue) {
      this._value = Array.isArray(this._value) ? [] : null;
    } else if (Array.isArray(this._value)) {
      this._value = this._value.filter(val => val !== valueToRemove);
    } else {
      this._value = null;
    }

    this.updateAppliedFilterItems();

    const wrapper = this.getFilterContainer()?.querySelector('.filter-block-applied-wrapper');
    if (wrapper && wrapper.children.length === 0) {
      wrapper.parentElement.remove();
    }
  }

  reset() {
    // Сбрасываем значение
    this._value = Array.isArray(this._value) ? [] : null;
    this.resetVisual(); // Вызываем метод для сброса визуального состояния
    this.updateAppliedFilterItems(); // Обновляем плашки
  }

  resetVisual() {
    // Пустой метод, который можно переопределить в дочерних классах
  }
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

  resetVisual() {
    this.fobjects.forEach(button => {
      button.classList.remove('filter-button-active');
    });
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
    this.fobjects = document.querySelector(`.${this.fclass}[name="${this.fname}"]`)
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
    this.fobjects.addEventListener('click', this.buttonClick);
  }
}

class RangeFilter extends BaseInput {
  constructor(fclass, fname, default_value = []) {
    super(default_value, fclass, fname);
    this.fobjects = null;
    this.isSingleValue = true; // Указываем, что нужно создавать одну плашку
    if (this.init()) {
      this.initVisual();
    } else {
      throw new Error(`Не удалось инициализировать RangeFilter для ${fclass} с именем ${fname}`);
    }
  }

  init() {
    this.fobjects = {
      min_number: document.querySelector(`.${this.fclass}[name="${this.fname}_min_number"]`),
      max_number: document.querySelector(`.${this.fclass}[name="${this.fname}_max_number"]`),
      min_range: document.querySelector(`.${this.fclass}[name="${this.fname}_min_range"]`),
      max_range: document.querySelector(`.${this.fclass}[name="${this.fname}_max_range"]`),
    };
    for (const [key, value] of Object.entries(this.fobjects)) {
      if (!value) return false;
    }
    return true;
  }

  initVisual() {
    const numbers = [this.fobjects.min_number, this.fobjects.max_number];
    const ranges = [this.fobjects.min_range, this.fobjects.max_range];
    ranges.forEach(function (el) {
      el.oninput = () => {
        var slide1 = parseFloat(ranges[0].value),
          slide2 = parseFloat(ranges[1].value);
        if (slide1 > slide2) {
          [slide1, slide2] = [slide2, slide1];
        }
        numbers[0].value = slide1;
        numbers[1].value = slide2;
        this.value = [slide1, slide2];
        console.log(slide1, slide2);
      };
    }.bind(this));

    numbers.forEach(function (el) {
      el.oninput = () => {
        var number1 = parseFloat(numbers[0].value),
          number2 = parseFloat(numbers[1].value);
        if (number1 > number2) {
          var tmp = number1;
          numbers[0].value = number2;
          numbers[1].value = tmp;
        }
        ranges[0].value = number1;
        ranges[1].value = number2;
        this.value = [number1, number2];
      };
    }.bind(this));
  }

  resetVisual() {
    // Сбрасываем значения ползунков и числовых полей
    this.fobjects.min_number.value = this.fobjects.min_number.min || '';
    this.fobjects.max_number.value = this.fobjects.max_number.max || '';
    this.fobjects.min_range.value = this.fobjects.min_range.min || '';
    this.fobjects.max_range.value = this.fobjects.max_range.max || '';
  }

  formatValue(item) {
    if (this.isSingleValue && Array.isArray(this._value)) {
      // Проверяем, что оба значения существуют и валидны
      const [min, max] = this._value;
      console.log( this._value);
      if (min != null && max != null) {
        return `от ${min} до ${max}`;
      }
      return '';
    }
  }
}

class SelectDropdown extends BaseInput {
  constructor(fclass, fname, default_value = []) {
    super(default_value, fclass, fname);
    this.fobjects = null;
    this.initialTexts = {};
    this.selectedItemsMap = new Map();
    if (this.init()) {
      this.initVisual();
    } else {
      throw new Error(`Не удалось инициализировать SelectDropdown для ${this.fclass} с именем ${this.fname}`);
    }
  }

  init() {
    this.fobjects = document.querySelectorAll(`.${this.fclass}[name="${this.fname}"]`);
    if (this.fobjects.length === 0) return false;
    this.fobjects.forEach(select => this.initSelectItems(select));
    return true;
  }

  initSelectItems(select) {
    const currentText = select.querySelector('.select__current');
    if (!currentText) return false;
    const selectId = select.dataset.id || Math.random().toString(36).substring(2);
    select.dataset.id = selectId;
    this.initialTexts[selectId] = currentText.innerText.trim();
    this.selectedItemsMap.set(selectId, [...this.value]);
  }

  initVisual() {
    this.fobjects.forEach(select => {
      const header = select.querySelector('.select__header');
      const items = select.querySelectorAll('.select__item');
      const currentText = select.querySelector('.select__current');
      const isMultiple = header.classList.contains('select__multiply');
      const selectId = select.dataset.id;

      this.selectToggle(header, select);
      items.forEach(item => this.initItemListeners(select, item, selectId, isMultiple, currentText));
    });
  }

  resetVisual() {
    this.fobjects.forEach(select => {
      const selectId = select.dataset.id;
      const currentText = select.querySelector('.select__current');
      const items = select.querySelectorAll('.select__item');

      // Сбрасываем текст до начального
      currentText.innerText = this.initialTexts[selectId];

      // Удаляем все галочки (для множественного селекта)
      items.forEach(item => {
        const check = item.querySelector('.checkRounded');
        if (check) check.remove();
      });

      // Удаляем класс is-chosen (для одиночного селекта)
      select.classList.remove('is-chosen');
      select.classList.remove('is-active');

      // Очищаем выбранные элементы
      this.selectedItemsMap.set(selectId, []);
    });
  }

  selectToggle(item, select) {
    item.addEventListener('click', () => select.classList.toggle('is-active'));
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
        if (selectedItems.length === 1 && selectedItems[0] === this.initialTexts[selectId]) {
          selectedItems = [];
        }

        let isSelected = item.querySelector('.checkRounded') !== null;
        if (isSelected) {
          selectedItems = selectedItems.filter(selected => selected !== text);
          item.querySelector('.checkRounded').remove();
        } else {
          selectedItems.push(text);
          const checkDiv = document.createElement('div');
          checkDiv.className = 'checkRounded';
          const img = document.createElement('img');
          img.src = 'img/checkRounded.svg';
          img.alt = 'Картинка галочки';
          checkDiv.appendChild(img);
          item.appendChild(checkDiv);
        }

        currentText.innerText = selectedItems.length > 0 ? selectedItems.join(', ') : this.initialTexts[selectId];
      } else {
        selectedItems = [text];
        currentText.innerText = text;
        select.classList.remove('is-active');
        select.classList.add('is-chosen');
      }

      this.selectedItemsMap.set(selectId, selectedItems);
      this.updateValue();
    });
  }

  updateValue() {
    if (this.fobjects.length === 1) {
      this.value = this.selectedItemsMap.get(this.fobjects[0].dataset.id) || [];
    } else {
      this.value = Array.from(this.selectedItemsMap.values());
    }
  }

  // Переопределяем форматирование для каждого элемента
  formatValue(item) {
    console.log(item || '');
    return item || '';
  }

  get request_part() {
    if (!this.value || this.value.length === 0) return {};
    return { [this.fname]: this.value };
  }
}

class ButtonAppliedClear extends BaseInput {
  constructor(fclass, fname, bigFilter, default_value = null) {
    super(default_value, fclass, fname);
    this.bigFilter = bigFilter; // Сохраняем ссылку на BigFilter
    this.fobjects = null;
    if (this.init()) {
      this.initListener();
    } else {
      throw new Error(`Не удалось инициализировать ButtonAppliedClear для ${fclass} с именем ${fname}`);
    }
  }

  init() {
    this.fobjects = document.querySelector(`.${this.fclass}[name="${this.fname}"]`);
    return !!this.fobjects; // Возвращаем true, если элемент найден
  }

  buttonClick = () => {
    // Сбрасываем все фильтры до начального состояния
    this.bigFilter.type_buttons.reset();
    this.bigFilter.type_buttons_room_count.reset();
    this.bigFilter.type_ranges_price.reset();
    this.bigFilter.type_ranges_square.reset();
    this.bigFilter.type_select.reset();

    // Удаляем блок .filter-block-applied
    const appliedBlock = document.querySelector('.filter-block-applied');
    if (appliedBlock) {
      appliedBlock.remove();
    }
  }

  initListener() {
    this.fobjects.addEventListener('click', this.buttonClick);
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
    this.type_button_clear = new ButtonAppliedClear("filter-block-controls-button-clear", "clear", this);
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
