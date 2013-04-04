/*
# NAME: nomON.js
# AUTHOR: Evan Cohen
# DATE: September 2012
# USAGE: Powers the mighty application known as nomON
# REQUIREMENTS: Extreme hunger
*/

$(function() {
	var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|webOS)/);
	var pathname = $(location).attr('pathname');
	//Capture click/taps

	//This is app specific code
	if(pathname == '/app'){
        $('.masthead').css('height', '30px');
        $('.mini-logo').css('display', 'none');
        //Hide rest of page inicially
        $('#price, #allergies, #pay, #thanks, #review').css('display', 'none');

        $('.btn').on('click', function(){
        	var target = $(this).attr('href').substr(1);
        	console.log('Target: ' + target);
        	//hide all
        	$('#index, #price, #allergies, #pay, #thanks, #review').css('display', 'none');
        	$('.masthead').css('height', '55px');
    		$('.mini-logo').css('display', 'inline-block');
        	$('#'+target).css('display', 'block');
        	return false;
        });

        $('.mini-logo a').on('click', function(){
    		$('#price, #allergies, #pay, #thanks, #review').css('display', 'none');
    		$('.masthead').css('height', '30px');
    		$('.mini-logo').css('display', 'none');
    		$('#index').css('display', 'block');
    		return false;
        });

    }else{
    	//Non App Code
    	$("a").on('click', function (event) {
			if($(this).attr("target") != "_blank"){
			    event.preventDefault();
			    window.location = $(this).attr("href");
		    }
		});
    }

    //Genaric Cross app/web code

	$('#location').on('click', function(){
		navigator.geolocation.getCurrentPosition(getLocation, getLocationFail, {enableHighAccuracy: true});
    });

    if(pathname != '/' && pathname != '/test' && pathname != "/app"){
        $('.masthead').css('height', '55px');
        $('.mini-logo').css('display', 'inline-block');
    }

    function getLocation(location){
    	$.get(geoURL(location)).done(function(data) { 
			$('#address').val(data.results[0].formatted_address);
		}).fail(function(){ alert('Could not find your location.');});
    }

    function getLocationFail(location){
    	alert('Could not find you! Make sure location services are enabled for nomON.');
    }

    function geoURL(location){
    	return 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+
				location.coords.latitude+','+location.coords.longitude+
				'&sensor='+((isMobile) ? 'true' : 'false');
    }

    resizeTitle();
    $(window).resize(function() {
  		resizeTitle();
	});

	function resizeTitle(){
		size = window.innerWidth/6;
		fontSize = (size > 82) ? 82 + 'px':  size + 'px';
		$('h1.title-front').css('font-size', fontSize);
	}
 

});