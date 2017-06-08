$(function() {

  var body = $('body');
  var header = $('header');
  var input = $('input').appendTo(header);
  var button = $('button').appendTo(header);

  function loadRecords() {
    var insertedName = input.val().length;
    if (insertedName >= 3) {
      $('#start').hide();
      var query = input.val();
      $.ajax({
        url: "https://api.github.com/search/repositories?q=" + query,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
          repositoryName(response.items)
        },
        error: function(err) {
          alert(err);
        }
      });
    } else {
      alert("Something went wrong! The name should contain at least 3 character.");
      $('#start').show();
    }
    input.val('');
  }

  button.on('click', function() {
    if ($('div').hasClass('record')) {
      $('.user').remove();
      loadRecords();
    } else {
      loadRecords();
    }
});

$('input').keypress(function(e){
  if(e.which == 13){
    button.click();
      }
  });


function repositoryName(repos) {
  var list = $('<ul>', {'class': 'user' }).appendTo(body);
    for (var i = 0; i < repos.length && i < 10; i++) {
      var recordDiv = $('<div>', {'class': 'record', 'onclick':''}).appendTo(list);
      recordDiv.attr('onclick',`window.open('${repos[i].owner.html_url}')`);
      var personDiv = $('<div>', {'class': 'person'}).appendTo(recordDiv);
      var userPhoto = $('<img>', {'src':''}).appendTo(personDiv);
      userPhoto.attr('src', repos[i].owner.avatar_url);
      var nameDiv = $('<div>', {'class': 'names'}).appendTo(personDiv);
      var repoName = $('<h3>', {'class': 'repoName'}).appendTo(nameDiv);
      repoName.text(repos[i].name);
      var fullName = $('<p>', {'class': 'fullName'}).appendTo(nameDiv);
      fullName.text(repos[i].full_name);
    }
}

});
