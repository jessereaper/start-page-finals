//auth

$(document).ready(function() {
  $("#login_Form").submit(function(event) {
    var form = $(this);
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost:8088/api/users_verify",
      data: form.serialize(), // serializes the form's elements.
      success: function(data) {
        window.location.replace("http://localhost:8088/app/start-page.html.");
      }
    });
  });
  $("#sign_up").submit(function(event) {
    var form = $(this);
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost:8088/api/register" ,
      data: form.serialize(), // serializes the form's elements.
      success: function(data) {
        window.location.replace("http://localhost:8088/app/template/login_form.html");
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
      url: "http://localhost:8088/api/users",
      data: form.serialize(), // serializes the form's elements.
      success: function(data) {
        window.location.replace("http://localhost:8081/app/users");
      }
    });
  });
});
