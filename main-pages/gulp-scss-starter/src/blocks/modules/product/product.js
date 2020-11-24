import Swiper from 'swiper';
document.addEventListener('DOMContentLoaded', () => {
    popupGalleryInit();
    galleryPopupBind();
    productGalleryInit();
    noteBind();
    newDisabler();
    window.addEventListener('resize', () => {
        newDisabler()
    });
    commentaryRowsAmount();
    console.log(123);
});


// Слайдер фоток
const productGalleryInit = () => {
    if (document.querySelector('.product-gallery-master')) {
        const slider = new Swiper('.product-gallery-master', {
            navigation: {
                nextEl: '.product-gallery-master__next',
                prevEl: '.product-gallery-master__prev',
            }
        })
        document.querySelector('.product-gallery-master__next').addEventListener('click', () => {
            slider.slideNext();
        });
        document.querySelector('.product-gallery-master__prev').addEventListener('click', () => {
            slider.slidePrev();
        });
        const allSlides = Array.from(document.querySelector('.product-gallery-master').querySelectorAll('.swiper-slide'));
        if (allSlides.length > 0) {
            slider.on('slideChange', function() {
                let index = slider.previousIndex;
                const plyrVideoContainer = allSlides[index].querySelector('.plyr');
                if (plyrVideoContainer) {
                    const varName = plyrVideoContainer.getAttribute('id');
                    window[varName].pause();
                }
            });
        }
    }
};

// Открытие и закрытие заметки

const noteBind = () => {
    if (document.querySelector('.product-contacts-manage__note')) {
        const triggers = document.querySelectorAll('.product-contacts-manage__note');
        const parent = document.querySelector('.product-main-right');
        triggers.forEach(each => {
            each.addEventListener('click', (e) => {
                if (parent.querySelector('.productNoteForm')) {
                    parent.querySelector('.productNoteForm').classList.toggle('is-opened');
                }
                if (parent.querySelector('.productNoteText')) {
                    parent.querySelector('.productNoteText').classList.toggle('is-hidden');
                }
            });
        });
    }
};

// Функции Попап галлереи (Инициализация слайдеров)
const popupGalleryInit = () => {
    if (document.querySelector('.product-gallery-popup')) {
        const allSlides = Array.from(document.querySelectorAll('.product-gallery-popup-main-master .swiper-wrapper .swiper-slide'));
        const slidesAmount = allSlides.length;
        let centerSlide = Math.round((slidesAmount / 2)) - 1;
        const nonTransformedSlidesAmount = Math.floor(document.querySelector('.product-gallery-popup-main').offsetWidth / (160 + ((slidesAmount - 1) * 10 / slidesAmount)));
        if (slidesAmount <= nonTransformedSlidesAmount) {
            centerSlide = 0;
            document.querySelector('.product-gallery-popup-main-thumbs .swiper-wrapper').classList.add('is-disabled');
        }
        const galleryThumbsSlider = new Swiper('.product-gallery-popup-main-thumbs', {
            spaceBetween: 10,
            slidesPerView: 'auto',
            centeredSlides: true,
        });
        const galleryTopSlider = new Swiper('.product-gallery-popup-main-master', {
            slidesPerView: 1,
        });
        window.galleryThumbsSlider = galleryThumbsSlider;
        window.galleryTopSlider = galleryTopSlider;
        const allSlidesAnother = Array.from(document.querySelector('.product-gallery-popup-main-master').querySelectorAll('.swiper-slide'));
        galleryTopSlider.on('slideChange', function() {
            galleryThumbsSlider.slideTo(galleryTopSlider.activeIndex);
            if (allSlidesAnother.length > 0) {
                let index = galleryTopSlider.previousIndex;
                const plyrVideoContainerAnother = allSlidesAnother[index].querySelector('.plyr');
                if (plyrVideoContainerAnother) {
                    const varNameAnother = plyrVideoContainerAnother.getAttribute('id');
                    window[varNameAnother].pause();
                }
            }
        });
        galleryThumbsSlider.on('slideChange', function(index) {
            galleryTopSlider.slideTo(galleryThumbsSlider.activeIndex);
        });
        document.querySelector('.product-gallery-popup-main__next').addEventListener('click', () => {
            galleryTopSlider.slideNext();
        });
        document.querySelector('.product-gallery-popup-main__prev').addEventListener('click', () => {
            galleryTopSlider.slidePrev();
        });
        const thumbsTriggers = Array.from(document.querySelectorAll('.product-gallery-popup-main-thumbs .swiper-wrapper .swiper-slide'));
        thumbsTriggers.forEach(each => {
            each.addEventListener('click', () => {
                let index = thumbsTriggers.indexOf(each);
                galleryThumbsSlider.slideTo(index);
                galleryTopSlider.slideTo(index);
            });
        });
        const thumbsTriggersMain = Array.from(document.querySelectorAll('.product-gallery-thumbs__item'));
        if (thumbsTriggersMain.length > 0) {
            thumbsTriggersMain.forEach(trigger => {
                if (trigger.classList.contains('is-youtube-iframe')) {
                    trigger.addEventListener('click', () => {
                        setTimeout(() => {
                            galleryThumbsSlider.slideTo(galleryThumbsSlider.slides.length - 1);
                            galleryTopSlider.slideTo(galleryThumbsSlider.slides.length - 1);
                        }, 0)
                    });
                } else {
                    trigger.addEventListener('click', () => {
                        setTimeout(() => {
                            let index = thumbsTriggersMain.indexOf(trigger);
                            galleryThumbsSlider.slideTo(index);
                            galleryTopSlider.slideTo(index);
                        }, 0)
                    });
                }
            });
        }
    }
};

// Откртыие и закрытие попап галлереи

const galleryPopupBind = () => {
    if (document.querySelector('.product-gallery-popup')) {
        const triggers = document.querySelectorAll('.galleryPopupTrigger');
        const body = document.body;
        const popup = document.querySelector('.product-gallery-popup');
        const closeBtn = popup.querySelector('.product-gallery-popup__close');
        triggers.forEach(each => {
            each.addEventListener('click', (e) => {
                e.preventDefault();
                if (!body.classList.contains('gallery-popup-toggled') && window.innerWidth > 780) {
                    body.classList.add('gallery-popup-toggled');
                    body.style.overflow = 'hidden';
                    popup.style.display = 'flex';
                    galleryThumbsSlider.update();
                    galleryTopSlider.update();
                    setTimeout(() => {
                        popup.classList.add('is-opened');
                    }, 100);
                }
            });
        });
        closeBtn.addEventListener('click', () => {
            if (body.classList.contains('gallery-popup-toggled')) {
                body.classList.remove('gallery-popup-toggled');
                body.style.overflow = '';
                popup.classList.remove('is-opened');
                const allSlidesPopup = Array.from(document.querySelector('.product-gallery-popup-main-master').querySelectorAll('.swiper-slide'));
                allSlidesPopup.forEach(each => {
                    const plyrVideoContainerPopup = each.querySelector('.plyr');
                    if (plyrVideoContainerPopup) {
                        const varNamePopup = plyrVideoContainerPopup.getAttribute('id');
                        window[varNamePopup].pause();
                    }
                });
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            }
        });
    }
};

const stopVideoFunc = (element) => {
    const iframe = element.querySelector('iframe');
    const video = element.querySelector('video');
    if (iframe) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if (video) {
        video.pause();
    }
};

const newDisabler = () => {
    if (document.querySelector('.product')) {
        if (window.innerWidth < 1170) {
            document.querySelector('.header-new').style.display = 'none';
        } else {
            document.querySelector('.header-new').style.display = 'flex';
        }
    }
};

// Обрезание / Открытие комментария
const commentaryRowsAmount = () => {
    if (document.querySelector('.product-main__descr-text')) {
        const div = document.querySelector('.product-main__descr-text');
        const tglBtn = document.querySelector('.product-main__descr-status');
        const cuttDiv = () => {
            div.classList.remove('is-opened');
            if (div.offsetHeight > 102) {
                div.classList.add('is-cutted');
                tglBtn.style.display = 'block';
            } else {
                div.classList.remove('is-cutted');
                tglBtn.style.display = 'none';
            }
        };
        cuttDiv();
        window.addEventListener('resize', () => {
            div.classList.remove('is-cutted');
            cuttDiv();
        });
        tglBtn.addEventListener('click', () => {
            div.classList.toggle('is-opened');
            tglBtn.classList.toggle('is-opened');
        });
    }
};