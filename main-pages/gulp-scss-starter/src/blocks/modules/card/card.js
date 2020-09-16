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
    if (document.querySelector('.card')) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(each => {
            const note = each.querySelector('.card-note');
            const noteBtn = each.querySelector('.card-manage .card-manage__note');
            noteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (note) {
                    note.classList.toggle('is-opened');
                }
                if (each.querySelector('.productNoteForm')) {
                    each.querySelector('.productNoteForm').classList.toggle('is-opened');
                }
                if (each.querySelector('.productNoteText')) {
                    each.querySelector('.productNoteText').classList.toggle('is-hidden');
                }
                noteBtn.classList.toggle('is-active');
                document.body.addEventListener('click', (e) => {
                    if (e.target.classList.contains('productNoteFormButton') && noteBtn && noteBtn.classList.contains('is-active')) {
                        noteBtn.classList.remove('is-active');
                    }
                })
            });
            if (each.querySelector('.card-note__close')) {
                const closeBtn = each.querySelector('.card-note__close');
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (note) {
                        note.classList.remove('is-opened');
                    }
                    noteBtn.classList.remove('is-active');
                });
            }
            document.addEventListener('click', (e) => {
                if (!each.contains(e.target)) {
                    if (note) {
                        note.classList.remove('is-opened');
                    }
                    if (noteBtn) {
                        noteBtn.classList.remove('is-active');
                    }
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
    if (document.querySelector('.card') && window.innerWidth < 1026) {
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
                if (window.innerWidth > 1025) {
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