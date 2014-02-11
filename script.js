var scrollTotal = 1000;
var scrolled = 0; // A variable to keep track of how far we've scrolled.
var fractionScrolled = scrolled / scrollTotal;


// You can read more about the mousewheel event at https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
if (document.addEventListener) {
	document.addEventListener("mousewheel", MouseWheelHandler, false);
}

var waypoints = document.getElementsByClassName('waypoint');
for (i = 0; i < waypoints.length; i++) {
	// Here we attach a handler to the click event for every waypoint,
	// https://developer.mozilla.org/en-US/docs/Web/Reference/Events/click
	waypoints[i].addEventListener("click", waypointClickHandler, false);
}

function updateWaypoints() {
	fractionScrolled = scrolled / scrollTotal;

	// 0 <= fractionScrolled <= 1, so *10 gives us 10; Math.floor rounds down
	var whichWaypoint = Math.max(0, Math.floor(fractionScrolled * 10) - 1);

	for (i = 0; i < 10; i++) {
		// Notice we constructed our li#id names to make this easy
		var currentWaypoint = document.getElementById('waypoint-' + i);
		
		if ( i == whichWaypoint ) {
			currentWaypoint.classList.add('active-waypoint');
		}
		
		else {
			currentWaypoint.classList.remove('active-waypoint');
		}
	}

	// Seek to the proportional time of the 38s clip of Bey's "Countdown"
	document.getElementById('Countdown').currentTime = fractionScrolled * 136.0;

	// adds text to top left aside when scrolled reaches 200
	var topleft = document.getElementsByClassName("left top");

	if (scrolled >= 100 && scrolled < 300){
		topleft[0].innerHTML = "Text appears";
	} 
	else {
	    topleft[0].innerHTML = " ";
	}

	// adds text to bottom left aside when scrolled reaches 400
	var bottomleft = document.getElementsByClassName("left bottom");

	if (scrolled >= 200 && scrolled < 400){
		bottomleft[0].innerHTML = "Text appears";
	} 
	else {
	    bottomleft[0].innerHTML = " ";
	}

	// adds text to top right aside when scrolled reaches 600
	var topright = document.getElementsByClassName("right top");

	if (scrolled >= 400 && scrolled < 600){
		topright[0].innerHTML = "Text appears";
	} 
	else {
	    topright[0].innerHTML = " ";
	}

	// adds text to bottom right aside when scrolled reaches 800
	var bottomright = document.getElementsByClassName("right bottom");

	if (scrolled >= 500 && scrolled < 700){
		bottomright[0].innerHTML = "Text appears";
	} 
	else {
	    bottomright[0].innerHTML = " ";
	}

	//adds text to detail section
	var detail = document.getElementById("detail");

	if (scrolled >= 700) {
		detail.innerHTML = "Text appears";
	}
	else {
		detail.innerHTML = " ";
	}
}

function waypointClickHandler(e) {
	console.log('click');
	for (i = 0; i < waypoints.length; i++) {
		if (waypoints[i] === this) {
			scrolled = (i+1)*100;
			updateWaypoints();
			console.log(scrolled);
		}
	}
}


function MouseWheelHandler(e) {
	// This function is called every time there's a mousewheelevent

	var rawScrolled = Math.max(-1, Math.min(1, e.wheelDelta));
	scrolled = Math.min(Math.max(0, scrolled - rawScrolled), scrollTotal);

	//document.getElementsByTagName('header')[0].innerHTML = scrolled;
	
	updateWaypoints();
}

//applying click to next-triangle (based on tip from http://stackoverflow.com/questions/1057416/how-to-make-div-click-able)
var next = document.getElementById('next-triangle');

next.onclick = function() {
    if (scrolled == 0) {
    	scrolled += 100
    }
	scrolled = (scrolled % scrollTotal) + 100;
	console.log("scrolled = " + scrolled);
	updateWaypoints();
	console.log(scrolled);  			
}