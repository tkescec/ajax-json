var handleContent = function () {
    var preloader = $('.preloader');
    var ajaxLoader = '<img class="ajax-loader" src="/img/ajax-loader.gif" />';

    $('.btn').click(function (e) {
        e.preventDefault();
        var btn = $(this);
        $('.users tbody').empty();
        $.ajax({
            url: "data/users.json",
            type: "GET",
            data: { "id": 1 },
            beforeSend: function () {
                //btn.unbind('click');
                //btn.prop('disabled', 'disabled');
                preloader.empty();
                preloader.append(ajaxLoader);
            },
            success: function (result, status, xhr) {
                /* Ponkad je potrebno parsirati JSON koji dobijete u rezultatu u js objekt */
                //var users = $.parseJSON(result);
                
                $.each(result, function(key, value){
                    var html = '';
                    html += '<tr>';
                    html += '<td>' + value.id + '</td>';
                    html += '<td>' + value.name + '</td>';
                    html += '<td>' + value.username + '</td>';
                    html += '<td>' + value.email + '</td>';
                    html += '</tr>';

                    $('.users tbody').append(html);
                });
                console.log($(btn));
            },
            error: function (xhr, status, error) {
                if (error){
                    preloader.empty();
                    preloader.text("An error occured while proccessing your request! Please try again later!");
                    setTimeout(function () {
                        preloader.empty();
                    }, 5000);
                    
                }
            },
            complete: function () {
                preloader.empty();
            }
        });
    });
};

var App = function () {
    return {
        init: function (element) {
            handleContent();
        }
    }
}();