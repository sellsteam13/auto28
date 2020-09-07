import Swiper from 'swiper';
document.addEventListener('DOMContentLoaded', () => {
    categoryListViewSwitcher();
    categoryOfferSliderInit();
});
// Переключение вида листа обьявлений
const categoryListViewSwitcher = () => {
    if (document.querySelector('.category-manage-view__item')) {
        const allViews = Array.from(document.querySelectorAll('.category-manage-view__item'));
        const catalog = Array.from(document.querySelectorAll('.category-list'));
        allViews.forEach(each => {
            each.addEventListener('click', (e) => {
                e.preventDefault();
                catalog.map(el => el.classList.toggle('is-grid'));
                allViews.map(el => el.classList.remove('is-active'));
                each.classList.add('is-active')
            });
        });
    }
};

// Инициализация слайдера предложений

const categoryOfferSliderInit = () => {
    if (document.querySelector('.category-offer')) {
        const sliders = document.querySelectorAll('.category-offer');
        sliders.forEach(each => {
            const track = each.querySelector('.category-offer-track');
            const offerSlider = new Swiper(track, {
                slidesPerView: 4,
                spaceBetween: 25,
                navigation: {
                    nextEl: '.category-offer__next',
                    prevEl: '.category-offer__prev',
                },
                breakpoints: {
                    // when window width is >= 320px
                    200: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    420: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    550: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    // when window width is >= 640px
                    940: {
                        slidesPerView: 4,
                        spaceBetween: 25
                    }
                }
            })
            const sliderPrev = each.querySelector('.category-offer-controls .category-offer__prev');
            const sliderNext = each.querySelector('.category-offer-controls .category-offer__next');
            sliderPrev.addEventListener('click', () => {
                offerSlider.slidePrev();
            });
            sliderNext.addEventListener('click', () => {
                offerSlider.slideNext();
            });
        });
    }
};