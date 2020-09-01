import Swiper from 'swiper';
document.addEventListener('DOMContentLoaded', () => {
    productGalleryInit();
    noteBind();
    galleryPopupBind();
    newDisabler();
    window.addEventListener('resize', () => {
        newDisabler()
    });
    commentaryRowsAmount();
});

const productGalleryInit = () => {
    if (document.querySelector('.product-gallery-master')) {
        const slider = new Swiper('.product-gallery-master', {
            navigation: {
                nextEl: '.product-gallery-master__next',
                prevEl: '.product-gallery-master__prev',
            },
            loop: true,
        })
        document.querySelector('.product-gallery-master__next').addEventListener('click', () => {
            slider.slideNext();
        });
        document.querySelector('.product-gallery-master__prev').addEventListener('click', () => {
            slider.slidePrev();
        });
    }
};

const noteBind = () => {
    if (document.querySelector('.product-contacts-manage__note')) {
        const triggers = document.querySelectorAll('.product-contacts-manage__note');
        const noteInner = document.querySelector('.product-note');
        triggers.forEach(each => {
            each.addEventListener('click', (e) => {
                noteInner.classList.toggle('is-opened');
            });
        });
    }
};

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
            allowTouchMove: false,
            initialSlide: centerSlide
        });
        const galleryTopSlider = new Swiper('.product-gallery-popup-main-master', {
            slidesPerView: 1,
            initialSlide: centerSlide,
        });
        galleryTopSlider.on('slideChange', () => {
            galleryThumbsSlider.slideTo(galleryTopSlider.activeIndex);
            allSlides.forEach(videoSlides => {
                stopVideoFunc(videoSlides);
            });
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
    }
};

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
                    if (!document.querySelector('.swiper-container-initialized.product-gallery-popup-main-master')) {
                        popupGalleryInit();
                    }
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
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            }
        });
    }
};

var stopVideo = function(element) {
    var iframe = element.querySelector('iframe');
    var video = element.querySelector('video');
    if (iframe) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if (video) {
        video.pause();
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


const commentaryRowsAmount = () => {
    if (document.querySelector('.product-main__descr-text')) {
        const div = document.querySelector('.product-main__descr-text');
        const tglBtn = document.querySelector('.product-main__descr-status');
        const cuttDiv = () => {
            div.classList.remove('is-opened');
            if (div.offsetHeight > 102) {
                div.classList.add('is-cutted');
                tglBtn.style.display = 'block';
                console.log(213);
            } else {
                div.classList.remove('is-cutted');
                tglBtn.style.display = 'none';
                console.log(312);
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