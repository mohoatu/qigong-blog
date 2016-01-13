$(function() {
    console.log("on document ready     EDIT PAGEE");

    $.get('/getEdit', function(data) {
        console.log(data);
        setEditProfile(data);
    })


})


function setEditProfile(data) {
    // fName, lName, rEmail, gdr, pwd, cPwd
    $('*[name=firstName]').val(data.firstname);
    $('*[name=lastName]').val(data.lastname);
    $('*[name=RegisterEmail]').val(data.email);
    $('*[name=gender]').val(data.gender);
    $('*[name=password]').val(data.password);
    $('*[name=confirmPassword]').val(data.password);

    $("form#editUser input").change(function() {
        $('#editUserButton').removeAttr('disabled');
        // $('form#editUser >  input').each(function() {
        //     // console.log($(this).val());
        //     if ($(this).val() == '') {
        //         empty = true;
        //     }
        // });
        // if (!empty) $('#signIn').removeAttr('disabled');
    });
}
