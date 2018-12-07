//button function wraper on this part and have a button to save the elements
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var weather_div = document.getElementById("weather_div");

if (weather_div){
  dragElement(weather_div)
}

var searchbar_div = document.getElementById("searchbar_div");

if (searchbar_div){
  dragElement(searchbar_div)
}

var clock_div = document.getElementById("clock_div");

if (clock_div){
  dragElement(clock_div)
}


// dragElement(document.getElementById("weather_div"));
//
// dragElement(document.getElementById("searchbar_div"));
//
// dragElement(document.getElementById("clock_div"));

//button
  $(".button2").click(function(){
        console.log(document.getElementById("weather_div").style.top)
        console.log(document.getElementById("searchbar_div").style.left)
        console.log(document.getElementById("searchbar_div").style.top)
        console.log(document.getElementById("clock_div").style.left)
        console.log(document.getElementById("clock_div").style.top)
        console.log(document.getElementById("clock_div").style.left)

    });

function myFunction() {
    document.getElementById("background").style.backgroundImage = "url('demo.gif')";
}


//searchbar
var focused = 1; // It's global so I can save it and then use it when I quit the search bar.

window.onfocus = function(){document.getElementById(focused).focus();}; // Focus at start and when window is focused again.

window.onclick = function(e){
	if ( document.activeElement.id != "search" ) {
		document.getElementById(focused).focus();
	}
};

document.getElementById("search").onblur = function(){ // Unfocusing search bar
	document.getElementById(focused).focus();
	document.getElementById("escape").style.opacity = 0;
	document.getElementById("blackout").style.opacity = 0;
	document.getElementById("blackout").style.pointerEvents = "none";
	document.getElementById("liveClock").style.color = '';
	document.getElementById("search").value = '';
};
document.getElementById("search").onfocus = function(){ // Focusing search bar
	document.getElementById("escape").style.opacity = .7;
	document.getElementById("blackout").style.opacity = .3;
	document.getElementById("blackout").style.pointerEvents = "all";
	document.getElementById("liveClock").style.color = "#60B48A";
};

// function helpToggle(){ // Toggle instructions opacity to show/hide
// 	if ( document.getElementById("instructions").style.opacity < .9 ) {
// 		document.getElementById("instructions").style.opacity = .9;
// 		document.getElementById("instructionsToggle").style.opacity = 1;
// 	} else {
// 		document.getElementById("instructions").style.opacity = 0;
// 		document.getElementById("instructionsToggle").style.opacity = '';
// 	}
// };

document.onkeydown = function(e) {

	var key = e.keyCode;

	if ( document.activeElement.id == "search" ) { // If search bar and key [ESC], go back to blocks.
		if ( key == 27 ) {
			document.getElementById("search").value = '';
			document.activeElement.blur();
			document.getElementById(focused).focus();
		}
		return;
	};

	if (!document.activeElement.id) {
		// Keys for help and search still working even if no block selected, if it's another key, then select last block.
		if ( key == 32 ) { // Key space, focus search bar and show [ESP] instruction.
			document.getElementById("search").focus();
		} else if ( key == 72 ) { // H key, toggle instructions.
			helpToggle();
		} else {
			document.getElementById(focused).focus();
		}
		return;
	};

		/*	Mapped keys:    [ESC]               <---- Go back to blocks
		 *                        [w/^]
		 *                  [a/<] [s/v] [d/>]   <---- Move between blocks
		 *                  [     space     ]   <---- Focus search
		 *
		 * (Yes I use arrow keys in vim whats the problem ;-; I'll maybe add hjkl later)
		 */

	var result = null;

	if ( key == 32 ) { // Key space, focus search bar and show [ESP] instruction.
		result = "search"
	} else if ( key == 72 ) { // H key, toggle instructions.
		helpToggle();
	} else if ( key == 38 || key == 87) { // Up key, go back 4 blocks (the one above).
		result = parseInt(focused) - 4;
		focused = parseInt(focused) - 4;
		if (result < 1) {
			result += 8;
			focused += 8;
		}
		result = !isNaN(document.activeElement.id) ? result : focused;
	} else if ( key == 40 || key == 83 ) { // Down key, go forward 4 blocks (the one below).
		result = parseInt(focused) + 4;
		focused = parseInt(focused) + 4;
		if (result > 8) {
			result -= 8;
			focused -= 8;
		}
		result = !isNaN(document.activeElement.id) ? result : focused;
	} else if ( key == 39 || key == 68 ) { // Right key, go forward 1 block or reset row if end.
		result = focused == 4 ? parseInt(focused) - 3 : parseInt(focused) + 1;
		focused = focused == 4 ? parseInt(focused) - 3 : parseInt(focused) + 1;
		if (result > 8) {
			result -= 4;
			focused -= 4;
		}
		result = !isNaN(document.activeElement.id) ? result : focused;
	} else if ( key == 37 || key == 65 ) { // left key, go back 1 block or reset row if end.
		result = focused == 5 ? parseInt(focused) + 3 : parseInt(focused) - 1;
		focused = focused == 5 ? parseInt(focused) + 3 : parseInt(focused) - 1;
		if (result < 1) {
			result += 4;
			focused += 4;
		}
		result = !isNaN(document.activeElement.id) ? result : focused;
	}
	if (result) {
		document.getElementById(String(result)).focus();
	}
};

// clock
var span = document.getElementById('time');

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  span.textContent = h + ":" + m + ":" + s;

};
  setInterval(time, 1000)
})
