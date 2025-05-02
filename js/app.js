const moreNavButton = document.querySelector('.nav-item-more');
const moreNavList = document.querySelector('.more-nav');
const searchButtonOpen = document.querySelector('.search-button-open');
const overlay = document.querySelector('.title-search-overlay');
const searchWrap = document.querySelector('.title-search-wrap');
const hamburger = document.querySelector('.hamburger');
const drawer = document.querySelector('.drawer');
const drawerButtonClose = document.querySelectorAll('.drawer__close');
const navList = document.querySelectorAll('.nav-item');
const drawerSubMenu = document.querySelector('.drawer_submenu');
const headerSubmenuControl = document.querySelectorAll('.submenu_control');

navList.forEach((navItem) => {
  navItem.addEventListener('click', (e) => {
    drawerSubMenu.classList.add('is-visible');
    console.log("lol");
  })
})

searchButtonOpen.addEventListener('click', (e) => {
  overlay.classList.add('open');
  searchWrap.classList.add('show');
})

overlay.addEventListener('click', (e) => {
  if(!e.target.closest('.title-search-wrap') || e.target.closest('.search-button-close')) {
    searchWrap.classList.remove('show');
    setTimeout( ()=> {
      overlay.classList.remove('open');
    }, 600)
  }
})

moreNavButton.addEventListener('mouseover', (e) => {
  moreNavList.classList.add('active');
})

moreNavButton.addEventListener('mouseout', (e) => {
  moreNavList.classList.remove('active');
})

hamburger.addEventListener('click', (e) => {
  drawer.classList.add('is-visible');
})

drawerButtonClose.forEach((btnDrawClose) => {
  btnDrawClose.addEventListener('click', (e) => {
    e.target.closest('.drawer').classList.remove('is-visible');
  })
})

headerSubmenuControl.forEach((headerSubmenuControlEl) => {
  headerSubmenuControlEl.addEventListener('click', (e) => {
    e.target.closest('.is_parent').querySelector('.header_submenu_list').classList.toggle('active-block');
  })
})


const filterPopup = document.querySelector('.filter-details-popup');
const filterButtonOpen = document.querySelector('.filter-button-details-open');
const filterButtonClose = document.querySelector('.filter-button-close');

filterButtonOpen.addEventListener('click', (e) => {
  filterPopup.style.display = 'block';
})

filterButtonClose.addEventListener('click', (e) => {
  filterPopup.style.display = 'none';
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



