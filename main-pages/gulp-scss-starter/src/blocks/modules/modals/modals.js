document.addEventListener('DOMContentLoaded', () => {
    modalBind(".modal-location", ".call-location");
    modalBind(".modal-auth", ".call-auth");
    modalBind(".modal-report", ".call-report");
    modalBind(".modal-friend", ".call-friend");
    modalBind(".modal-order", ".call-order");
    modalBind(".modal-message", ".call-message");
    const body = document.body;
    if (body.classList.contains('cookies-non-accepted')) {
        let canDisable = true;
        const triggerBtn = document.querySelector('.cookieAlerts .cookieAlertButton button');
        if (body.classList.contains('cookies-non-accepted') && canDisable && window.innerWidth < 501 && triggerBtn) {
            body.style.overflow = 'hidden';
        }
        if (triggerBtn) {
            triggerBtn.addEventListener('click', () => {
                body.style.overflow = '';
                canDisable = false;
            });
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth < 501 && canDisable && triggerBtn) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        })
    }
});

// Бинд модалки

const modalBind = (modal, trigger) => {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const currTriggers = document.querySelectorAll(trigger);
    const currModal = document.querySelector(modal);
    const closeBtn = currModal.querySelector('.modal-close');
    currTriggers.forEach(each => {
        each.addEventListener('click', (e) => {
            e.preventDefault();
            if (!body.classList.contains('overlay-toggled')) {
                overlay.style.display = 'flex';
                currModal.style.display = 'flex';
                setTimeout(() => {
                    body.style.overflow = 'hidden';
                    body.classList.add('overlay-toggled');
                    currModal.classList.add('animated');
                }, 50);
            } else {
                modals.forEach(key => {
                    key.classList.remove('animated');
                    setTimeout(() => {
                        key.style.display = 'none';
                    }, 300);
                });
                setTimeout(() => {
                    currModal.style.display = 'flex';
                    setTimeout(() => {
                        currModal.classList.add('animated');
                    }, 50);
                }, 350);
            }
        });
        document.body.addEventListener('click', (evnt) => {
            if (evnt.target.classList.contains('overlay')) {
                body.style.overflow = '';
                body.classList.remove('overlay-toggled');
                modals.forEach(key => {
                    key.classList.remove('animated');
                });
                setTimeout(() => {
                    overlay.style.display = 'none';
                    currModal.style.display = 'none';
                }, 300);
            }
        });
    });
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        body.style.overflow = '';
        body.classList.remove('overlay-toggled');
        modals.forEach(key => {
            key.classList.remove('animated');
        });
        setTimeout(() => {
            overlay.style.display = 'none';
            currModal.style.display = 'none';
        }, 300);
    });
};

window.modalBind = modalBind;

// Бинд нотификаций

const openNotification = (itemId) => {
    const notificationCenter = document.querySelector('.notifications-inner');
    const notifications = document.querySelectorAll('.notification');
    const item = notificationCenter.querySelector(itemId);
    const closeTrigger = item.querySelector('.notification__close');
    notificationCenter.style.display = 'block';
    item.style.display = 'block';
    setTimeout(() => {
        notificationCenter.classList.add('is-opened');
        item.classList.add('is-opened');
    }, 50);
    const closeInterval = setTimeout(() => {
        closeNotifications();
    }, 6000);
    closeTrigger.addEventListener('click', () => {
        clearInterval(closeInterval);
        closeNotifications();
    });
};

const closeNotifications = () => {
    const notificationCenter = document.querySelector('.notifications-inner');
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(each => {
        each.classList.remove('is-opened');
    });
    notificationCenter.classList.remove('is-opened')
    setTimeout(() => {
        notificationCenter.style.display = 'none';
        notifications.forEach(each => {
            each.style.display = 'none';
        });
    }, 300);
};

const openNotificationWithFunction = (notificationId) => {
    if (document.querySelector('.notifications-inner')) {
        const center = document.querySelector('.notifications-inner');
        if (!center.classList.contains('is-opened')) {
            openNotification(notificationId);
        }
    }
};

window.openNotificationWithFunction = openNotificationWithFunction;