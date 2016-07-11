<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {% block title %} {% endblock title %}

    {# <link rel="stylesheet" href="css/bootstrap.css" /> #}
    {% block styles %} {% endblock styles %}
    {# <link rel="stylesheet" href="css/import.css"> #}

    {# <script src="js/libs/jquery.js"></script> #}
    {# <script src="js/libs/bootstrap.js"></script> #}

</head>

<body>

    {% include "partials/header.tpl" %}


    <!-- MAIN CONTENT start -->
    <div class="content-wrapper">

            {% block content %} {% endblock content %}

    </div><!-- .content-wrapper -->
    <!-- MAIN CONTENT end -->

    {% include "partials/footer.tpl" %}


    <!-- SCRIPTS -->
    {% block scripts %} {% endblock scripts %}

</body>
</html>