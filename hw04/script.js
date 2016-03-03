var svg = document.getElementById('board'),
svgNS = "http://www.w3.org/2000/svg",
intervalId = 0, delta = 0;

var clear = document.getElementById('clear');
clear.addEventListener('click', function() {
	delta = 0;
	drawCircle();
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = 0;
	}
});

function drawCircle() {
	svg.removeChild(svg.lastChild);

	var newCircle = document.createElementNS(svgNS, "circle");

	newCircle.setAttributeNS(null, "cx", svgBBox.width / 2);
	newCircle.setAttributeNS(null, "cy", svgBBox.height / 2);
	newCircle.setAttributeNS(null, "r",
		Math.min(svgBBox.width, svgBBox.height) / 4 *
		(Math.sin(delta / 1000 - Math.PI / 2) + 1)
		);
	newCircle.setAttributeNS(null, "fill", "url(#grad)");

	svg.appendChild(newCircle);
}

function animate() {
	delta = window.performance.now() - animationStartTime;
	drawCircle();
}

var start = document.getElementById('start');
start.addEventListener('click', function() {
	animationStartTime = window.performance.now() - delta;
	if (intervalId) {
		clearInterval(intervalId);
	}
	intervalId = setInterval(animate, 17); // 60 frames per second
});

var stop = document.getElementById('stop');
stop.addEventListener('click', function() {
	if (intervalId) {
		clearInterval(intervalId);
	}
	intervalId = 0;
});

var svgBBox;
function setViewport() {
	svg.setAttribute("width", window.innerWidth);
	svg.setAttribute("height", window.innerHeight);
	svgBBox = svg.getBoundingClientRect();
	drawCircle();
};
setViewport();
window.addEventListener('resize', setViewport, false);