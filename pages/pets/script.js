// "use strict";

async function getPetsData() {
  const response = await fetch("../../assets/js/pets.json");
  const pets = await response.json();
  return pets;
}

const pets = await getPetsData();

// import pets from '../../assets/js/pets.json' assert {type: 'json'};

// Menu Burger

const bntBurger = document.querySelector(".burger__icon");
const burger = document.querySelector(".burger__menu");
const burgerLinks = document.querySelectorAll(".burger__menu-links");
const blackout = document.querySelector(".blackout");

// Open/close burger and stop scroll

bntBurger.addEventListener("click", function () {
  bntBurger.classList.toggle("burger__icon-active");
  burger.classList.toggle("burger__menu-active");
  blackout.classList.toggle("blackout-active");
  document.body.classList.toggle("block-body");
});

// Close burger when click body

window.addEventListener("click", function (e) {
  if (!bntBurger.contains(e.target) && !burger.contains(e.target)) {
    bntBurger.classList.remove("burger__icon-active");
    burger.classList.remove("burger__menu-active");
    blackout.classList.remove("blackout-active");
    document.body.classList.remove("block-body");
  }
});

// Close burger when click to link menu

burgerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    bntBurger.classList.remove("burger__icon-active");
    burger.classList.remove("burger__menu-active");
    blackout.classList.remove("blackout-active");
    document.body.classList.remove("block-body");
  });
});

// Pagination

//? общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 (in progress)

let lots = 8;

if (window.matchMedia("(max-width: 768px)").matches) {
  lots = 6;
}

if (window.matchMedia("(max-width: 656px)").matches) {
  lots = 3;
}

let arrLots = [];
for (let i = 0; i < 6; i++) {
  arrLots.push(pets);
  arrLots = arrLots.flat();
}

let pageNumber = arrLots.length / lots - 1;

const mixed = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

arrLots = mixed(arrLots);

let itemsArr = [];
const finalArr = [];
for (let index = 0; index < pageNumber; index++) {
  let i = 0;
  while (i < lots) {
    if (!itemsArr.includes(arrLots[0])) {
      itemsArr.push(arrLots[0]);
      arrLots.splice(0, 1);
      i++;
    }
    arrLots.splice(arrLots.length - 1, 0, arrLots[0]);
    arrLots.splice(0, 1);
  }
  finalArr.push(itemsArr);
  itemsArr = [];
}

if (arrLots.length < lots) {
  let place = lots - arrLots.length;
  for (let i = 0; i < place; i++) {
    arrLots.push(pets[Math.floor(Math.random() * 8)]);
  }
}

finalArr.push(arrLots);

const createCard = (index) => {

  // Create card
  const card = document.createElement("div");
  card.classList.add("slider__element-card");

  // Add image
  const cardImage = document.createElement("div");
  cardImage.classList.add("card__image");
  let img = document.createElement("img");
  img.src = `../../assets/images/modal/${index.name}.png`;
  img.alt = index.name;
  cardImage.insertAdjacentElement("beforeend", img);

  card.insertAdjacentElement("beforeend", cardImage);

  // Add title
  const titleCard = document.createElement("div");
  titleCard.classList.add("card__title");
  let title = document.createElement("p");
  title.innerHTML = index.name;
  titleCard.insertAdjacentElement("beforeend", title);

  card.insertAdjacentElement("beforeend", titleCard);

  // Add button
  const btnCard = document.createElement("div");
  btnCard.classList.add("card__button");
  let btn = document.createElement("button");
  btn.classList.add("card__button-link");
  btn.innerHTML = "Learn more";
  btnCard.insertAdjacentElement("beforeend", btn);

  card.insertAdjacentElement("beforeend", btnCard);

  return card;
};

// Navigation

const btnEndLeft = document.querySelector(".left-btn-double");
const btnLeft = document.querySelector(".left-btn-single");
const btnRight = document.querySelector(".right-btn-single");
const btnEndRight = document.querySelector(".right-btn-double");
let pageCount = document.querySelector(".page-counter");

btnRight.addEventListener("click", () => {
  pageCount.innerHTML = Number(pageCount.innerHTML) + 1;
  if (pageCount.innerHTML == 6) {
    btnRight.classList.remove("pagi-btn-active");
    btnRight.classList.add("pagin-disable");
    btnEndRight.classList.remove("pagi-btn-active");
    btnEndRight.classList.add("pagin-disable");
  } else if (pageCount.innerHTML > 1) {
    btnEndLeft.classList.remove("pagin-disable");
    btnEndLeft.classList.add("pagi-btn-active");
    btnLeft.classList.remove("pagin-disable");
    btnLeft.classList.add("pagi-btn-active");
  }
  show();
  getModalWindow();
});

btnEndRight.addEventListener("click", () => {
  pageCount.innerHTML = 6;
  btnEndRight.classList.remove("pagi-btn-active");
  btnEndRight.classList.add("pagin-disable");
  btnRight.classList.remove("pagi-btn-active");
  btnRight.classList.add("pagin-disable");
  btnEndLeft.classList.remove("pagin-disable");
  btnEndLeft.classList.add("pagi-btn-active");
  btnLeft.classList.remove("pagin-disable");
  btnLeft.classList.add("pagi-btn-active");
  show();
  getModalWindow();
});

btnLeft.addEventListener("click", () => {
  pageCount.innerHTML = Number(pageCount.innerHTML) - 1;
  if (pageCount.innerHTML == 1) {
    btnLeft.classList.remove("pagi-btn-active");
    btnLeft.classList.add("pagin-disable");
    btnEndLeft.classList.remove("pagi-btn-active");
    btnEndLeft.classList.add("pagin-disable");
  } else if (pageCount.innerHTML < 6) {
    btnEndRight.classList.remove("pagin-disable");
    btnEndRight.classList.add("pagi-btn-active");
    btnRight.classList.remove("pagin-disable");
    btnRight.classList.add("pagi-btn-active");
  }
  show();
  getModalWindow();
});

btnEndLeft.addEventListener("click", () => {
  pageCount.innerHTML = 1;
  btnEndLeft.classList.remove("pagi-btn-active");
  btnEndLeft.classList.add("pagin-disable");
  btnLeft.classList.remove("pagi-btn-active");
  btnLeft.classList.add("pagin-disable");
  btnEndRight.classList.remove("pagin-disable");
  btnEndRight.classList.add("pagi-btn-active");
  btnRight.classList.remove("pagin-disable");
  btnRight.classList.add("pagi-btn-active");
  show();
  getModalWindow();
});

const petsBlock = document.querySelector(".slider__cards");
const show = () => {
  let count = pageCount.innerHTML;
  let indexPage = finalArr[count - 1];
  petsBlock.innerHTML = "";
  for (let index of indexPage) {
    petsBlock.insertAdjacentElement("beforeend", createCard(index));
  }
};
show();

// Modal

//! После прокрутки не появляется модальное окно при клике на карточку
//! Модальное окно закрывается при клике на него (in progress)

const modalWindow = document.querySelector(".modal__wrapper");
const modalContainer = document.querySelector(".modal__container");
const modalBtn = document.querySelector(".modal__button");
let cardsPets = document.querySelectorAll(".slider__element-card");

function getModalWindow() {
  for (let i of cardsPets) {
    i.addEventListener("click", () => {
      modalWindow.classList.add("modal__active");
      document.documentElement.style.overflow = "hidden";

      const cardTitle = i.querySelector(".card__title p").innerHTML;
      const filterContentModal = pets.filter(
        (e) => e.name.indexOf(cardTitle) > -1
      );

      const imgBlock = document.createElement("div");
      imgBlock.classList.add("modal__image");
      const img = document.createElement("img");
      img.src = filterContentModal[0].img;
      imgBlock.insertAdjacentElement("beforeend", img);

      modalContainer.insertAdjacentElement("beforeend", imgBlock);

      const content = document.createElement("div");
      content.classList.add("modal__content");

      const petName = document.createElement("div");
      petName.classList.add("pet__name");
      petName.textContent = filterContentModal[0].name;

      const petType = document.createElement("div");
      petType.classList.add("pet__type");
      petType.textContent = `${filterContentModal[0].type} - ${filterContentModal[0].breed}`;

      const petDescription = document.createElement("div");
      petDescription.classList.add("pet__description");
      petDescription.textContent = filterContentModal[0].description;

      const petList = document.createElement("div");
      petList.classList.add("pet__list");
      petList.innerHTML = `
    <li class="pet__list-li"><span>Age:</span> ${filterContentModal[0].age}</li>
    <li class="pet__list-li"><span>Inoculations:</span> ${filterContentModal[0].inoculations}</li>
    <li class="pet__list-li"><span>Diseases:</span> ${filterContentModal[0].diseases}</li>
    <li class="pet__list-li"><span>Parasites:</span> ${filterContentModal[0].parasites}</li>
    `;

      content.insertAdjacentElement("beforeend", petName);
      content.insertAdjacentElement("beforeend", petType);
      content.insertAdjacentElement("beforeend", petDescription);
      content.insertAdjacentElement("beforeend", petList);

      modalContainer.insertAdjacentElement("beforeend", content);
    });
  }
}

getModalWindow();

modalBtn.addEventListener("click", () => {
  modalWindow.classList.remove("modal__active");
  document.documentElement.style.overflow = "";
  modalContainer.innerHTML = "";
});

modalWindow.addEventListener("click", () => {
  modalWindow.classList.remove("modal__active");
  document.documentElement.style.overflow = "";
  modalContainer.innerHTML = "";
});
