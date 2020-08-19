document.addEventListener('DOMContentLoaded', () => {
    focusTrigger();
    menuAccordions();
    stickyMobile()
    window.addEventListener('resize', () => {
        menuAccordions();
        stickyMobile();
    });
});
const focusTrigger = () => {
    if (document.querySelector('.header-search__btn')) {
        const trigger = document.querySelector('.header-search__btn');
        const inner = document.querySelector('.header-search-form__input');
        trigger.addEventListener('click', () => {
            inner.focus();
        });
    }
};

const menuAccordions = () => {
    if (document.querySelector('.header') && window.innerWidth < 760) {
        const allInners = document.querySelectorAll('.header-menu-nav__item-block');
        allInners.forEach(each => {
            const trigger = each.querySelector('.header-menu-nav__item-block-title');
            trigger.addEventListener('click', () => {
                if (!each.classList.contains('is-opened')) {
                    allInners.forEach(each => {
                        each.classList.remove('is-opened');
                    });
                    each.classList.add('is-opened');
                } else {
                    each.classList.remove('is-opened');
                }
            });
        });
    }
};

const stickyMobile = () => {
    if (document.querySelector('.header') && window.innerWidth < 551) {
        window.addEventListener('scroll', () => {
            if (document.body.getBoundingClientRect().top < -300 && window.innerWidth < 551) {
                document.querySelector('.header-container').classList.add('is-fixed');
            } else {
                document.querySelector('.header-container').classList.remove('is-fixed');
            }
        });
    } else {
        document.querySelector('.header-container').classList.remove('is-fixed');
    }
};