
var flag = true;
var shift = $(window).width() > 640 ? 400 : 150;
var active = '';

$('.menu-block').on('mouseenter', function () {
    $('.position', this).addClass('fadeInDown animated');
    $('.position', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('.position', this).removeClass('fadeInDown animated');
    });
    $('.food-name', this).addClass('fadeInDown animated');
    $('.food-name', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('.food-name', this).removeClass('fadeInDown animated');
    });
    $('.price', this).addClass('fadeInUp animated');
    $('.price', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('.price', this).removeClass('fadeInUp animated');
    });

}).on('mouseleave', function () {
    $('.position', this).removeClass('fadeInDown animated');
    $('.food-name', this).removeClass('fadeInDown animated');
    $('.price', this).removeClass('fadeInUp animated');
});

$('.menu-block').on('click', function () {
    active = $(this);
    $('body').css('overflow', 'hidden');
    var img = $('img', active);
    var position = $('.position', active);
    var name = $('.food-name', active);
    var text = $('p', active);
    if (active.index() == 0) {
        $('#popup .prev').addClass('unactive');
    } else if (active.index() == $('.menu-block').length - 1 || active.index() == 15 || active.index() == 11) {
        $('#popup .next').addClass('unactive');

    }
    console.log(img[0])
    var imgSrc = $('#popup img').attr('src', img.attr('src').replace(/food/, 'food/big'));
    console.log(imgSrc)
    // Thay thế 'food' thành 'food/big' trong src

    // Thiết lập background-image cho phần tử với lớp 'image-food'
    $('#popup .image-food').css('background-image', 'url(' + imgSrc + ')');
    $('#popup .position').html(position.html());
    $('#popup .food-name').html(name.html());
    $('#popup p').html(text.html());

    $('#popup').show();

    $('#popup').css('opacity', 1);

    setTimeout(function () {
        $('#popup article').eq(0).addClass('fadeInLeft animated').css('opacity', 1);
        $('#popup article').eq(0).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('#popup article').eq(0).removeClass('fadeInLeft animated');
        });

        $('#popup article').eq(1).addClass('fadeInRight animated').css('opacity', 1);
        $('#popup article').eq(1).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('#popup article').eq(1).removeClass('fadeInRight animated');
        });

    }, 500);
    setTimeout(function () {
        $('#popup .button').addClass('fadeInDown animated').css('opacity', 1);
        $('#popup .button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('#popup .button').removeClass('fadeInDown animated');
        });
    }, 1000);
});
$('.close-button').on('click', function () {
    $('body').css('overflow', 'auto');
    $('#popup article, #popup .button').css('opacity', 0);
    active = '';
    setTimeout(function () {
        $('#popup').hide()
        $('#popup .next, #popup .prev').removeClass('unactive');
    }, 500);
    return false;
});
$('#popup .next, #popup .prev').on('click', function () {
    var activeTemp = $(this).hasClass('prev') ? active.prev() : active.next();
    if (!activeTemp.length || !flag) {
        if (!activeTemp.length) {
            $(this).addClass('unactive');
        }
        return false;
    }
    $('#popup .next, #popup .prev').removeClass('unactive');
    flag = false;
    var img = $('img', activeTemp);
    var position = $('.position', activeTemp);
    var name = $('.food-name', activeTemp);
    var text = $('p', activeTemp);
    $('.details-wrapper > *, #popup img').css('opacity', 0);

    setTimeout(function () {
        $('#popup img').attr('src', img.attr('src').replace(/food/, 'food/big')).css('opacity', 1);
    }, 500);

    setTimeout(function () {
        $('#popup .position').html(position.html());
        $('#popup .food-name').html(name.html());
        $('#popup p').html(text.html());

        var time = 100;
        $('.details-wrapper > *').each(function () {
            time += 200;
            var thiz = this;
            setTimeout(function () {
                $(thiz).addClass('fadeInDown animated').css('opacity', 1);
                $(thiz).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(thiz).removeClass('fadeInDown animated');
                });
            }, time)
        });
        setTimeout(function () {
            flag = true;
        }, 900);
    }, 300)
    active = activeTemp;
    return false
});

$('.more-food').on('click', function () {
    if ($(this).hasClass('unactive')) {
        return false;
    }
    $(this).addClass('animate');

    var amount = 4;
    var width = $(window).width();

    if (width <= 480) {
        var amount = 4;
    } else if (width < 768) {
        var amount = 2;
    } else if (width < 990) {
        var amount = 3;
    } else {
        var amount = 4;
    }

    var time = -200;
    setTimeout(function () {
        $('.more-food').removeClass('animate');
        $('.menu-block.animate').each(function (i) {
            if (i >= amount) {
                return false;
            }
            time += 200;
            var thiz = this;
            $(this).show();
            if (i == 0) {
                $('html,body')
                    .stop()
                    .scrollTo($(this).offset().top, 300);
            }
            setTimeout(function () {
                $(thiz).addClass('fadeInLeft animated').removeClass('animate').css('opacity', 1);
                $(thiz).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(thiz).removeClass('fadeInLeft animated');
                });
                if (!$('.menu-block.animate').length) {
                    $('.more-food').addClass('unactive');
                }
            }, time);
        });
    }, 1000);

    return false;
})

AOS.init({
    easing: 'ease',
    startEvent: 'DOMContentLoaded',
    disable: function () {
        var maxWidth = 500;
        return window.innerWidth < maxWidth;
    }
});

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2
        },
        1200: {
            items: 1
        }
    }
});

var swiperhinhanh = new Swiper('.swiper-container-images', {
    slidesPerView: 5,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 20,
        },
    }

});

const popup = document.getElementById('popup');
const closeButton = document.getElementById('close-popup');

closeButton.addEventListener('click', function () {
    popup.classList.add('hidden'); // Ẩn popup
});

popup.addEventListener('click', function (event) {
    if (event.target === popup) {
        popup.classList.add('hidden');
    }
});

//refresh animations
$(window).on('load', function () {
    AOS.refresh();
});