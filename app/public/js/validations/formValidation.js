$(document).ready(function() {
    $("#userId").focus();
    $('#signIn, #login-form input#password').attr('disabled', 'disabled');

    $("input.main").keypress(function() {
        var empty = false;
        $('form#login-form >  input.main').each(function() {
            // console.log($(this).val());
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (!empty) $('#signIn').removeAttr('disabled');
    });

    var typingTimer;
    var doneTypeInt = 500; // 0.5 sec

    //on keyup, start the countdown
    $('#userId').keyup(function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypeInt);
    });

    //on keydown, clear the countdown 
    $('#userId').keydown(function() {
        clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    function doneTyping() {
        console.log(" Done with typing need to activate validate user and activate password")
        var userName = $('#userId').val();
        var reqData = "key=" + userName;
        //validate user with backend
        $.get('/validateUser', reqData, function(data) {
            if (data) {
                $('#password').removeAttr('disabled');
                $('#invalidUser').text("");
                $('#userId').removeClass('error')
            } else {
                $('#userId').addClass('error');
                $('#invalidUser').text("Invalid User")
                $('#login-form input#password').attr('disabled', 'disabled');
            }
        })
    };

    var pass;
    $('*[name=password]').focusout(function() {
        pass = $(this).val();
    });
    $('*[name=confirmPassword]').keyup(function() {
        var passVer = $(this).val();
        if (pass === passVer) {
            $('#registerUser h5').text("");
        } else {
            $('#registerUser h5').text("Password does't match");
        }
    });

    // $('*[name=RegisterEmail]').keyup(function() {
    //     $('#verifyEmail').removeAttr('disabled');
    // });
})
