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
    <div class="error-message"><strong>TODOS</strong> OS CAMPOS ABAIXO DEVEM SER PREENCHIDOS</div>

    <form>
        <input id="event-link" type="text" placeholder="Digite o link do evento" >
        <input id="number-of-results" type="text" placeholder="Número de nomes desejados" >
        <span class="important-note">* Captura os primeiros nomes da lista e os organiza em ordem alfabética.</span>
        <div class="checkboxes">
            <input type="checkbox" name="attending" value="attending" checked> 
            <label for="attending">Confirmados</label>
            <input type="checkbox" name="interested" value="interested">
            <label for="interested">Interessados</label>
        </div>
        <button id="submit">Enviar</button>
    </form>

    <fb:login-button scope="public_profile,email" data-auto-logout-link="true" onlogin="checkLoginState();"></fb:login-button>
    
    <div class="container-of-results">

        <h1 class="event-name"></h1>

        <div class="attending-container">
            <h1 class="attending"></h1>
        </div>

        <div class="interested-container">
            <h1 class="interested"></h1>
        </div>

    </div>

</body>
</html>