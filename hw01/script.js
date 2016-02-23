var canvas = document.getElementById('board'),
ctx = canvas.getContext('2d'),
points = new Array();

var clear = document.getElementById('clear');
clear.addEventListener('click', function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	points = new Array();
});

var x, y, i, grd;
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (points.length > 0) {
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (i = 1; i < points.length; i++) {
			ctx.lineTo(points[i].x, points[i].y);
		}
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 5;
		ctx.stroke();
		for (i = 0; i < points.length; i++) {
			x = points[i].x;
			y = points[i].y;
			ctx.beginPath();
			grd = ctx.createRadialGradient(x, y, 1, x, y, 30);
			grd.addColorStop(0, "red");
			grd.addColorStop(1, "green");
			ctx.arc(x, y, 30, 0, 2*Math.PI);
			ctx.fillStyle = grd;
			ctx.fill();
		}
	}
}

var rect;
var setViewport = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	rect = canvas.getBoundingClientRect();
	draw();
};
setViewport();
window.addEventListener('resize', setViewport, false);

canvas.addEventListener('click', function(e) {
	points.push({
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	});
	draw();
});