$(document).ready(function() {

    // All masks
    $(".masked-phone").mask("+34 999 999 999");

    // Modals
    if ($('.modal-message').length) {
        modalBind(".modal-message", ".call-message");
    }

    // Custom selects
    $(".select-module select").customSelect();

    // Show filter form after selects initiated
    if (document.querySelector('.filter')) {
        document.querySelector('.filter').style.display = 'block';
    }

    //region Share buttons
    var url;
    var ShareUrl;
    $(".btn-share").click(function () {
        url = $(this).closest(".categoryAdvertCover").find(".categoryAdvertLink").attr("href");
        ShareUrl;
        if (url === undefined) {
            ShareUrl = window.location.href;
        } else {
            ShareUrl = "https://auto28.es" + url;
        }
    })

    $(".share-fb").click(function () {
        window.open("https://www.facebook.com/sharer.php?u=" + ShareUrl, "Поделиться", "menubar=1,resizable=1,width=600,height=480");
    })

    $(".share-fbmsg").click(function () {
        window.open("fb-messenger://share?link=" + ShareUrl, "Поделиться", "menubar=1,resizable=1,width=600,height=480");
    })

    $(".share-tlg").click(function () {
        window.open("https://telegram.me/share/url?url=" + ShareUrl, "Поделиться", "menubar=1,resizable=1,width=600,height=480");
    })

    $(".share-whatsapp").click(function () {
        window.open("https://web.whatsapp.com/send?text=" + ShareUrl, "Поделиться", "menubar=1,resizable=1,width=600,height=480");
    })
    //endregion

    //region Filter form mobile
    $(document).on('click', '.open-mobile-filter', function () {
        $('.filter-tabs__item.is-active .filter-tab-rows > *').appendTo('.filter-mobile .filter-mobile-body');
    });
    $(document).on('click', '.close-mobile-filter', function () {
        $('.filter-mobile .filter-mobile-body > *').appendTo('.filter-tabs__item.is-active .filter-tab-rows');
    });
    $(document).on('change', '.filter-mobile-head__sort', function () {
        $('.filter-mobile .filter-mobile-body > *').appendTo('.filter-tabs__item.is-active .filter-tab-rows');
        $('#filterTabTrigger' + $(this).val()).trigger('click');
        $('.filter-tabs__item.is-active .filter-tab-rows > *').appendTo('.filter-mobile .filter-mobile-body');
    });
    $(document).on('click', '.mobile-filter-submit', function (e) {
        e.preventDefault();
        $('.close-mobile-filter').trigger('click');
        $('.filter-tabs__item.is-active form').submit();
    });
    $(document).on('click', '.mobile-filter-reset', function (e) {
        e.preventDefault();
        clearFormFilters($('.filter-mobile .filter-mobile-body'));
    });
    //endregion

    // product plyr video player
    const allVideos = Array.from(document.querySelectorAll('.youtube-slide'));
    if (allVideos.length > 0) {
        allVideos.forEach(each => {
            let index = 'plyr' + allVideos.indexOf(each);
            each.setAttribute('id',index);
            window[index] = new Plyr(each);
        });
    }
    // end product plyr video player
});
