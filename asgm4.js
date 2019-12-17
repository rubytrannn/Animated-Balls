var canvas;
var ctx;
var w = 650;
var h = 650;
var allData = []; 
var clicked = 0;

setUpCanvas();
createData(30);
animationLoop(); 

function animationLoop(){
	clear(); 
	drawAllData(); 
	requestAnimationFrame(animationLoop)
}

function drawAllData(){
	for(var i = 0; i<allData.length; i++){
		drawCircle(allData[i]); 
		move(allData[i]); 
		bounce(allData[i]); 
		detectCollision(allData[i]);
	}
}


canvas.onclick = changeColour;

function changeColour(event){
	for(var i=0; i<50; i++){ 
		console.log(clicked);
		if(clicked%2 == 0){
			location.reload();
		}
	}
	clicked++;
}


function detectCollision(o){
	for(var i=0; i<allData.length; i++){
		if(o != allData[i]){
		if(o.x+o.r > allData[i].x-allData[i].r || o.x-o.r/2 < allData[i].x+allData[i].r/2){
			o.dx*= -1; allData[i].dx *= -1; 
			o.dy*= -1; allData[i].dy *= -1
		} 
	}
	
	}
}

function bounce(o){
	if(o.x+o.r > w || o.x - o.r <0 ){o.dx *= -1}; 
	if(o.y+o.r > h || o.y-o.r < 0 ){o.dy *= -1}
}
function move(o){
	o.x += o.dx; 
	o.y += o.dy; 
}
function createData(num){
	var dx, dy; 
	for(var i = 0; i<num; i++){
		if(i % 2 == 0){ dy = dx = 0 } 
			else{ dy = dx = 0}
		allData.push({
			"x": rand(w), 
			"y": rand(h), 
			"dy": 10, 
			"dx": 10, 
			"r": 35, 
			"c": rand(250)
		}); 
		}
}



function clear(){
	ctx.clearRect(0,0,w,h); 
}

function randi(num){
	var result = Math.floor(Math.random()*num); 
	return result
}

function rand(num){
	var result = Math.random()*num;
	return result 
}
function drawCircle(o){
	ctx.beginPath(); 
	ctx.arc(o.x,o.y,o.r,0,2*Math.PI);
	ctx.fillStyle = "hsla("+o.c+",100%,50%,0.5)";
	ctx.fill(); 
}

function setUpCanvas(){
	canvas = document.querySelector("#myCanvas"); 
	ctx = canvas.getContext("2d"); 
	canvas.width = w; 
	canvas.height = h; 
	canvas.style.border = "10px solid purple"; 
}
