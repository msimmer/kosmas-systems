var MOBILE_SCREEN_WIDTH = 600

$(function() {
    $('.nav__toggle').on('click', function() {
        $(this).toggleClass('open')
        $(this)
            .closest('.nav__main')
            .toggleClass('open')
    })

    if (window.ksms && window.ksms.slider) {
        var index = 0
        var images = $('.product__slider__thumbnail')
        var speed = 200

        var interval = setInterval(function() {
            images.eq(index).hide()
            index = index + 1 > images.length - 1 ? 0 : index + 1
            images.eq(index).show()
        }, speed)

        images.eq(index).show()
    }

    // menu toggle
    $('[data-nav-link]').on('click', function(e) {
        e.preventDefault()
        var name = $(this).attr('data-nav-link')
        var list = $('[data-nav-list="' + name + '"]')
        if (list.hasClass('open')) {
            list.removeClass('open')
            return
        }
        $('[data-nav-list]')
            .not(list)
            .removeClass('open')
        list.addClass('open')
    })
})
