var canvas = document.getElementById('board'),
ctx = canvas.getContext('2d'),
logo = document.getElementById('logo'),
x = 0, y = 0, dx = 3, dy = 3,
visible = false,
requestId = 0;

var clear = document.getElementById('clear');
clear.addEventListener('click', function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	x = y = 0;
	dx = dy = 3;
	visible = false;
	if (requestId) {
		window.cancelAnimationFrame(requestId);
	}
	requestId = 0;
});

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(logo, x, y, 214, 115);
	if (x > canvas.width - logo.width || x < 0) {
		dx *= -1;
	}
	if (y > canvas.height - logo.height || y < 0) {
		dy *= -1;
	}
	x += dx;
	y += dy;
	requestId = window.requestAnimationFrame(animate);
}

var start = document.getElementById('start');
start.addEventListener('click', function() {
	visible = true;
	if (requestId) {
		window.cancelAnimationFrame(requestId);
	}
	requestId = window.requestAnimationFrame(animate);
});

var stop = document.getElementById('stop');
stop.addEventListener('click', function() {
	if (requestId) {
		window.cancelAnimationFrame(requestId);
	}
	requestId = 0;
});

function setViewport() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	if (visible) {
		if (x > canvas.width - logo.width) {
			x = Math.max(canvas.width - logo.width, 0);
		}
		if (y > canvas.height - logo.height) {
			y = Math.max(canvas.height - logo.height, 0);
		}
		ctx.drawImage(logo, x, y, 214, 115);
	}
};
setViewport();
window.addEventListener('resize', setViewport, false);