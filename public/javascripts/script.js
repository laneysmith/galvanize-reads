$(document).ready(function(){
  $('#genre-filter').change(function(){
    var selectedGenre = $('#genre-filter :selected').text();
    if (selectedGenre === "Show All Genres") {
      $(".card").show();
    } else {
      $(".card[data-tag='" + selectedGenre + "']").show();
      $(".card:not([data-tag='" + selectedGenre + "'])").hide();
    }
  });
});
