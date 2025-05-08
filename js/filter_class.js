// Общий класс для фильтра
class BaseFilter {
  sendRequest(url, data) {
    // return html
  }
}
class BaseInput {
  constructor(default_value, fclass, fname){
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
  constructor(fclass, fname, default_value=null){
    super(default_value, fclass, fname,);
    this.fobjects = null;
    if (this.init()){
      this.initListener();
    } else {
      // raise error
    }

  }
  init(){
    this.fobjects = document.querySelectorAll(`.${this.fclass}[name="${this.fname}"]`)
    // console.log(this.fobjects)
    if (this.fobjects.length === 0){
      return false;
    }
    return true;
  }

  set_value(value){
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
  constructor(fclass, fname, default_value=null){
    super(default_value, fclass, fname,);
    this.fobjects = null;
    if (this.init()){
      this.initListener();
    } else {
      // raise error
    }

  }
  init(){
    this.fobjects = document.querySelectorAll(`.${this.fclass}[name="${this.fname}"]`)
    // console.log(this.fobjects)
    if (this.fobjects.length === 0){
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

class RangeFilter extends BaseInput {
  constructor(fclass, fname, default_value = []) {
    super(default_value, fclass, fname,);
    this.fobjects = null;
    if (this.init()){
      this.initVisual();
    } else {
      // raise error
    }
  }

  init() {
    this.fobjects =
      {
        min_number : document.querySelector(`.${this.fclass}[name="${this.fname}_min_number"]`),
        max_number : document.querySelector(`.${this.fclass}[name="${this.fname}_max_number"]`),

        min_range : document.querySelector(`.${this.fclass}[name="${this.fname}_min_range"]`),
        max_range : document.querySelector(`.${this.fclass}[name="${this.fname}_max_range"]`),
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
    ranges.forEach(function(el) {
      el.oninput = function() {
        //!-------Остановочная
        var slide1 = parseFloat(ranges[0].value),
          slide2 = parseFloat(ranges[1].value);


        if (slide1 > slide2) {
          [slide1, slide2] = [slide2, slide1];
          // var tmp = slide2;
          // slide2 = slide1;
          // slide1 = tmp;
        }

        numbers[0].value = slide1;
        numbers[1].value = slide2;
        console.log(slide1, slide2);
      }
    });

    numbers.forEach(function(el) {
      el.oninput = function() {
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

class SmallFilter extends BaseFilter {
  constructor(){
    super();
    this.type_buttons = new ButtonsInput("filter-button-small-filter", "type");
    this.type_ranges = new RangeFilter("small-filter-price-range", "small_filter_price_range");
    this.type_buttons_open = new ButtonsOpen("filter-button-details-open", "open");
  }
}
class BigFilter extends BaseFilter {
  constructor(){
    super()
  }
}
// DI данные для запросов
class ServerDependancies {
  constructor(){

  }
}
// DI данные для запросов
class HtmlClassesDependancies {
  constructor(){

  }
}

// Класс для общей инициализаии при рендере
class Filter {
  constructor(){
    const small_filter = new SmallFilter();
    // Инициализация маленького фильтра
    // Инициализация большого фильтра
  }
}

const filter = new Filter();
