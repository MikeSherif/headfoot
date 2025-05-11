// // �������� ����� � ������.
// const paths = document.querySelectorAll('.map-buy svg path');
// const popup = document.querySelector('.popup');
// const popupTitle = popup.querySelector('#popup-title');
// const popupContentContainer = popup.querySelector('.popup-content');
// const popupCloseButton = popup.querySelector('.popup-button-close');
// let isPopupForced = false; // ���� ������������� ��������� ������
//
// const popupZhkCount = popup.querySelector('#zhk-count');
// const popupApartmentCount = popup.querySelector('#apartment-count');
// const popupParkingCount = popup.querySelector('#parking-count');
// const popupStorageCount = popup.querySelector('#storage-count');
// const popupCommerceCount = popup.querySelector('#commerce-count');
//
// const realEstateTitle = document.querySelector(".real-estate-buy-title-dynamic");
// const realEstateLink = document.querySelector(".real-estate-search-link");
//
// // ������� ��� ����������� ������ � ������� �������
// function showPopup(id, event, isForced = false) {
//   isPopupForced = isForced;
//   const pathElement = event?.target;
//   const regionName = pathElement?.getAttribute('name');
//
//   if (regionName) {
//     // ������������� ����� ��������� ������ �� �������� �������� name
//     popupTitle.textContent = regionName;
//   }
//
//   if (!regions[id]) {
//     popupContentContainer.style.display = "none";
//   } else {
//     let region_object = regions[id];
//     if (
//       region_object.commercial_count == 0 &&
//       region_object.flat_count == 0 &&
//       region_object.pantry_count == 0 &&
//       region_object.parking_count == 0 &&
//       region_object.zhk_count == 0
//     ) {
//       popupContentContainer.style.display = "none";
//     } else {
//       popupContentContainer.style.display = "block";
//       popupZhkCount.textContent = region_object.zhk_count;
//       region_object.zhk_count > 0
//         ? popupZhkCount.closest('a').setAttribute('href', `/buy/${id}/`)
//         : popupZhkCount.closest('a').removeAttribute('href');
//       popupApartmentCount.textContent = region_object.flat_count;
//       region_object.flat_count > 0
//         ? popupApartmentCount.closest('a').setAttribute('href', `/buy/flats/${id}/`)
//         : popupApartmentCount.closest('a').removeAttribute('href');
//
//       popupParkingCount.textContent = region_object.parking_count;
//       region_object.parking_count > 0
//         ? popupParkingCount.closest('a').setAttribute('href', `/buy/parking/${id}/?parking=1`)
//         : popupParkingCount.closest('a').removeAttribute('href');
//
//       popupStorageCount.textContent = region_object.pantry_count;
//       region_object.pantry_count > 0
//         ? popupStorageCount.closest('a').setAttribute('href', `/buy/parking/${id}/?kladovie=1`)
//         : popupStorageCount.closest('a').removeAttribute('href');
//
//       popupCommerceCount.textContent = region_object.commercial_count;
//       region_object.commercial_count > 0
//         ? popupCommerceCount.closest('a').setAttribute('href', `/buy/commerce/${id}/`)
//         : popupCommerceCount.closest('a').removeAttribute('href');
//     }
//   }
//
//   const mapBuy = document.getElementById('map-buy');
//   const mapRect = mapBuy.getBoundingClientRect();
//   const cursorX = event.clientX - mapRect.left;
//   const cursorY = event.clientY - mapRect.top;
//
//   popup.style.left = `${cursorX + 15}px`;
//   popup.style.top = `${cursorY + 15}px`;
//   popup.style.display = 'flex';
// }
//
// // ������� ��� ������� ������
// function hidePopup() {
//   popup.style.display = 'none';
//   isPopupForced = false;
//
//   // ��������������� ����������� ��� ���� ���������
//   paths.forEach(path => {
//     path.style.pointerEvents = 'auto';
//   });
// }
//
// // ����������� ������� ��� ��������� �����
// paths.forEach(path => {
//   //������� ����� �������� ��� ���� ��
//   path.setAttribute("fill", "#bcc5d9");
//     for (let id in regions)
//       {
//       if (path.id === id) {
//         if (regions[id].zhk_count > 0) {
//           path.setAttribute("fill", "#576FA0");
//
//         }
//       }
//     }
//   // ����� ������ ��� ���������
//   path.addEventListener('mouseover', function(event) {
//     if (!isPopupForced) {
//       showPopup(path.id, event);
//     }
//   });
//   //������� ������
//   path.addEventListener('mouseout', function(event) {
//     if (!isPopupForced) {
//       hidePopup();
//     }
//   });
//
//   // ��������� ����� �� ������� �����
//   path.addEventListener('click', (event) => {
//     const regionId = path.id;
//     const regionName = path.getAttribute('name');
//     //��������� ��� �������� ����� ��������
//     paths.forEach(p => {
//       p.style.pointerEvents = p === path ? 'auto' : 'none';
//     });
//
//     // ���� ��������������� ������� � ��������� �������
//     const selectItems = document.querySelectorAll('.select__item');
//     const targetItem = Array.from(selectItems).find(item =>
//       item.textContent.trim() === regionName
//     );
//     // ���� ����� ������� - ��������� ����
//     if (targetItem) {
//       targetItem.click();
//       // ��������� ���������
//       loadRegions(regionId);
//       realEstateTitle.textContent = regionName;
//       realEstateLink.dataset.id = regionId;
//       // ��������� �������� ����� ��� ��������� ������� �� �����
//       paths.forEach(p => p.classList.remove('active'));
//       path.classList.add('active');
//       showPopup(path.id, event, true);
//       popup.style = "right: -280px !important; top: 100.5px !important;";
//     }
//   });
// });
// //��������� ��� �������� �� ������
// popupCloseButton.addEventListener('click', hidePopup);
//
// // ������ ���������� �������
// let select = function () {
//   let selectHeader = document.querySelectorAll('.select__header');
//   let selectItem = document.querySelectorAll('.select__item');
//
//   selectHeader.forEach(item => {
//     item.addEventListener('click', selectToggle);
//   });
//
//   selectItem.forEach(item => {
//     item.addEventListener('click', selectChoose);
//   });
//
//   document.addEventListener('click', function (event) {
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
//     loadRegions(this.dataset.id);
//     currentText.innerText = text;
//     realEstateTitle.textContent = text;
//     realEstateLink.dataset.id = this.dataset.id;
//     console.log(realEstateLink)
//     select.classList.remove('is-active');
//     select.classList.add('is-chosen');
//
//     // ��������� �������� ����� ��� ��������� ������� �� �����
//     const path = document.querySelector(`.map-buy svg path[name="${text}"]`);
//     if (path) {
//
//       paths.forEach(p => {
//         p.style.pointerEvents = p === path ? 'auto' : 'none';
//       });
//       paths.forEach(p => p.classList.remove('active'));
//       showPopup(path.id, { target: path }, true);
//       popup.style = "right: -280px !important; top: 100.5px !important;";
//       path.classList.add('active');
//     }
//   }
// };
//
// // ������������� ���������� �������
// select();
//
// // ��������� (������� ����� ���������� ����)
// const menuItems = document.querySelectorAll('.mini__header-content-nav-element');
//
// if (menuItems.length > 1) {
//   const svgArrow = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="5" height="15" viewBox="0 0 5 15" fill="none">
//         <path d="M4.57031 7.82031C4.6224 7.8724 4.64844 7.93229 4.64844 8C4.64844 8.06771 4.6224 8.1276 4.57031 8.17969L0.929688 11.8203C0.877604 11.8724 0.817708 11.8984 0.75 11.8984C0.682292 11.8984 0.622396 11.8724 0.570312 11.8203L0.179688 11.4297C0.127604 11.3776 0.101562 11.3177 0.101562 11.25C0.101562 11.1823 0.127604 11.1224 0.179688 11.0703L3.25 8L0.179688 4.92969C0.127604 4.8776 0.101562 4.81771 0.101562 4.75C0.101562 4.68229 0.127604 4.6224 0.179688 4.57031L0.570312 4.17969C0.622396 4.1276 0.682292 4.10156 0.75 4.10156C0.817708 4.10156 0.877604 4.1276 0.929688 4.17969L4.57031 7.82031Z" fill="#B5BDC2" style="fill:#B5BDC2;fill:color(display-p3 0.7098 0.7412 0.7608);fill-opacity:1;"/>
//     </svg>
//     `;
//
//   menuItems.forEach((item, index) => {
//     if (index > 0) {
//       item.insertAdjacentHTML('beforebegin', svgArrow);
//     }
//   });
// }
//
// //-------------------------------------------------------------
// const popupHelp = document.querySelector(".need-help-popup");
// const popupOverlay = document.querySelector(".need-help-popup-overlay");
// const openButton = document.querySelector(".searching-advantages-help");
// const openButtonBottom = document.querySelector(".send-application");
// const body = document.body;
// const popupContent = popupHelp.querySelector(".popup__content");
// const form = popupHelp.querySelector(".popup__form");
// const phoneInput = form.querySelector('#phone');
//
// // ������������� ��������� �������� ��� ������
// phoneInput.addEventListener('focus', function() {
//   if (!this.value) {
//     this.value = '+7 (';
//   }
// });
//
// // ������������ ���� � ����������� ��������
// phoneInput.addEventListener('input', function(e) {
//   // ��������� ������� �������� � ������� �������
//   let oldValue = this.value;
//   let cursorPosition = this.selectionStart;
//
//   // ������� �������� �� ���� ���������� ��������
//   let value = this.value.replace(/\D/g, '');
//
//   // ���� ���������� � '7', ������� �, ��� ��� +7 ��� ���� � �����
//   if (value.startsWith('7')) {
//     value = value.substring(1);
//   }
//
//   // ������������ ���� �� 10 ����
//   value = value.substring(0, 10);
//
//   // ����������� �������� �� �������
//   let formatted = '+7 (';
//   if (value.length > 0) {
//     formatted += value.substring(0, 3);
//   }
//   if (value.length >= 3) {
//     formatted += ') ' + value.substring(3, 6);
//   }
//   if (value.length >= 6) {
//     formatted += '-' + value.substring(6, 8);
//   }
//   if (value.length >= 8) {
//     formatted += '-' + value.substring(8, 10);
//   }
//
//   // ������������� ����������������� ��������
//   this.value = formatted;
//
//   // ��������� ����� ������� �������
//   let digitsBeforeCursor = oldValue.substring(0, cursorPosition).replace(/\D/g, '').length;
//   let newCursorPosition = 0;
//   let digitsCount = 0;
//
//   for (let i = 0; i < formatted.length; i++) {
//     if (/\d/.test(formatted[i])) {
//       digitsCount++;
//       if (digitsCount === digitsBeforeCursor) {
//         newCursorPosition = i + 1;
//         break;
//       }
//     } else {
//       newCursorPosition = i + 1;
//     }
//   }
//
//   // ������������� ������ � ���������� �������
//   this.setSelectionRange(newCursorPosition, newCursorPosition);
// });
//
// const centerPopup = () => {
//   const scrollTop = window.scrollY || document.documentElement.scrollTop; // Current scroll position
//   const windowHeight = window.innerHeight; // Viewport height
//   const popupHeight = popupHelp.offsetHeight; // Popup height
//
//   // Calculate the top position to center the popup vertically
//   const topPosition = scrollTop + (windowHeight / 2) - (popupHeight / 12);
//
//   // Set the popup's top position
//   popupHelp.style.top = `${topPosition}px`;
// };
// // ������� �������� ������
// const openPopup = () => {
//   popupHelp.style.display = "block";
//   popupOverlay.style.display = "block";
//   body.style.overflow = "hidden";
//   body.style.overflow = "hidden"; // ���������� ��������� ����
//   body.style.backdropFilter = "blur(5px)"; // �������� ����
//   centerPopup();
// };
//
// // ������� �������� ������
// const closePopup = () => {
//   popupHelp.style.display = "none";
//   popupOverlay.style.display = "none";
//   body.style.overflow = ""; // ������������� ��������� ����
//   body.style.backdropFilter = ""; // �������� �������� ����
// };
//
// // �������� ������ ��� ����� �� ������
// openButton.addEventListener("click", openPopup);
// openButtonBottom.addEventListener("click", openPopup);
//
// popupOverlay.addEventListener("click", closePopup);
//
// // ��������� �������� �����
// form.addEventListener("submit", async (event) => {
//   event.preventDefault(); // �������� ����������� ��������� �����
//
//   // �������� ���������� ����� (����� �������� �� ����� ������� ���������)
//   const inputs = form.querySelectorAll("input, textarea");
//   let isValid = true;
//   inputs.forEach((input) => {
//     if (!input.checkValidity()) {
//       isValid = false;
//     }
//   });
//
//   let formData = new FormData(form);
//   let response = await fetch("/buy_test/send_form.php", {
//     method: "POST",
//     body: formData
//   });
//
//   if (isValid) {
//     // ������ �������� �� ���������
//     popupContent.innerHTML = `
//           <div class="popup__message">
//           <h2 class="popup__title" style="text-align: center; line-height: 36px">�������! ���� ��������� �������.</h2>
//           <p class="popup__title" style="text-align: center; line-height: 36px">� ���� �������� �������� �� ������� ������������.</p>
//           </div>
//         `;
//
//     // �������� ������ ����� 2 �������
//     setTimeout(closePopup, 2000);
//   }
// });
//
// const input = document.querySelector('.real-estate-form-input');
// const dropdown = document.querySelector('.dropdown-search');
// let listItems = document.querySelectorAll('.dropdown-search-list-item');
//
// // Function to show the dropdown
// function showDropdown() {
//   dropdown.classList.add('show');
// }
//
// // Function to hide the dropdown
// function hideDropdown() {
//   dropdown.classList.remove('show');
// }
//
// function card_clicks() {
//   let cards = document.querySelectorAll(".real-estate-buy-item");
//   cards.forEach((card) => {
//     card.addEventListener('click', () => {
//       window.location.href = "https://xn--p1aee.xn--p1ai/buy/zhk/" + card.dataset.code + "/"
//
//     });
//   });
//
//   // let dropdownrows = document.querySelectorAll(".dropdown-search-list-item");
//   // dropdownrows.forEach((row) => {
//   //   row.addEventListener('click', () => {
//   //     window.location.href = "https://xn--p1aee.xn--p1ai/buy/zhk/" + row.dataset.code + "/"
//   //   });
//   // });
// }
//
// function reinit(){
//   card_clicks();
// }
//
// function loadRegions(region_id){
//
//   url = "https://���.��/buy/fetch_regions.php?region_id=" + region_id
//   /*if (regions[region_id].name = '���������� �������') {
//     console.log(region_id);
//   }*/
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url, false);
//   xhr.send(null);
//   if (xhr.status === 200) {
//     console.log(xhr.responseText);
//     var wrapper= document.createElement('div');
//     wrapper.innerHTML= xhr.responseText;
//
//     let select_content = wrapper.querySelector("#select");
//     let catalog_content = wrapper.querySelector("#catalog");
//
//     buyList.innerHTML = "";
//     catalog_content.querySelectorAll("li").forEach((elem) => {
//       //�� ����� ������� ����������� ������� "�� ���"
//       //elem.querySelector('.real-estate-buy-item-description-price-text').style.display = "none";
//       buyList.appendChild(elem);
//     });
//     showAllButton.style.display = "none"
//
//     // dropdownList.innerHTML = "";
//     // select_content.querySelectorAll("li").forEach((elem) => {
//     //   dropdownList.appendChild(elem);
//     // });
//     reinit();
//   } else {
//     throw new Error('Request failed: ' + xhr.statusText);
//   }
//
//   // TO DO fetch ���.��/api/v2/region/?region_id=region_id
// }
// // function searchZhks() {
// //   console.log(listItems);
// //   for (let i = 0; i < listItems.length; i++) {
// //     console.log(listItems[i])
// //   }
// // }
// // Show dropdown when input is focused
// input.addEventListener('focus', showDropdown);
//
// // �������� ����������� ������ ������ ��� ����� ��� ���
// document.addEventListener('click', function (event) {
//   // ���������, ��� �� ���� ��� ��������� � input
//   if (!dropdown.contains(event.target) && !input.contains(event.target)) {
//     hideDropdown();
//   }
// });
//
// //input.addEventListener('blur', hideDropdown);
//
// // Handle Escape key press
// document.addEventListener('keydown', function(event) {
//   if (event.key === 'Escape' && input === document.activeElement) {
//     hideDropdown();
//     input.blur();
//   } else {
//     searchZhks();
//   }
// });
// //---------------------------������ ����� ������ � ����� ������ ��������
// // ������� ��������
// const dropdownListRegion = document.querySelector('.select__item-list');
// const inputRegion = document.querySelector('.select__body-search-input');
// const noResultsRegion = document.querySelector('.select__no-results');
//
// // ��������� �������� �������� ������ ��� ��������
// const originalItemsRegion = Array.from(dropdownListRegion.querySelectorAll('.select__item'));
//
// // ������� ����������
// function filterRegionsRegion(searchText) {
//     const searchLower = searchText.trim().toLowerCase();
//     let hasMatches = false;
//     let count = 0;
//
//     originalItemsRegion.forEach(item => {
//         const text = item.textContent.toLowerCase();
//
//         if (text.includes(searchLower)) {
//             item.style.display = 'block';
//             hasMatches = true;
//             count++;
//         } else {
//             item.style.display = 'none';
//         }
//     });
//
//     // ������� ������ ��� ����� ���������� ���������
//     if (count < 6) {
//         dropdownListRegion.style.overflow = "unset";
//     } else {
//         dropdownListRegion.style.overflow = "auto";
//     }
//
//     // ���������� ��������� "������ �� �������"
//     if (noResults) {
//         noResultsRegion.style.display = hasMatches ? 'none' : 'block';
//     }
//
//     // ���������� ���������� ������ (���� �����)
//     // dropdownList.parentElement.classList.toggle('show', searchText.length > 0);
// }
//
// // ���������� ����� ������
// inputRegion.addEventListener('input', function (e) {
//     filterRegionsRegion(this.value);
// });
// //---------------------------������ ����� ������ � ����� ������ ��
// const dropdownList = document.querySelector('.dropdown-search-list__zhks');
// const noResults = document.querySelector('.dropdown-no-results');
//
// // ��������� �������� �������� ������ ��� ��������
// const originalItems = Array.from(dropdownList.querySelectorAll('a'));
//
// // ������� ����������
// function filterItems(searchText) {
//   const searchLower = searchText.trim().toLowerCase();
//   let hasMatches = false;
//   let count = 0;
//   originalItems.forEach(item => {
//     const text = item.textContent.toLowerCase();
//     const li = item.querySelector('li');
//
//     if (text.includes(searchLower)) {
//       item.style.display = 'block';
//       li.classList.remove('no-match');
//       hasMatches = true;
//       count++;
//     } else {
//       item.style.display = 'none';
//       li.classList.add('no-match');
//     }
//
//   });
//   //������� ������ ��� ����� ���-�� ���������
//   if (count < 6) {
//     dropdownList.style.overflow = "unset";
//   } else {
//     dropdownList.style.overflow = "auto";
//   }
//   // ���������� ��������� "������ �� �������"
//   noResults.style.display = hasMatches ? 'none' : 'block';
//
//   // ���������� ���������� ���������
//   dropdown.classList.toggle('show', searchText.length > 0);
// }
//
// // ���������� ����� ������
// input.addEventListener('input', function (e) {
//   filterItems(this.value);
// });
//
// //-------------------------------------------
//
// // // Prevent dropdown from hiding when clicking on items
// // listItems.forEach(function(item) {
// //   item.addEventListener('click', function(event) {
// //     event.stopPropagation();
// //   });
// // });
//
// // // Handle item selection
// // listItems.forEach(function(item) {
// //   item.addEventListener('click', function() {
// //     input.value = this.textContent;
// //     hideDropdown();
// //     input.blur();
// //   });
// // });
//
// const buyList = document.querySelector('.real-estate-buy-list');
// const showAllButton = document.querySelector('.real-estate-buy-show-all-button');
// const buyCountSpan = document.querySelector('.real-estate-buy-count');
//
// // Function to initialize the list and button
// function initializeList() {
//   const items = buyList.querySelectorAll('.real-estate-buy-item');
//   const totalItems = items.length;
//
//   // Update the count in the button
//   buyCountSpan.textContent = totalItems;
//
//   // If there are more than 6 items, hide the extras and show the button
//   if (totalItems > 6) {
//     for (let i = 6; i < totalItems; i++) {
//       items[i].style.display = 'none'; // Hide items beyond the first 6
//     }
//     showAllButton.style.display = 'block'; // Show the button
//   } else {
//     showAllButton.style.display = 'none'; // Hide the button if there are 6 or fewer items
//   }
// }
//
// // Function to show all items when the button is clicked
// function showAllItems() {
//   const items = buyList.querySelectorAll('.real-estate-buy-item');
//   items.forEach(item => item.style.display = 'flex'); // Show all items
//   showAllButton.style.display = 'none'; // Hide the button after showing all items
// }
//
// // Event listener for the button
// showAllButton.addEventListener('click', showAllItems);
//
// realEstateLink.addEventListener('click', function() {
//   if (realEstateLink.dataset.id != "0") {
//     window.location.href = "/buy/" + realEstateLink.dataset.id + "/";
//   }
// });
//
// card_clicks();
//
// // Initialize the list when the page loads
// initializeList();
