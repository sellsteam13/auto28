document.addEventListener('DOMContentLoaded', () => {
    tabsInit();
    accordionInit();
    if (document.querySelector('.filter')) {
        document.querySelector('.filter').style.display = 'block';
    }
});

// Функция инициализации табов
const tabsInit = () => {
    if (document.querySelector('.tabs')) {
        const tabsInners = document.querySelectorAll('.tabs');
        tabsInners.forEach(each => {
            const controls = Array.from(each.querySelectorAll('.tabs-triggers > *'));
            const inners = Array.from(each.querySelectorAll('.tabs-inner > *'));
            controls.forEach(key => {
                key.addEventListener('click', (evnt) => {
                    evnt.preventDefault();
                    let index = controls.indexOf(key);
                    if (inners[index]) {
                        inners.forEach(el => {
                            el.classList.remove('is-active');
                        });
                        inners[index].classList.add('is-active');
                        controls.forEach(el => {
                            el.classList.remove('is-active');
                        });
                        key.classList.add('is-active');
                    }
                });
            });
        });
    }
};


// Инициализация аккордеонов
const accordionInit = () => {
    if (document.querySelector('.accordion')) {
        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            const accordionHead = accordion.querySelector('.accordion-head');
            const accordionBody = accordion.querySelector('.accordion-body');
            accordionHead.addEventListener('click', (e) => {
                e.preventDefault();
                if (!accordion.classList.contains('is-opened')) {
                    let animatingHeight = accordionBody.scrollHeight + 'px';
                    accordions.forEach(each => {
                        each.classList.remove('is-opened');
                        each.querySelector('.accordion-body').style.height = 0 + 'px';
                    });
                    accordionBody.style.height = animatingHeight;
                    accordion.classList.add('is-opened');
                } else {
                    accordionBody.style.height = 0 + 'px';
                    accordion.classList.remove('is-opened');
                }
            });
        });
    }
};