$(document).ready(function(){
  var bookCount = $(".card:visible").length;
  $(".book-count").text(bookCount);
  var authorCount = $(".card").length;
  $(".author-count").text(authorCount);
  $('#genre-filter').change(function(){
    var selectedGenre = $('#genre-filter :selected').text();
    if (selectedGenre === "Show All Genres") {
      $(".card").show();
      bookCount = $(".card:visible").length;
      $(".book-count").text(bookCount);
    } else {
      $(".card[data-tag='" + selectedGenre + "']").show();
      $(".card:not([data-tag='" + selectedGenre + "'])").hide();
      bookCount = $(".card:visible").length;
      $(".book-count").text(bookCount);
    }
  });
});
