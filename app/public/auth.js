//auth

$(document).ready(function() {
  $("#login_form").submit(function(event) {
    console.log("something");
    var form = $(this);
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://start-page-maker.herokuapp.com/api/users_verify",
      data: form.serialize(), // serializes the form's elements.
      success: function(data) {
        console.log(data)
        data['token']
        document.cookie = "start_page_token=" + data['token'];
        window.location.replace("https://start-page-maker.herokuapp.com/app/startpage/start-page.html");
      }
    });
  });
//   $("#sign_up").submit(function(event) {
//     var form = $(this);
//     event.preventDefault();
//     $.ajax({
//       type: "POST",
//       url: "http://localhost:8088/api/register" ,
//       data: form.serialize(), // serializes the form's elements.
//       success: function(data) {
//         window.location.replace("http://localhost:8088/app/template/login_form.html");
//       }
//     });
//   });
// });
$("#sign_up").submit(function(event) {
  var form = $(this);
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "https://start-page-maker.herokuapp.com/api/register" ,
    data: form.serialize(), // serializes the form's elements.
    success: function(data) {
      window.location.replace("https://start-page-maker.herokuapp.com/app/template/login_form.html");
    }
  });
});
});
$(document).ready(function() {
  $("#users").submit(function(event) {
    var form = $(this);
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://start-page-maker.herokuapp.com/api/users",
      data: form.serialize(), // serializes the form's elements.
      success: function(data) {
        window.location.replace("https://start-page-maker.herokuapp.com/app/users");
      }
    });
  });
});

//user ineractions
