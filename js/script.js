// Initialize Firebase
var config = {
    apiKey: "AIzaSyCrkqwdC3qjrn68qRxmFQ_c43OlQqNaOLo",
    authDomain: "rajany-8de6d.firebaseapp.com",
    databaseURL: "https://rajany-8de6d.firebaseio.com",
    storageBucket: "rajany-8de6d.appspot.com",
    messagingSenderId: "632560628611"
};
firebase.initializeApp(config);

/*jshint jquery:true */
/*global $:true */

function logout(){
    firebase.auth().signOut().then(function() {
 		localStorage.clear();
		document.location.href = "index.html";
	}).catch(function(error) {
  		alert(error);
	});
    
}

function loadColorSchemes(){
	var container = document.getElementById('messageSchemes');
	var loader = document.getElementById('loaderSchemes');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            var html;
            var counter = 0;
            var colorPicksRef = firebase.database().ref('colorschemes/' + uid);
            colorPicksRef.on('value', function(snapshot) {
            	if (snapshot.exists()){
            		snapshot.forEach(function(child){
                        counter++;
                        var value = child.val().scheme;
                        html = '<div class="project-post">' +
                        '<img  src="'+ value +'" width="100%" height="100%" alt="">' +
                        '<div class="hover-box">' +
                        '<div class="inner-hover">' +
                        '<h2>Color Scheme</h2>' +
                        '<span>Rajany</span>' +
                        '<a href="#" id="eraseSchemeBtn'+JSON.stringify(counter)+'" class="link"><i class="fa fa-eraser"></i></a>' +
                        '<a href="'+ value +'" class="zoom"><i class="fa fa-arrows-alt"></i></a>'  +
                        '</div>'+
                        '</div>'+
                        '</div>';
                        var div = document.createElement('div');
                        div.innerHTML = html;
                        var pickContainer = document.getElementById('color-scheme-cont');
                        pickContainer.appendChild(div);
                        var eraseBtn = document.getElementById('eraseSchemeBtn'+JSON.stringify(counter));
                        $(eraseBtn).unbind().click(function() {
                            child.ref.remove();
                            document.location.href = "profile_colorbook_schemes.html";
                        });
                        loader.style.display = "none";
                        container.style.display = "none";
                    });
                }else{
                		loader.style.display = "none";
                        var msg = '<h1>You Didnt Choose Your Schemes Yet!</h1>';
                        var msgdiv = document.createElement('div');
                        msgdiv.innerHTML = msg;
                        container.appendChild(msgdiv);
                }
            });
        }else{
            var msg = '<h1>Please Login And Try Again!</h1>';
            var msgdiv = document.createElement('div');
            msgdiv.innerHTML = msg;
            container.appendChild(msgdiv);
        }
    });
}

function saveHintToDB(url){
    var modal = document.getElementById('myModal');
    var today = new Date().toString();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            modal.style.display = "block";
            var name = user.displayName;
            var email = user.email;
            var uid = user.uid;
            firebase.database().ref('colorhints/' + uid).push({
                username: name,
                email: email,
                date: today,
                hint: url
            });
            setTimeout(function(){ modal.style.display = "none"; }, 2000);
        }else{
            document.getElementById("hntStatus").innerHTML = "Please Login!"
            modal.style.display = "block";
        }
    });
}

function saveSchemeToDB(url){
    var modal = document.getElementById('myModal');
    var today = new Date().toString();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            modal.style.display = "block";
            var name = user.displayName;
            var email = user.email;
            var uid = user.uid;
            firebase.database().ref('colorschemes/' + uid).push({
                username: name,
                email: email,
                date: today,
                scheme: url
            });
            setTimeout(function(){ modal.style.display = "none"; }, 2000);
        }else{
            document.getElementById("schStatus").innerHTML = "Please Login!";
            modal.style.display = "block";
        }
    });
}

function saveIdeaToDB(url){
    var modal = document.getElementById('myModal');
    var today = new Date().toString();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            modal.style.display = "block";
            var name = user.displayName;
            var email = user.email;
            var uid = user.uid;
            firebase.database().ref('ideas/' + uid).push({
                username: name,
                email: email,
                date: today,
                idea: url
            });
            setTimeout(function(){ modal.style.display = "none"; }, 2000);
        }else{
            document.getElementById("idStatus").innerHTML = "Please Login!";
            modal.style.display = "block";
        }
    });
}


function loadIdeabook(){
	var container = document.getElementById('messageIdeas');
	var loader = document.getElementById('loaderIdeabook');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            var html;
            var counter = 0;
            var colorPicksRef = firebase.database().ref('ideas/' + uid);
            colorPicksRef.on('value', function(snapshot) {
            	if (snapshot.exists()){
            		snapshot.forEach(function(child){
                        counter++;
                        var value = child.val().idea;
                        html = '<div class="project-post">' +
                        '<img  src="'+ value +'" width="100%" height="100%" alt="">' +
                        '<div class="hover-box">' +
                        '<div class="inner-hover">' +
                        '<h2>Idea</h2>' +
                        '<span>Rajany</span>' +
                        '<a href="#" id="eraseIdeaBtn'+JSON.stringify(counter)+'" class="link"><i class="fa fa-eraser"></i></a>' +
                        '<a href="'+ value +'" class="zoom"><i class="fa fa-arrows-alt"></i></a>'  +
                        '</div>'+
                        '</div>'+
                        '</div>';
                        var div = document.createElement('div');
                        div.innerHTML = html;
                        var pickContainer = document.getElementById('idea-cont');
                        pickContainer.appendChild(div);
                        var eraseBtn = document.getElementById('eraseIdeaBtn'+JSON.stringify(counter));
                        $(eraseBtn).unbind().click(function() {
                            child.ref.remove();
                            document.location.href = "profile_ideabook.html";
                        });
                        loader.style.display = "none";
                        container.style.display = "none";
                   	 });
            	}else{
            			loader.style.display = "none";
                        var msg = '<h1>You Didnt Choose Your Ideas Yet!</h1>';
                        var msgdiv = document.createElement('div');
                        msgdiv.innerHTML = msg;
                        container.appendChild(msgdiv);
            	}
            });
        }else{
            var msg = '<h1>Please Login And Try Again!</h1>';
            var msgdiv = document.createElement('div');
            msgdiv.innerHTML = msg;
            container.appendChild(msgdiv);
        }
    });
}

function loadColorHints(){
	var container = document.getElementById('messageHints');
	var loader = document.getElementById('loaderHints');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            var html;
            var counter = 0;
            var colorPicksRef = firebase.database().ref('colorhints/' + uid);
            colorPicksRef.on('value', function(snapshot) {
                if (snapshot.exists()){
            		snapshot.forEach(function(child){
                        counter++;
                        var value = child.val().hint;
                        html = '<div class="project-post">' +
                        '<img  src="'+ value +'" width="100%" height="100%" alt="">' +
                        '<div class="hover-box">' +
                        '<div class="inner-hover">' +
                        '<h2>Color Hint</h2>' +
                        '<span>Rajany</span>' +
                        '<a href="#" id="eraseHintBtn'+JSON.stringify(counter)+'" class="link"><i class="fa fa-eraser"></i></a>' +
                        '<a href="'+ value +'" class="zoom"><i class="fa fa-arrows-alt"></i></a>'  +
                        '</div>'+
                        '</div>'+
                        '</div>';
                        var div = document.createElement('div');
                        div.innerHTML = html;
                        var pickContainer = document.getElementById('color-hints-cont');
                        pickContainer.appendChild(div);
                        var eraseBtn = document.getElementById('eraseHintBtn'+JSON.stringify(counter));
                        $(eraseBtn).unbind().click(function() {
                            child.ref.remove();
                            document.location.href = "profile_colorbook_hints.html";
                        });
                        loader.style.display = "none";
                        container.style.display = "none";
                      });
                    }else{
                    	loader.style.display = "none";
                        var msg = '<h1>You Didnt Choose Your Hints Yet!</h1>';
                        var msgdiv = document.createElement('div');
                        msgdiv.innerHTML = msg;
                        container.appendChild(msgdiv);
                    }
                });
        }else{
            var msg = '<h1>Please Login And Try Again!</h1>';
            var msgdiv = document.createElement('div');
            msgdiv.innerHTML = msg;
            container.appendChild(msgdiv);
        }
    });
}

function loadColorPicks(){
	var container = document.getElementById('messagePicks');
	var loader = document.getElementById('loaderPicks');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            var html;
            var counter = 0;
            var colorPicksRef = firebase.database().ref('colorpicks/' + uid);
            colorPicksRef.on('value', function(snapshot) {
                 if (snapshot.exists()){
            		snapshot.forEach(function(child){
                        counter++;
                        var value = child.val().color;
                        html = '<div class="project-post">' +
                        '<img width="450px" height="300px" style="background-color: '+value +'" alt="">' +
                        '<div class="hover-box">' +
                        '<div class="inner-hover">' +
                        '<h2>Color Pick</h2>' +
                        '<span>Rajany</span>' +
                        '<a href="#" id="eraseColorBtn'+JSON.stringify(counter)+'" class="link"><i class="fa fa-eraser"></i></a>' +
                        '</div>'+
                        '</div>'+
                        '</div>';
                        var div = document.createElement('div');
                        div.innerHTML = html;
                        var pickContainer = document.getElementById('color-picks-cont');
                        pickContainer.appendChild(div);
                        var eraseBtn = document.getElementById('eraseColorBtn'+JSON.stringify(counter));
                        $(eraseBtn).unbind().click(function() {
                            child.ref.remove();
                            document.location.href = "profile_colorbook_picks.html";
                        });
                        loader.style.display = "none";
                        container.style.display = "none";
                    });
                    }else{
                    	loader.style.display = "none";
                        var msg = '<h1>You Didnt Choose Your Picks Yet!</h1>';
                        var msgdiv = document.createElement('div');
                        msgdiv.innerHTML = msg;
                        container.appendChild(msgdiv);
                    }
            });
        }else{
            var msg = '<h1>Please Login And Try Again!</h1>';
            var msgdiv = document.createElement('div');
            msgdiv.innerHTML = msg;
            container.appendChild(msgdiv);
        }
    });
}

function saveColorPick(){
	var modal = document.getElementById('myModal');
    var today = new Date().toString();
    var user = firebase.auth().currentUser;
    var name, email, uid;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        uid = user.uid;
        var rgb = document.getElementById("colorpicker").style.backgroundColor;
        var hex = rgb2hex(rgb);
        firebase.database().ref('colorpicks/' + uid).push({
            username: name,
            email: email,
            date: today,
            color: hex
        });
        document.getElementById("ColorStatus").innerHTML = hex + " is Saved To Your Color Picks.";
    }else{
    	document.getElementById("pickStatus").innerHTML = "Please Login!";
        modal.style.display = "block";
    }
}

function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}



var $ = jQuery.noConflict();

$(document).ready(function($) {

	"use strict";

	/* global google: false */
	/*jshint -W018 */

    var name = localStorage.getItem("user_name");
    var email = localStorage.getItem("user_email");
    var photoUrl = localStorage.getItem("user_pic");

    if (email != "admin@rajany.com") {
        if(email == null){
            document.getElementById("login").href = "login.html";
        }else{
            document.getElementById("login").href = "profile.html";
            document.getElementById("login").innerHTML = email;
        }
    }else{
        document.getElementById("login").href = "admin_profile.html";
        document.getElementById("login").innerHTML = "Rajany ADMIN";
    }


	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

		var winDow = $(window),
			// Needed variables
			$container=$('.iso-call'),
		    $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.trigger('resize');
				$container.addClass('active');
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});
			});
		} catch(err) {
		}

		winDow.bind('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').click(function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


	var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});

	$('#container').addClass('active');
	/*-------------------------------------------------*/
	/* =  browser detect
	/*-------------------------------------------------*/
	try {
		$.browserSelector();
		// Adds window smooth scroll on chrome.
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  fullwidth carousell
	/*-------------------------------------------------*/
	try {
		var owl = $("#owl-demo").owlCarousel({
			autoPlay: 10000,
			items : 3,
			itemsDesktop : [1199,2],
			itemsDesktopSmall : [979,2]
		});

		// Custom Navigation Events
		$(".arrow-box .next").click(function(event){
			event.preventDefault();
			owl.trigger('owl.next');
		});
		$(".arrow-box .prev").click(function(event){
			event.preventDefault();
			owl.trigger('owl.prev');
		});

		var owl2 = $("#owl-demo2").owlCarousel({
			autoPlay: 10000,
			items : 5,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [979,3]
		});

		// Custom Navigation Events
		$(".arrow-box2 .next").click(function(event){
			event.preventDefault();
			owl2.trigger('owl.next');
		});
		$(".arrow-box2 .prev").click(function(event){
			event.preventDefault();
			owl2.trigger('owl.prev');
		});
	} catch(err) {

	}
	/*-------------------------------------------------*/
	/* =  Search animation
	/*-------------------------------------------------*/
	
	var searchToggle = $('.open-search'),
		inputAnime = $(".form-search"),
		body = $('body');

	searchToggle.on('click', function(event){
		event.preventDefault();

		if ( !inputAnime.hasClass('active') ) {
			inputAnime.addClass('active');
		} else {
			inputAnime.removeClass('active');			
		}
	});

	body.on('click', function(){
		inputAnime.removeClass('active');
	});

	var elemBinds = $('.open-search, .form-search');
	elemBinds.bind('click', function(e) {
		e.stopPropagation();
	});

	/* ---------------------------------------------------------------------- */
	/*	Accordion
	/* ---------------------------------------------------------------------- */
	var clickElem = $('a.accord-link');

	clickElem.on('click', function(e){
		e.preventDefault();

		var $this = $(this),
			parentCheck = $this.parents('.accord-elem'),
			accordItems = $('.accord-elem'),
			accordContent = $('.accord-content');
			
		if( !parentCheck.hasClass('active')) {

			accordContent.slideUp(400, function(){
				accordItems.removeClass('active');
			});
			parentCheck.find('.accord-content').slideDown(400, function(){
				parentCheck.addClass('active');
			});

		} else {

			accordContent.slideUp(400, function(){
				accordItems.removeClass('active');
			});

		}
	});

	/*-------------------------------------------------*/
	/* =  Animated content
	/*-------------------------------------------------*/

	try {
		/* ================ ANIMATED CONTENT ================ */
        if ($(".animated")[0]) {
            $('.animated').css('opacity', '0');
        }

        $('.triggerAnimation').waypoint(function() {
            var animation = $(this).attr('data-animate');
            $(this).css('opacity', '');
            $(this).addClass("animated " + animation);

        },
                {
                    offset: '75%',
                    triggerOnce: true
                }
        );
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  remove animation in mobile device
	/*-------------------------------------------------*/
	if ( winDow.width() < 992 ) {
		$('div.triggerAnimation').removeClass('animated');
		$('div.triggerAnimation').removeClass('triggerAnimation');
	}
	
	/*-------------------------------------------------*/
	/* = slider Testimonial
	/*-------------------------------------------------*/

	var slidertestimonial = $('.bxslider');
	try{		
		slidertestimonial.bxSlider({
			mode: 'vertical'
		});
	} catch(err) {
	}

	/* ---------------------------------------------------------------------- */
	/*	flexslider
	/* ---------------------------------------------------------------------- */

	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			slideshowSpeed: 3000,
			easing: "swing"
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		$('.zoom').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});

	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Map 2
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"-33.880641", "lon":"151.204298"}; //Change a map coordinate here!

	try {
		var mapContainer = $('#map2');
		mapContainer.gmap3({
			action: 'addMarker',
			marker:{
				options:{
					icon : new google.maps.MarkerImage('images/marker.png')
				}
			},
			latLng: [contact.lat, contact.lon],
			map:{
				center: [contact.lat, contact.lon],
				zoom: 16
				},
			},
			{action: 'setOptions', args:[{scrollwheel:false}]}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	//Quote Form
	var submitQuote = $('#submit-quote'),
		message = $('#quote-msg');

	submitQuote.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'quote.php',
			dataType: 'json',
			cache: false,
			data: $('#quote-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea').filter(':visible').val('');
					$this.parents('form').find('select').filter(':visible');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	/* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */

	(function() {

		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 50;
			document.querySelector( 'header' );
		function init() {
			window.addEventListener( 'scroll', function() {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 100 );
				}
			}, false );
		}
		
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$( 'header' ).addClass('active');
			}
			else {
				$( 'header' ).removeClass('active');
			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();
		
	})();

});

/* ---------------------------------------------------------------------- */
/*	map street view mode function
/* ---------------------------------------------------------------------- */
function initialize() {
	var bryantPark = new google.maps.LatLng(35.639543,-77.371199),
		panoramaOptions = {
		position: bryantPark,
			pov: {
				heading: 165,
				pitch: 0
			},
		zoom: 1
		},
		myPano = new google.maps.StreetViewPanorama(
		document.getElementById('map'),
		panoramaOptions);
	myPano.setVisible(true);
}

try {
	google.maps.event.addDomListener(window, 'load', initialize);
} catch(err) {

}