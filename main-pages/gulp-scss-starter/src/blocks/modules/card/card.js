import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
    noteBind();
    showPhoneBind();
    sliderInit();
    window.addEventListener('resize', () => {
        sliderInit();
    });
});

// Бинд на Открытие и закрытие заметки в карточке

const noteBind = () => {
    if (document.querySelector('.card-note')) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(each => {
            const note = each.querySelector('.card-note');
            const noteBtn = each.querySelector('.card-manage .card-manage__note');
            noteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                note.classList.toggle('is-opened');
                noteBtn.classList.toggle('is-active');
            });
            if (each.querySelector('.card-note__close')) {
                const closeBtn = each.querySelector('.card-note__close');
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    note.classList.remove('is-opened');
                    noteBtn.classList.remove('is-active');
                });
            }
            document.addEventListener('click', (e) => {
                if (!each.contains(e.target)) {
                    note.classList.remove('is-opened');
                }
            });
        });
    }
};

// Открытие телефона в премием карточке

const showPhoneBind = () => {
    if (document.querySelector('.card-dealer-contacts')) {
        const allInners = document.querySelectorAll('.card-dealer-contacts');
        allInners.forEach(each => {
            const btn = each.querySelector('button');
            const span = each.querySelector('span');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.style.display = 'none';
                span.style.display = 'block';
            });
        });
    }
};

// Инициализация слайдера фоток в карточке на планшетах и телефонах

const sliderInit = () => {
    if (document.querySelector('.card') && window.innerWidth < 851) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(each => {
            const swiperInner = each.querySelector('.card-photo');
            const swiperTrack = each.querySelector('.card-photo-track');
            const swiperSlides = each.querySelectorAll('.card-photo__item');
            swiperTrack.classList.add('swiper-wrapper');
            swiperSlides.forEach(slide => {
                slide.classList.add('swiper-slide');
            });
            const slider = new Swiper(swiperInner, {
                slidesPerView: 1,
                loop: true,
            })
            window.addEventListener('resize', () => {
                if (window.innerWidth > 850) {
                    slider.destroy();
                    swiperTrack.classList.remove('swiper-wrapper');
                    swiperSlides.forEach(slide => {
                        slide.classList.remove('swiper-slide');
                    });
                }
            });
        });
    }
};