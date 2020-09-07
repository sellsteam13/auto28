document.addEventListener('DOMContentLoaded', () => {
    mobileFilterBind();
});


// Инициализация открытия/закрытия мобильного фильтра
const mobileFilterBind = () => {
    if (document.querySelector('.filter-mobile')) {
        const filter = document.querySelector('.filter-mobile');
        const body = document.body;
        const openTriggers = document.querySelectorAll('.open-mobile-filter');
        const closeTriggers = document.querySelectorAll('.close-mobile-filter');
        openTriggers.forEach(each => {
            each.addEventListener('click', (e) => {
                e.preventDefault();
                if (!filter.classList.contains('is-opened')) {
                    body.classList.add('mobile-filter-opened');
                    body.style.overflow = 'hidden';
                    filter.style.display = 'flex';
                    setTimeout(() => {
                        filter.classList.add('is-opened');
                    }, 100);
                }
            });
        });
        closeTriggers.forEach(each => {
            each.addEventListener('click', (e) => {
                e.preventDefault();
                if (filter.classList.contains('is-opened')) {
                    filter.classList.remove('is-opened');
                    setTimeout(() => {
                        body.classList.remove('mobile-filter-opened');
                        body.style.overflow = '';
                        filter.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
};