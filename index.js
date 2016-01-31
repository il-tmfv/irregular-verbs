$(document).ready(function () { 
    $('.dict-select').select2({ data: data, 
                                placeholder: "..."
                              });
    $('.select2').css('width', '100%');
    $('.dict-select').select2('val', '');
    $('.dict-select').change(function () {
        setTimeout(function () {
            $('select2-container-active').removeClass('select2-container-active');
            $(':focus').blur();
        }, 1);

        var findText = function (done) {
            var id = $('.dict-select').val();
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    $('#form1').html(data[i].form1);
                    $('#form2').html(data[i].form2);
                    $('#form3').html(data[i].form3);
                    break;
                }
            }
            done();
        };

        async.series([
            function (done) { $('#form1').slideUp(100); $('#form2').slideUp(100); $('#form3').slideUp(100, done); },
            function (done) { findText(done) },
            function (done) { $('#form1').slideDown(100, done); },
            function (done) { $('#form2').slideDown(100, done); },
            function (done) { $('#form3').slideDown(100, done); }
        ]);
    });
});
