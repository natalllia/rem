$(document).ready(function () {

    // PRELOADER      
    $(window).load(function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    //hidden_menu
    $("#toggle").click(function () {
        $(this).toggleClass("on");
        $(".icon__menu").fadeToggle(200);
        return false;
    });

    //Карусель
    $('.reviews__carousel').slick({
        infinite: true,
        adaptiveHeight: true,
        dots: true,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    arrows: false,
                }
            },
        ]
    });

    //Фиксация меню
    function checkScroll() {
        var html = document.documentElement;
        var html1 = document.body;

        if ((html.scrollTop > 10) || (html1.scrollTop > 10)) {
            $(".navbar").addClass('fixed');
            $(".list__menu_link").css("color", "#fff");
            // $("#toggle").css("top", "40px");
        }

        else {
            $(".navbar").removeClass('fixed');
            $(".list__menu_link").css("color", "#1c1c1c");
            // $("#toggle").css("top", "40px");
        }
    }
    checkScroll();
    $(document).scroll(function () {
        checkScroll();
    });

    $('.list__menu_link').click(function () {
        $('.icon__menu').fadeOut(200);
        $("#toggle").removeClass("on")
    });

    //popup
    $('.popup').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    //Masked Input
    jQuery(function ($) {
        $(".date").mask("99/99/9999", {
            placeholder: "mm/dd/yyyy"
        });
        $(".phone").mask("(999) 999-9999");
    });

    //scrollTo
    $(".scroll").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top - 50;
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });

    //Кнопка "вверх"
    $("#back-top").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 160) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    //Форма обратной связи для pop-окна
    $(function () {
        $('.pop__form').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            var post_url = form.attr('action');
            var post_data = form.serialize();

            $.ajax({
                type: 'POST',
                url: "mail.php",
                data: $(this).serialize(),
                success: function (msg) {
                    (form).fadeOut(500, function () {
                        form.html('Спасибо, Ваша заявка отправлена').fadeIn();
                        setTimeout(function () {
                            $.magnificPopup.close();
                        }, 2000);
                    });
                }
            });
        });
    });

    //Форма обратной связи
    $(".contact__form").submit(function () {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $(".tnx").fadeIn(300).delay(2000).fadeOut(300);
            $(".contact__form").trigger("reset");
        });
        return false;
    });

}); //end ready
