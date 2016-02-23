var canvas = document.getElementById('board'),
ctx = canvas.getContext('2d'),
requestId = 0, delta = 0;

var clear = document.getElementById('clear');
clear.addEventListener('click', function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	delta = 0;
	if (requestId) {
		window.cancelAnimationFrame(requestId);
	}
	requestId = 0;
});

var grd;
function draw(radius) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	grd = ctx.createRadialGradient(
		canvas.width / 2, canvas.height / 2, 1,
		canvas.width / 2, canvas.height / 2, radius
		);
	grd.addColorStop(0, "red");
	grd.addColorStop(1, "green");
	ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2*Math.PI);
	ctx.fillStyle = grd;
	ctx.fill();
}

function radius(dx) {
	return Math.min(canvas.width, canvas.height) / 4 *
		(Math.sin(dx / 1000 - Math.PI / 2) + 1);
}

function animate(time) {
	delta = time - animationStartTime;
	draw(radius(delta));
	requestId = window.requestAnimationFrame(animate);
}

var start = document.getElementById('start');
start.addEventListener('click', function() {
	animationStartTime = window.performance.now() - delta;
	requestId = window.requestAnimationFrame(animate);
});

var stop = document.getElementById('stop');
stop.addEventListener('click', function() {
	if (requestId) {
		window.cancelAnimationFrame(requestId);
	}
	requestId = 0;
});

var setViewport = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	draw(radius(delta));
};
setViewport();
window.addEventListener('resize', setViewport, false);