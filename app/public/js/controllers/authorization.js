$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'right'
    });

    $('#verifyEmail').click(function() {
        $email = $('#emailToRegister').val();

        if (/\S+@\S+\.\S+/.test($email)) {
            $('.invalidEmail').removeClass('fail');
            $('.invalidEmail').text("")
            $.post("/requestCode", {
                email: $email
            }, function(data) {

                if (data) {
                    $('.statusCode input').removeAttr('disabled');
                    $(".statusUpdate *").addClass('success');
                    $('.authorizeStatusMess').text('Please check your Email for Verification Code')
                } else {
                    $(".statusUpdate *").addClass('fail');
                    $('.authorizeStatusMess').text('Email send unsucessfull')
                }
            })
        } else {
            $('.invalidEmail').addClass('fail');
            $('.invalidEmail').text("Invalid Email")
        }
    });

    $('*[name=verification]').focusout(function() {
        $userCode = $(this).val();
        $usermail = $('#emailToRegister').val();
        $.post("/verifyCode", {
            userCode: $userCode,
            email: $usermail
        }, function(data) {
            if (data) {
                $(".statusCode *").removeClass('fail').addClass('success');
                $('.authorizeCode').text('Valid Code !!')
            } else {
                $(".statusCode *").removeClass('success').addClass('fail');
                $('.authorizeCode').text('InValid Code !!')
            }
        })
    });
})
