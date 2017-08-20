
$(() => {
    $('.nav__toggle').on('click', function() {
        $(this).toggleClass('open')
        $(this).closest('.nav__products').toggleClass('open')
    })
})
