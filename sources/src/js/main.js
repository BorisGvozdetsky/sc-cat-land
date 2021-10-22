'use strict';

const cardTemplate = document.querySelector('#card').content.querySelector('.card');
const cardList = document.querySelector('.cards');
const filterLinkPrice = document.querySelector('.filters__link-price');
const filterLinkAge = document.querySelector('.filters__link-age');
const scrollUp = document.querySelector('.scrollup');
const burgerMenu = document.querySelector('.header__menu-btn');
const mobileMenu = document.querySelector('.header__menu');

const cardsData = [
    {   
        image: 'cat-1',
        title: 'Кот полосатый',
        color: 'Коричневый окрас',
        age: 2,
        property: '4',
        price: 30000,
        isFavorite: true,
        isBought: false,
        isSale: true,
    },
    {
        image: 'cat-2',
        title: 'Кот полосатый',
        color: 'Коричневый окрас',
        age: 1,
        property: '4',
        price: 40000,
        isFavorite: true,
        isBought: true,
        isSale: false,
    },
    {
        image: 'cat-3',
        title: 'Кот полосатый',
        color: 'Коричневый окрас',
        age: 3,
        property: '4',
        price: 20000,
        isFavorite: true,
        isBought: false,
        isSale: false,
    },
    {
        image: 'cat-1',
        title: 'Кот полосатый',
        color: 'Коричневый окрас',
        age: 5,
        property: '4',
        price: 25000,
        isFavorite: false,
        isBought: false,
        isSale: false,
    },
    {
        image: 'cat-3',
        title: 'Кот полосатый',
        color: 'Коричневый окрас',
        age: 2,
        property: '4',
        price: 30000,
        isFavorite: false,
        isBought: false,
        isSale: true,
    },
    {
        image: 'cat-2',
        title: 'Кот полосатый',
        color: 'Коричневый окрас',
        age: 7,
        property: '4',
        price: 10000,
        isFavorite: false,
        isBought: true,
        isSale: false,
    }
];

let priceFilterDown = true;
let ageFilterDown = true;

const renderCard = (card) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardBtn = cardElement.querySelector('.card__btn');
    const cardFavorites = cardElement.querySelector('.favorites__input');

    cardElement.querySelector('.card__title').textContent = card.title;
    cardElement.querySelector('.card__color').textContent = card.color;
    cardElement.querySelector('.card__age-num').textContent = card.age;
    cardElement.querySelector('.card__properties-num').textContent = card.property;
    cardElement.querySelector('.card__price-num').textContent = card.price;
    cardElement.querySelector('.card__img').src = `images/${card.image}@1x.jpg`;
    cardElement.querySelector('.card__img').srcset = `images/${card.image}@2x.jpg 2x`;
    cardElement.querySelector('.card__img-source').srcset = `images/${card.image}@1x.webp, images/${card.image}@2x.webp 2x`;

    if(!card.isSale) {
        cardElement.querySelector('.card__sale').remove();
    }

    if (card.isFavorite) {
        cardElement.querySelector('.favorites__input').checked = true;
    }

    if (card.isBought) {
        cardBtn.classList.add('card__btn--dark')
        cardBtn.textContent = 'Продан';
    }

    cardFavorites.addEventListener('change', (evt) => {
        if(evt.target.checked) {
            cardElement.querySelector('.favorites__notification').style.display='block';
            setTimeout(() => {
                cardElement.querySelector('.favorites__notification').style.display='none'; 
            }, 1000);
        } else {
            cardElement.querySelector('.favorites__notification').style.display='none'; 
        }
    })

    return cardElement;
};

const removeCards = () => {
    cardList.querySelectorAll('.card').forEach((card) => card.remove());
};

const renderCards = (cards) => {
    const cardsFragment = document.createDocumentFragment();
    removeCards();
    cards.forEach((card) => {
        cardsFragment.appendChild(renderCard(card));
    });
    cardList.appendChild(cardsFragment);
};  

const setFilterPriceUp = (cards) => {
    priceFilterDown = true;
    const priceUpCards = cards.slice().sort((a, b) => b.price - a.price);
    return priceUpCards;
};

const setFilterPriceDown = (cards) => {
    priceFilterDown = false;
    const priceUpCards = cards.slice().sort((a, b) => a.price - b.price);
    return priceUpCards;
};

const setFilterAgeUp = (cards) => {
    ageFilterDown = true;
    const ageUpCards = cards.slice().sort((a, b) => b.age - a.age);
    return ageUpCards;
};

const setFilterAgeDown = (cards) => {
    ageFilterDown = false;
    const ageUpCards = cards.slice().sort((a, b) => a.age - b.age);
    return ageUpCards;
};

renderCards(cardsData);

filterLinkPrice.addEventListener('click', (evt) => {
    evt.preventDefault();
    let filteredCards;
    if (!priceFilterDown) {
        filteredCards = setFilterPriceUp(cardsData);
        filterLinkPrice.classList.remove('filters__link-price--down')
    } else {
        filteredCards = setFilterPriceDown(cardsData);
        filterLinkPrice.classList.add('filters__link-price--down');
    }
    
    renderCards(filteredCards);
});

filterLinkAge.addEventListener('click', (evt) => {
    evt.preventDefault();
    let filteredCards;
    if (!ageFilterDown) {
        filteredCards = setFilterAgeUp(cardsData);
        filterLinkAge.classList.remove('filters__link-age--down')
    } else {
        filteredCards = setFilterAgeDown(cardsData);
        filterLinkAge.classList.add('filters__link-age--down');
    }
    
    renderCards(filteredCards);
});

scrollUp.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

burgerMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('header__menu--active');
    burgerMenu.classList.toggle('header__menu-btn--active');
})
