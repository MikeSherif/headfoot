const moreNavButton = document.querySelector('.nav-item-more-button');
const moreNavList = document.querySelector('.more-nav');
const searchButtonOpen = document.querySelector('.search-button-open');
const overlay = document.querySelector('.title-search-overlay');
const searchWrap = document.querySelector('.title-search-wrap');

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

moreNavButton.addEventListener('click', (e) => {
  moreNavList.classList.toggle('active');
})

document.addEventListener( 'click', (e) => {
  const withinBoundaries = e.composedPath().includes(moreNavList) || e.composedPath().includes(moreNavButton);

  if ( ! withinBoundaries ) {
    moreNavList.classList.remove('active'); // скрываем элемент т к клик был за его пределами
  }
})
