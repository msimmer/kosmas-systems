
var MOBILE_SCREEN_WIDTH = 600

$(function() {
    $('.nav__toggle').on('click', function() {
        $(this).toggleClass('open')
        $(this).closest('.nav__main').toggleClass('open')
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


    // nav scroll
    var sidebar = $('.nav__main__container')
    var fixedSidebarClassName = 'nav__main__container--fixed'
    function isMobile() {
        return window.innerWidth <= MOBILE_SCREEN_WIDTH
    }
    function updateSidebarPosition() {
        var headerHeight = $('.site__header').height()
        if ($(window).scrollTop() > headerHeight) {
            console.log('--- yes')
            sidebar.addClass(fixedSidebarClassName)
            return
        }

        sidebar.removeClass(fixedSidebarClassName)

    }
    function resetSidebarPosition() {
        sidebar.removeClass(fixedSidebarClassName)
    }

    $(window).on('scroll', function() {
        if (isMobile()) return resetSidebarPosition()
        updateSidebarPosition()
    })

})
