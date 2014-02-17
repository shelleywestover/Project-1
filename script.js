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
	var whichWaypoint
	 = Math.max(0, Math.floor(fractionScrolled * 10) - 1);

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
	// I am pretty sure this is the line that advances your video
	document.getElementById('Countdown').currentTime = fractionScrolled * 136.0;

	// adds text to top left aside when scrolled reaches 200
	var topleft = document.getElementsByClassName("left top");

	if (scrolled >= 200 && scrolled < 400){
		topleft[0].innerHTML = "Text appears";
		topleft[0].setAttribute('style','background-color: #CCC;');
	} 
	else {
	    topleft[0].innerHTML = " ";
	    topleft[0].setAttribute('style','background-color: gray;');
	}

	// adds text to bottom left aside when scrolled reaches 300
	var bottomleft = document.getElementsByClassName("left bottom");

	if (scrolled >= 300 && scrolled < 500){
		bottomleft[0].innerHTML = "Text appears";
		bottomleft[0].setAttribute('style','background-color: #CCC;');

	} 
	else {
	    bottomleft[0].innerHTML = " ";
	    bottomleft[0].setAttribute('style','background-color: gray;');
	}

	// adds text to top right aside when scrolled reaches 500
	var topright = document.getElementsByClassName("right top");

	if (scrolled >= 500 && scrolled < 700){
		topright[0].innerHTML = "Text appears";
		topright[0].setAttribute('style','background-color: #555;');

	} 
	else {
	    topright[0].innerHTML = " ";
	    topright[0].setAttribute('style','background-color: gray;');
	}

	// adds text to bottom right aside when scrolled reaches 600
	var bottomright = document.getElementsByClassName("right bottom");

	if (scrolled >= 600 && scrolled < 800){
		bottomright[0].innerHTML = "Text appears";
		bottomright[0].setAttribute('style','background-color: #555;');
	} 
	else {
	    bottomright[0].innerHTML = " ";
	    bottomright[0].setAttribute('style','background-color: gray;');
	}

/*	//adds text to detail section when scrolled reaches 800
	var detail = document.getElementById("detail");

	if (scrolled < 800) {
		detail.innerHTML = " ";
	    detail.setAttribute('style','background-color: gray;');
	}
	else {
		detail.innerHTML = "Text appears";
		detail.setAttribute('style','background-color: #AAA;');

	}	*/
}

function waypointClickHandler(e) {
	console.log('click');
	var current = scrolled
    console.log("current = " + current);

	for (i = 0; i < waypoints.length; i++) {
		if (waypoints[i] === this) {
			scrolled = (i+1)*100;
			updateWaypoints();
			document.getElementsByTagName('header')[0].innerHTML = scrolled;

			console.log(scrolled);
		}
	}
   var next = this //Math.ceil(((scrolled % scrollTotal) + 100)/100) * 100;
	console.log("next = " + next);
	
	//add delay to for look (http://stackoverflow.com/questions/10058753/how-to-create-pause-or-delay-in-for-loop)
	if (next > current) {
		for (var i = current; i < next; i++) {
			console.log("before")
			scrolled += 1;
			window.setTimeout(function(){
				updateWaypoints();
				}, 1000);
			console.log("after")    
			console.log("scrolled =" + scrolled)
		}
	}
	/*if (next < current) {
		for (var i = next; i < current; i++) {
				console.log("before")
				scrolled -= 1;
				window.setTimeout(function(){
					updateWaypoints();
					}, 1000);
				console.log("after")    
				console.log("scrolled =" + scrolled)
			}
	}*/
		
}


function MouseWheelHandler(e) {
	// This function is called every time there's a mousewheelevent

	var rawScrolled = Math.max(-1, Math.min(1, e.wheelDelta));
	scrolled = Math.min(Math.max(0, scrolled - rawScrolled), scrollTotal);

	document.getElementsByTagName('header')[0].innerHTML = scrolled;
	
	updateWaypoints();
}

//applying click to next-triangle (based on tip from http://stackoverflow.com/questions/1057416/how-to-make-div-click-able)
var next = document.getElementById('next-triangle');

next.onclick = function() {
    if (scrolled == 0) {
    	scrolled += 100;
    }
    scrolled = Math.ceil(((scrolled % scrollTotal) + 100)/100) * 100;
	
	/* A colleague and I were experimenting with different ways of advancing the video. We weren't successful, but I am keeping the below code and comments as a reference so that we can try again at a later date.

	// this is how i would try to implement this, put the following in a loop that keeps updating
	// gets the video element, checks where the playback is at in Milliseconds (converted to frames by multiplying).  Checks if the current frame is == to the frame at which you should stop. (stoppingPoint is made up, psuedocode by me)
	// for example, for chapter 1->2
	// first play the video
	document.getElementById('Countdown').play(); //from chapter 1)
	// now in a loop, check if we're past the next chapter (13.6 secs per chapter)
	if (document.getElementById('Countdown').currentTime  * 1000 >= 13.6 * nextChapter) // you're checking to see if the video has played past the chapter you want to stop at
	{
		// if we are past or at the next chapter, pause the video
		document.getElementById('Countdown').pause(); // double check actual control
	} */

	updateWaypoints();
	console.log("scrolled = " + scrolled)
}