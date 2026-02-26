let x = 0
let y = 0
document.addEventListener("mousemove", e=>{
	x= (e.clientX -window.innerWidth /2) *-0.01
	y = (e.clientY - window.innerHeight / 2) * -0.01;

})

function animate(){
	document.documentElement.style.setProperty("--move-x", `${x}deg`);
	document.documentElement.style.setProperty("--move-y", `${y}deg`);
	requestAnimationFrame(animate);
}

animate()
