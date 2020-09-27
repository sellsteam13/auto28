var target = window.location.hash;
window.location.hash = "";

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.info-tabs')) {
        setLocalHash();
    }
});


const setLocalHash = () => {
    const allTriggers = document.querySelectorAll('.info-tabs .tabs-triggers a');
    if (target.length > 0 && document.querySelector(target)) {
        document.querySelector(target).style.display = 'block';
        if (allTriggers) {
            allTriggers.forEach(each => {
                if (each.getAttribute('href') == 'target') {
                    each.classList.add('is-active');
                }
            });
        }
    } else {
        document.querySelector('.info-tabs-block').style.display = 'block';
        allTriggers[0].classList.add('is-active');
    }
    tabsBinding();
};

const tabsBinding = () => {
    const allTriggers = document.querySelectorAll('.info-tabs .tabs-triggers a');
    const allBlocks = document.querySelectorAll('.info-tabs-block');
    allTriggers.forEach(each => {
        each.addEventListener('click', (e) => {
            e.preventDefault();
            if (document.querySelector(each.hash)) {
                allBlocks.forEach(block => {
                    block.style.display = 'none';
                });
                allTriggers.forEach(link => {
                    link.classList.remove('is-active');
                });
                each.classList.add('is-active');
                document.querySelector(each.hash).style.display = 'block';
            }
        });
    });
};