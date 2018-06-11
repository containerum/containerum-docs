$(function() {
  $("span.activator").click(function() {
    $(".components .sub").removeClass("active")
    var component = $(this).parent();
    $(component).find(".sub").addClass("active")
  });
});
