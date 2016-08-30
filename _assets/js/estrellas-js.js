var xmlns = "http://www.w3.org/2000/svg",
	xlinkns = "http://www.w3.org/1999/xlink";
var width  = 900,
	height = 300;
var stars    = document.getElementById("stars"),
	bursts   = document.getElementById("bursts"),
	steelers = document.getElementById("steelers");
function randomBase(min, max) { return Math.random() * (max - min) + min; }
function randomPos(max) { return Math.floor(randomBase(-50,max+50)); }
function randomAnimationDelay(max) { return Math.floor(randomBase(1,20)); }
function randomScale(min, max) { return parseFloat(randomBase(min, max).toFixed(2)); }
function randomScaleNamed(name) {
	var scale;
	switch(name) {
	case 'star': scale = randomScale(0.3, 0.5); break;
	case 'burst': scale = randomScale(0.4, 0.9); break;
	case 'steeler': scale = randomScale(1.1, 2.0); break;
	default: scale = 1.0; }
	return scale;
}
function addElement(name) {
	var p   = eval(name + 's');
		g   = document.createElementNS(xmlns, "g"),
		use = document.createElementNS(xmlns, "use"),
		gt  = 'translate(' + randomPos(width) + ',' + randomPos(height) + ') ' +
			'scale(' + randomScaleNamed(name) + ')';
		uc  = name + ' ad-' + randomAnimationDelay();
	use.setAttributeNS(null, "class", uc);
	use.setAttributeNS(xlinkns, "xlink:href", "#" + name);
	g.setAttributeNS(null, "transform", gt);
	g.appendChild(use);
	p.appendChild(g);
}
function addElements(name, count) {
	while (count -= 1) { addElement(name); }
}
function init() {
	addElements('steeler', 15);
	//addElements('burst', 7);
	//addElements('star', 25);
}
init();