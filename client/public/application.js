$(document).ready(function(){

$.ajax({
  //request from client at 9393 to server at 3000
      url: 'http://localhost:3000/trucks',
      type: 'get'
    }).done(function() {
      console.log('success');
    }).fail(function() {
      console.log('fail');
    });

$.ajax({
  //post from client at 9393 to server at 3000
      url: 'http://localhost:3000/createTruck',
      type: 'post'
    }).done(function(res) {
      console.log('post success');
    }).fail(function() {
      console.log('fail');
    });

$.ajax({
  //post from client at 9393 to server at 3000
      url: 'http://localhost:3000/truck/549993771cf63e3cf9000001/updateTruck',
      type: 'put'
    }).done(function(res) {
      console.log('update success');
    }).fail(function() {
      console.log('fail');
    });

});