<!DOCTYPE html>
<html>
<head>
  <title>Facebook Login JavaScript Example</title>
  <meta charset="UTF-8">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script type="text/javascript" src="js/main.js" ></script>
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
  <div id="fb-root"></div>
  <!-- <div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="true" data-auto-logout-link="true"></div> -->
  <fb:login-button scope="public_profile,email" data-auto-logout-link="true" onlogin="checkLoginState();"></fb:login-button>

  <div id="status"></div>
  <h1>CONFIRMADOS</h1>
  <div id="callAPI"></div>

</body>
</html>