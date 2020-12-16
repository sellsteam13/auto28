if (document.querySelector('.info')) {
    var target = window.location.hash;
    window.location.hash = "";
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.info-tabs')) {
        setLocalHash();
    }
});


const setLocalHash = () => {
    const allTriggers = document.querySelectorAll('.info-tabs .tabs-triggers a');
    if (document.querySelector('.info')) {
        if (target.length > 0 && document.querySelector(target)) {
            document.querySelector(target).style.display = 'block';
            if (allTriggers) {
                allTriggers.forEach(each => {
                    if (each.getAttribute('href') == target) {
                        each.classList.add('is-active');
                    }
                });
            }
        } else {
            document.querySelector('.info-tabs-block').style.display = 'block';
            allTriggers[0].classList.add('is-active');
        }
    }
    tabsBinding();
};

const tabsBinding = () => {
    const allTriggers = document.querySelectorAll('.info-tabs .tabs-triggers a');
    const allBlocks = document.querySelectorAll('.info-tabs-block');
    const footerLinks = document.querySelectorAll('.footer-nav-block__trigger');
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
    if (footerLinks.length > 0 && document.querySelector('.info')) {
        footerLinks.forEach(each => {
            each.addEventListener('click', () => {
                setTimeout(() => {
                    let localHash = location.hash;
                    const block = document.querySelector(localHash);
                    allBlocks.forEach(block => {
                        block.style.display = 'none';
                    });
                    block.style.display = 'block';
                    allTriggers.forEach(link => {
                        link.classList.remove('is-active');
                        setTimeout(() => {
                            if (link.getAttribute('href') == localHash) {
                                link.classList.add('is-active');
                                window.scrollTo(0, 0);
                                window.location.hash = "";
                            }
                        }, 0)
                    });
                }, 0)
            });
        });
    }
};