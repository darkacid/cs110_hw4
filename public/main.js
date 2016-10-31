$(function(){
$("#searchBtn").on("click",function(){
$.ajax({
  url: "/public/index.html",
  type: "POST",
  contentType: "JSON",
})
});
});
