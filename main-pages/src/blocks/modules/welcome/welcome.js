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
});