// Бинд expand списков
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.welcome-cars__all')) {
        const trigger = document.querySelector('.welcome-cars__all');
        const list = document.querySelector('.welcome-cars__list');
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            list.classList.toggle('is-opened');
            trigger.classList.toggle('is-opened');
        });
    }
    if (document.querySelector('.welcome-offers-map')) {
        document.querySelector('.welcome-offers-map__expand').addEventListener('click', () => {
            if (window.innerWidth < 1071) {
                document.querySelector('.welcome-offers-map__wrap').classList.toggle('is-opened');
                document.querySelector('.welcome-offers-map__expand').classList.toggle('is-opened');
            }
        });
    }
});