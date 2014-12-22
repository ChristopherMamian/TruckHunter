$(document).ready(function(){

$.ajax({
  //request from client at 9393 to server at 3000
      url: 'http://localhost:3000/list',
      type: 'get'
    }).done(function() {
      console.log('success');
    }).fail(function() {
      console.log('fail');
    });

});