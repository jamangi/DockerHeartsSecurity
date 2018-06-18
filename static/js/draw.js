// functions
function findPoint(pixelmap, i, j){
		// finds the index of position x, y on the pixel map
		return {x: j * pixelmap.ratiox, y: i * pixelmap.ratioy}
	}


//home
let dir = 'static/lockusprites/';

let mapkeydemo = {t: undefined, h: undefined, w: undefined}

const R = 0, L = 1, U = 2, D = 3; 
let char = 'Zack'
let chargirl = 'Zoe'
let charalien = 'alien'

const poses = ['Right', 'Left', 'Back', 'Front'];
let bg = 0;
let cw = 3000
let ch = 3000
let m = 
	[
		['t', 't', 't', 't', 't'],
		['t', 'h', 't', 't', 't'],
		['s', 'h', 't', 't', 't']
	]
let pixelmapdemo = {
	map: m,
	canvaswidth: cw,
	canvasheight: ch,
	ratiox: cw / m.length,
	ratioy: cy / m[0].length
}

function preload() {
	for (let i = 0; i < 3; i++){
		home.directions[R][i] = loadImage(dir + char + poses[R] + i + '.png')
		home.directions[L][i] = loadImage(dir + char + poses[L] + i + '.png')
		home.directions[U][i] = loadImage(dir + char + poses[U] + i + '.png')
		home.directions[D][i] = loadImage(dir + char + poses[D] + i + '.png')

		home.dirgirl[R][i] = loadImage(dir + chargirl + poses[R] + i + '.png')
		home.dirgirl[L][i] = loadImage(dir + chargirl + poses[L] + i + '.png')
		home.dirgirl[U][i] = loadImage(dir + chargirl + poses[U] + i + '.png')
		home.dirgirl[D][i] = loadImage(dir + chargirl + poses[D] + i + '.png')
			
		home.diralien[R][i] = loadImage(dir + charalien + poses[R] + i + '.png')
		home.diralien[L][i] = loadImage(dir + charalien + poses[L] + i + '.png')
		home.diralien[U][i] = loadImage(dir + charalien + poses[U] + i + '.png')
		home.diralien[D][i] = loadImage(dir + charalien + poses[D] + i + '.png')

		home.directionsalt[R][i] = loadImage(dir + 'snake' + poses[R] + i + '.png')
		home.directionsalt[L][i] = loadImage(dir + 'snake' + poses[L] + i + '.png')
		home.directionsalt[U][i] = loadImage(dir + 'snake' + poses[U] + i + '.png')
		home.directionsalt[D][i] = loadImage(dir + 'snake' + poses[D] + i + '.png')
	}

	mapkeydemo['t'] = loadImage(dir + 'grasstile.png')
	mapkeydemo['h'] = loadImage(dir + 'treetile.png')
	mapkeydemo['w'] = loadImage(dir + 'watertile.png')
	mapkeydemo['s'] = loadImage(dir + 'grasstile.png')
}

function setup(){
	let canvaswidth = pixelmapdemo.canvaswidth
	let canvasheight = pixelmapdemo.canvasheight
	home.pixelmap = pixelmapdemo
	console.log(home.pixelmap)
	let canvas = createCanvas(canvaswidth, canvasheight)
	canvas.parent('canvasdiv')
	//uinterface.canvasdiv.appendChild(canvas)
	background(bg)
}

function draw(){
	background(bg);
	stroke(0);
	fill(150);
	let pixelmap = home.pixelmap
	let map 	 = pixelmap.map

	for (let row = 0; row < map.length; row++)
		for (let col = 0; col < map[row].length; col++)
		{
			let tilepoint = findPoint(pixelmap, row, col)
			let imgheight = pixelmap.canvasheight / map.length
			let imgwidth = pixelmap.canvaswidth / map[row].length
			image(mapkeydemo[map[row][col]], tilepoint['x'], tilepoint['y'], imgwidth, imgheight)
		}

	for (let [key, value] of Object.entries(home.files)){
		if(home.selectedfile !== undefined && home.selectedfile === value)
			stroke(255)
		else stroke(0)
		rect(value.x, value.y, 10, 15);
	}
	let oListCopy = home.othersList.slice();
	for (let pid of oListCopy){
		let player = home.others[pid];
		player.update();
		player.timer += 1;
		let img = player.image;
		let x = player.x;
		let y = player.y;
		image(img, x, y);
		home.deleteOther(player);
		room.roomcanvas.scroll()
	}
}