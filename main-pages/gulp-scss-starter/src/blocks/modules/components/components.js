import jquery from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
    tabsInit();
    accordionInit();
    selectsBind();
    $(".select-module select").customSelect();
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

// Инициализация селектов

const selectsBind = () => {
    (function($) {
        $.fn.customSelect = function(options) {

            var make = function() {

                var selectElement = $(this);
                var selected = 0;
                var multiple = (selectElement.attr("multiple")) ? 1 : 0;
                var selectValue = selectElement.val();
                var selectOptions = selectElement.find("option");
                var selectOptionGroups = selectElement.find("optgroup");
                var isWrite = (selectElement.data('write')) ? 1 : 0;
                var isClearChange = (selectElement.data('clearchange')) ? 1 : 0;
                var clearLabel = (selectElement.data('clearlabel')) ? selectElement.data('clearlabel') : 'Eliminar';

                selectElement.attr('autocomplete', 'off');
                selectElement.wrap("<div class='select-cover'></div>");
                var cover = selectElement.parent(".select-cover");

                selectOptions.each(function() {
                    if ($(this).attr("value") === selectValue && $(this).attr("value") !== "0" && $(this).attr("value") !== "") {

                        if (isWrite) {
                            cover.append("<div class='select-value'><div class='select-value-inner'><input name='select-writable' value='" + $(this).html() + "' autocomplete='off'></div></div>");
                        } else {
                            cover.append("<div class='select-value'><div class='select-value-inner'>" + $(this).html() + "</div></div>");
                        }


                        if (selectOptions.length > 0) {
                            cover.append("<div class='select-options'></div>");
                        }
                        selected = 1;
                    }
                });

                if (selected === 0) {
                    if (isWrite) {
                        cover.append("<div class='select-value'><div class='select-value-inner'><input name='select-writable' placeholder='" + selectElement.attr("placeholder") + "' autocomplete='off'></div></div>");
                    } else {
                        cover.append("<div class='select-value'><div class='select-value-inner'>" + selectElement.attr("placeholder") + "</div></div>");
                    }

                    if (selectOptions.length > 0) {
                        cover.append("<div class='select-options'></div>");
                    }
                }

                if (!selectElement.hasClass('just-select')) {
                    cover.find(".select-options").append("<div class='clear-selects'>" + clearLabel + "</div>");
                }
                if (typeof(selectOptionGroups.html()) != 'undefined') {
                    selectOptionGroups.each(function() {
                        var groupOptions = $(this).find("option");
                        var groupOptionsList = '';

                        groupOptions.each(function() {
                            var active = '';
                            if ($(this).attr("selected") === 'selected') {
                                active = 'active';

                            }
                            if ($(this).attr("value") !== "0" && $(this).attr("value") !== "") {
                                groupOptionsList += "<div class='select-option " + active + "' data-value='" + $(this).attr("value") + "'>" + $(this).html() + "</div>";
                            }

                        });
                        cover.find(".select-options").append("<div class='select-option-group'><div class='select-option-group-label'>" + $(this).attr("label") + "</div>" + groupOptionsList + "</div>");
                    });
                } else {
                    selectOptions.each(function() {
                        var active = '';
                        if ($(this).attr("selected") === 'selected') {
                            active = 'active';
                        }
                        if ($(this).attr("value") !== "0" && $(this).attr("value") !== "") {
                            cover.find(".select-options").append("<div class='select-option " + active + "' data-value='" + $(this).attr("value") + "'>" + $(this).html() + "</div>");
                        }
                    });
                }

                var params = '';
                if (cover.find(".select-option.active").length > 0) {
                    cover.find(".select-option.active").each(function() {
                        if (multiple == 1) {
                            params += $(this).html().trim() + ", ";
                        } else {
                            params += $(this).html() + "  ";
                        }

                    });
                    cover.addClass("selected");
                } else {
                    params = cover.find("select").attr("placeholder") + "  ";
                }
                if (isWrite) {
                    if (cover.find(".select-option.active").length > 0) {
                        cover.find(".select-value").html("<div class='select-value-inner'><input name='select-writable' value='" + params.slice(0, -2) + "' autocomplete='off'></div>");
                    } else {
                        cover.find(".select-value").html("<div class='select-value-inner'><input name='select-writable' placeholder='" + params.slice(0, -2) + "' autocomplete='off'></div>");
                    }
                } else {
                    cover.find(".select-value").html("<div class='select-value-inner'>" + params.slice(0, -2) + "</div>");
                }

                selectElement.css("display", "none");
                selectElement.css("width", "100%");

                var selectOptions = cover.find(".select-options");

                cover.click(function(event) {
                    event.stopPropagation();

                    var selectOptions = $(this).find(".select-options");
                    if (selectOptions.hasClass("opened")) {
                        $(".select-options").removeClass("opened");
                        $(".select-options").slideUp();
                        $(".select-cover").removeClass('active');
                        selectOptions.removeClass("opened");
                        selectOptions.slideUp();
                        $(this).removeClass('active');
                    } else {
                        $(".select-options").removeClass("opened");
                        $(".select-options").slideUp();
                        $(".select-cover").removeClass('active');
                        selectOptions.addClass("opened");
                        selectOptions.slideDown();
                        $(this).addClass('active');
                    }

                });

                selectOptions.find(".clear-selects").click(function(e) {
                    e.stopPropagation();
                    $(this).parent().parent().find("select").find("option").each(function() { $(this).attr("selected", null); });
                    $(this).parent().parent().find("select").val(null);
                    $(this).parent().parent().removeClass("selected").removeClass("active");
                    $(this).parent().find(".select-option").each(function() { $(this).removeClass("active"); });
                    selectElement.val(null);

                    if (isWrite) {
                        $(this).parent().parent().find(".select-value").find("input").val(null);
                        $(this).parent().parent().find(".select-value").find("input").attr('placeholder', ($(this).parent().parent().find("select").attr("placeholder")));
                    } else {
                        $(this).parent().parent().find(".select-value").html("<div class='select-value-inner'>" + $(this).parent().parent().find("select").attr("placeholder") + "</div>");
                    }
                    if (isClearChange) {
                        selectElement.trigger('change');
                    }
                    $(this).parent().slideUp();
                    $(this).parent().find(".select-option").removeClass('hide');
                });

                selectOptions.find(".select-option").each(function() {
                    $(this).click(function(e) {
                        e.stopPropagation();
                        if (multiple === 1) {
                            var value = $(this).data("value");
                            var active = ($(this).hasClass("active")) ? 1 : 0;
                            selectElement.find("option").each(function() {
                                if (value.toString() === $(this).attr("value")) {
                                    if (active === 1) {
                                        $(this).attr("selected", null);
                                    } else {
                                        $(this).attr("selected", "selected");
                                    }
                                }
                            });

                            $(this).toggleClass("active");

                            var params = '';

                            if (cover.find(".select-option.active").length > 0) {
                                cover.find(".select-option.active").each(function() {
                                    params += $(this).html().trim() + ", ";
                                });
                                cover.addClass("selected");
                            } else {
                                params = cover.find("select").attr("placeholder") + "  ";
                                cover.removeClass("selected");
                            }

                            if (isWrite) {
                                cover.find(".select-value").html("<div class='select-value-inner'><input name='select-writable' value='" + params.slice(0, -2) + "' autocomplete='off'></div>");
                            } else {
                                cover.find(".select-value").html("<div class='select-value-inner'>" + params.slice(0, -2) + "</div>");
                            }

                        } else {
                            var value = $(this).data("value");
                            $(this).parent().find(".select-option").removeClass("active");
                            selectElement.find("option").each(function() {
                                $(this).attr("selected", null);
                                if (value.toString() === $(this).attr("value")) {
                                    $(this).attr("selected", "selected");
                                }
                            });

                            selectElement.val(value);

                            if (isWrite) {
                                cover.find(".select-value").html("<div class='select-value-inner'><input name='select-writable' value='" + $(this).html() + "' autocomplete='off'></div>");
                            } else {
                                cover.find(".select-value").html("<div class='select-value-inner'>" + $(this).html() + "</div>");
                            }

                            selectOptions.removeClass("opened");
                            $(this).parent().parent().toggleClass('active');
                            $(this).toggleClass("active");
                            selectOptions.slideUp();

                            if (cover.find(".select-option.active").length > 0) {
                                cover.addClass("selected");
                            } else {
                                cover.removeClass("selected");
                            }
                        }

                        selectElement.trigger("change");
                        selectElement.parent().find("input[name='select-writable']").keyup(function() {
                            var optionsList = $(this).parent().parent().next(".select-options").find(".select-option");
                            var controlVal = $(this).val().toLowerCase();
                            if (!$(this).parent().parent().next(".select-options").hasClass("opened")) {
                                $(this).parent().parent().parent().addClass('active');
                                $(this).parent().parent().next(".select-options").slideDown();
                            }
                            optionsList.each(function() {
                                var val = $(this).html().toLowerCase();
                                if (val.includes(controlVal)) {
                                    $(this).removeClass("hide");
                                } else {
                                    $(this).addClass("hide");
                                }
                            });
                        });
                    });
                });

                $(".select-option-group").click(function(event) { event.stopPropagation(); });

                $("body").click(function() {
                    if (cover[0] && cover[0].classList.contains('active')) {
                        cover.removeClass('active');
                        $(".select-options").removeClass("opened");
                        $(".select-options").slideUp();
                    }
                });

                $("input[name='select-writable']").keyup(function() {
                    var optionsList = $(this).parent().parent().next(".select-options").find(".select-option");
                    var controlVal = $(this).val().toLowerCase();
                    if (!$(this).parent().parent().next(".select-options").hasClass("opened")) {
                        $(this).parent().parent().parent().addClass('active');
                        $(this).parent().parent().next(".select-options").slideDown();
                    }
                    optionsList.each(function() {
                        var val = $(this).html().toLowerCase();
                        if (val.includes(controlVal)) {
                            $(this).removeClass("hide");
                        } else {
                            $(this).addClass("hide");
                        }
                    });
                });
            }

            this.each(make);
        };

    }(jQuery));
};