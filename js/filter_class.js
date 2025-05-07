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
    console.log(this.fobjects)
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
}

class SmallFilter extends BaseFilter {
  constructor(){
    super();
    this.type_buttons = new ButtonsInput("filter-button-small-filter", "type");
  }
}
class BigFilter extends BaseFilter {
  constructor(){
    super()
  }
}
// DI данные для запросов
class ServerDependancies {
  constructor(){}
}
// DI данные для запросов
class HtmlClassesDependancies {
  constructor(){}
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
