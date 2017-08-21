
$(() => {
    $('.nav__toggle').on('click', function() {
        $(this).toggleClass('open')
        $(this).closest('.nav__products').toggleClass('open')
    })

    if (window.ksms && window.ksms.slider) {
        var index = 0
        var images = $('.product__slider__thumbnail')
        var speed = 200

        var interval = setInterval(function() {
            images.eq(index).css({ opacity: 0 })
            index = index + 1 > images.length - 1 ? 0 : index + 1
            images.eq(index).css({ opacity: 1 })
        }, speed)

        images.eq(index).css({ opacity: 1 })
    }
})
