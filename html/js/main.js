'use strict';

var cardTemplate = document.querySelector('#card').content.querySelector('.card');
var cardList = document.querySelector('.cards');
var filterLinkPrice = document.querySelector('.filters__link-price');
var filterLinkAge = document.querySelector('.filters__link-age');
var scrollUp = document.querySelector('.scrollup');
var burgerMenu = document.querySelector('.header__menu-btn');
var mobileMenu = document.querySelector('.header__menu');
var cardsData = [{
  image: 'cat-1',
  title: 'Кот полосатый',
  color: 'Коричневый окрас',
  age: 2,
  property: '4',
  price: 30000,
  isFavorite: true,
  isBought: false,
  isSale: true
}, {
  image: 'cat-2',
  title: 'Кот полосатый',
  color: 'Коричневый окрас',
  age: 1,
  property: '4',
  price: 40000,
  isFavorite: true,
  isBought: true,
  isSale: false
}, {
  image: 'cat-3',
  title: 'Кот полосатый',
  color: 'Коричневый окрас',
  age: 3,
  property: '4',
  price: 20000,
  isFavorite: true,
  isBought: false,
  isSale: false
}, {
  image: 'cat-1',
  title: 'Кот полосатый',
  color: 'Коричневый окрас',
  age: 5,
  property: '4',
  price: 25000,
  isFavorite: false,
  isBought: false,
  isSale: false
}, {
  image: 'cat-3',
  title: 'Кот полосатый',
  color: 'Коричневый окрас',
  age: 2,
  property: '4',
  price: 30000,
  isFavorite: false,
  isBought: false,
  isSale: true
}, {
  image: 'cat-2',
  title: 'Кот полосатый',
  color: 'Коричневый окрас',
  age: 7,
  property: '4',
  price: 10000,
  isFavorite: false,
  isBought: true,
  isSale: false
}];
var priceFilterDown = true;
var ageFilterDown = true;

var renderCard = function renderCard(card) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardBtn = cardElement.querySelector('.card__btn');
  var cardFavorites = cardElement.querySelector('.favorites__input');
  cardElement.querySelector('.card__title').textContent = card.title;
  cardElement.querySelector('.card__color').textContent = card.color;
  cardElement.querySelector('.card__age-num').textContent = card.age;
  cardElement.querySelector('.card__properties-num').textContent = card.property;
  cardElement.querySelector('.card__price-num').textContent = card.price;
  cardElement.querySelector('.card__img').src = "images/".concat(card.image, "@1x.jpg");
  cardElement.querySelector('.card__img').srcset = "images/".concat(card.image, "@2x.jpg 2x");
  cardElement.querySelector('.card__img-source').srcset = "images/".concat(card.image, "@1x.webp, images/").concat(card.image, "@2x.webp 2x");

  if (!card.isSale) {
    cardElement.querySelector('.card__sale').remove();
  }

  if (card.isFavorite) {
    cardElement.querySelector('.favorites__input').checked = true;
  }

  if (card.isBought) {
    cardBtn.classList.add('card__btn--dark');
    cardBtn.textContent = 'Продан';
  }

  cardFavorites.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      cardElement.querySelector('.favorites__notification').style.display = 'block';
      setTimeout(function () {
        cardElement.querySelector('.favorites__notification').style.display = 'none';
      }, 1000);
    } else {
      cardElement.querySelector('.favorites__notification').style.display = 'none';
    }
  });
  return cardElement;
};

var removeCards = function removeCards() {
  cardList.querySelectorAll('.card').forEach(function (card) {
    return card.remove();
  });
};

var renderCards = function renderCards(cards) {
  var cardsFragment = document.createDocumentFragment();
  removeCards();
  cards.forEach(function (card) {
    cardsFragment.appendChild(renderCard(card));
  });
  cardList.appendChild(cardsFragment);
};

var setFilterPriceUp = function setFilterPriceUp(cards) {
  priceFilterDown = true;
  var priceUpCards = cards.slice().sort(function (a, b) {
    return b.price - a.price;
  });
  return priceUpCards;
};

var setFilterPriceDown = function setFilterPriceDown(cards) {
  priceFilterDown = false;
  var priceUpCards = cards.slice().sort(function (a, b) {
    return a.price - b.price;
  });
  return priceUpCards;
};

var setFilterAgeUp = function setFilterAgeUp(cards) {
  ageFilterDown = true;
  var ageUpCards = cards.slice().sort(function (a, b) {
    return b.age - a.age;
  });
  return ageUpCards;
};

var setFilterAgeDown = function setFilterAgeDown(cards) {
  ageFilterDown = false;
  var ageUpCards = cards.slice().sort(function (a, b) {
    return a.age - b.age;
  });
  return ageUpCards;
};

renderCards(cardsData);
filterLinkPrice.addEventListener('click', function (evt) {
  evt.preventDefault();
  var filteredCards;

  if (!priceFilterDown) {
    filteredCards = setFilterPriceUp(cardsData);
    filterLinkPrice.classList.remove('filters__link-price--down');
  } else {
    filteredCards = setFilterPriceDown(cardsData);
    filterLinkPrice.classList.add('filters__link-price--down');
  }

  renderCards(filteredCards);
});
filterLinkAge.addEventListener('click', function (evt) {
  evt.preventDefault();
  var filteredCards;

  if (!ageFilterDown) {
    filteredCards = setFilterAgeUp(cardsData);
    filterLinkAge.classList.remove('filters__link-age--down');
  } else {
    filteredCards = setFilterAgeDown(cardsData);
    filterLinkAge.classList.add('filters__link-age--down');
  }

  renderCards(filteredCards);
});
scrollUp.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
burgerMenu.addEventListener('click', function () {
  mobileMenu.classList.toggle('header__menu--active');
  burgerMenu.classList.toggle('header__menu-btn--active');
});