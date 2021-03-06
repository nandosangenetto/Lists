//GLOBAL VARIABLES
var appId = 183431692064168;
var evento;
var eventoId;
var resultLimit;

var results = {
  interested: [],
  attending: []
};

$(document).ready(function(){
  $('#submit').click(function(e){
    e.preventDefault();
    if(($('#event-link').val() != "" && $('#number-of-results').val() != "") && ($('input[name=attending]').is(':checked') || $('input[name=interested]').is(':checked')) ){
      evento = $('#event-link').val();
      eventoId = evento.replace(/[^0-9]/g,'');
      resultLimit = $('#number-of-results').val();
      $('#list-of-attending, #list-of-interesteds, .attending, .interested').empty();
      getEventName();

      if($('input[name=attending]').is(':checked')){
        $('.container-of-results, .attending').show();
        getPeople('attending');
        if($('input[name=interested]').is(':checked')){
          $('.container-of-results, .interested').show();
          getPeople('interested');
        }      
      }
    } else {
      if($('.error-message').is(':hidden')){
        $('.error-message').slideDown('slow');
        setTimeout(function(){
          $('.error-message').slideUp();
        }, 4000);
      }
    }
  });
});


 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // getPeople('attending');
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : appId,
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function getEventName(){
    FB.api('/'+eventoId, function(response){
      $('.event-name').html(response.name);
    });
  }



  function getPeople(type, page){
    page = (typeof page !== 'undefined') ? '&after=' + page : '';
    var url = '/'+eventoId+'/' + type + '?limit='+resultLimit + page;
    FB.api(url, function(response) {

        results[type] = results[type].concat(response.data).sort(sortNames); 

        $('.' + type + '-container .people').remove();
        results[type].forEach(function(element, index, array){
            $('.' + type + '-container .result').append('<a href="https://www.facebook.com/' + element.id + '" class="people" target="_blank"><span>' + element.name + '</span></a>');
        });

        var numberOfPeople = $('.' + type + '-container .people').length;
        $('.' + type + '-container .confirmed').html(numberOfPeople);

        if(typeof response.paging !== 'undefined') {
          getPeople(type, response.paging.cursors.after);
        } else {
          results[type] = null;
        }

    });
  }

  function sortNames(a,b){
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
  }