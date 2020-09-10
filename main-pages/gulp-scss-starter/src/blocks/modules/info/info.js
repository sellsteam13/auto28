var target = window.location.hash;
window.location.hash = "";

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.info-tabs')) {
        setLocalHash();
    }
});


const setLocalHash = () => {
    if (target.length > 0 && document.querySelector(target)) {
        document.querySelector(target).style.display = 'block';
    } else {
        document.querySelector('.info-tabs-block').style.display = 'block';
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
                document.querySelector(each.hash).style.display = 'block';
            }
        });
    });
};