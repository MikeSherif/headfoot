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



