$(function() {
  $("span.activator").click(function() {
    $(".components .sub").removeClass("active")
    // $(".components .sub-sub").removeClass("active")
    var component = $(this).parent();
    $(component).find(".sub").addClass("active")
  });

  $("span.sub-activator").click(function() {
    $(".components .sub-sub").removeClass("active")
    var component = $(this).parent();
    $(component).find(".sub-sub").addClass("active")
  });
});
