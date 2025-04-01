const moreNavButton = document.querySelector('.nav-item-more-button');
const moreNavList = document.querySelector('.more-nav');

moreNavButton.addEventListener('click', (e) => {
  moreNavList.classList.toggle('active');
})
