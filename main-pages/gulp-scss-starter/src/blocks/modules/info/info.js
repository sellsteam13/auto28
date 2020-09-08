document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.info-tabs')) {
        setLocalHash()
    }
});


const setLocalHash = () => {
    if (window.location.hash.length > 0 && document.querySelector(window.location.hash)) {
        document.querySelector(window.location.hash).style.display = 'block';
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