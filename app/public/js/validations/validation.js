$(document).ready(function() {
    // $("#userId").focus();
    $('.btn').attr('disabled', 'disabled');
    $('.statusCode input').attr('disabled', 'disabled');
    $("input#resetPasswordEmail").keypress(function() {
        var empty = false
        $('form#lostPassword >  input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (!empty) $('#resetPasswordButton').removeAttr('disabled');
    })

    $("#registerUser input").keypress(function() {
        var empty = false
        $('form#registerUser >  input, div input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (!empty) $('#registerUser button').removeAttr('disabled');
    })

})
