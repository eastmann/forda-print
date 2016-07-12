<!-- index.tpl -->

{% extends "layout.tpl" %}

{% block title %}
    <title>Главная</title>
{% endblock title %}

{% block content %}
	    <!-- >> CATALOG MENU -->
		<nav class="catalog-menu"  data-ui-component="main-catalog-menu">
		    <ul class="catalog-menu__list">
		        <li class="[ catalog-menu__item  catalog-menu__item--inc ]">
		            <a class="catalog-menu__title" href="#inc" data-scroll>Чернила</a>
		        </li>
		        <li class="[ catalog-menu__item  catalog-menu__item--equipment ]">
		            <a class="catalog-menu__title" href="#equipment" data-scroll>Оборудование</a>
		        </li>
		        <li class="[ catalog-menu__item  catalog-menu__item--materials ]">
		            <a class="catalog-menu__title" href="#materials" data-scroll>Материалы</a>
		        </li>
		        <li class="[ catalog-menu__item  catalog-menu__item--service ]">
		            <a class="catalog-menu__title" href="#about" data-scroll>Сервис</a>
		        </li>
		    </ul>
		</nav><!-- .catalog-menu -->
		<!-- << CATALOG MENU -->
{% endblock content %}

{% block scripts %}

    <script>

        $(document).ready(function() {

            // console.log("*** index script loaded ***");


        });  // end ready()

    </script>

 {% endblock scripts %}
