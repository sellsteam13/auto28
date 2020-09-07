document.addEventListener('DOMContentLoaded', () => {
    mobileBind();
    window.addEventListener('resize', () => {
        mobileBind();
    });
});


// Аккордеоны в футере на мобилке

const mobileBind = () => {
    if (document.querySelector('.footer')) {
        const inners = document.querySelectorAll('.footer-nav--mobile');
        inners.forEach(each => {
            const trigger = each.querySelector('span');
            trigger.addEventListener('click', () => {
                if (!each.classList.contains('is-opened') && window.innerWidth < 993) {
                    inners.forEach(el => {
                        el.classList.remove('is-opened');
                    });
                    each.classList.add('is-opened');
                } else {
                    each.classList.remove('is-opened');
                }
            });
        });
    }
};