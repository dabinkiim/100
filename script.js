const header = document.querySelector("header");
const main = document.querySelector("#main");
const timer = document.querySelector("#timer");
const wheel1 = document.querySelector("#wheel");
const wheel2 = document.querySelector("#symbol_wheel");
const dark = document.querySelector("#dark");

// Timer 
let time = 100000;
let sec = 100;
let rad = 0;

function count(){
	//timer
	runtimer = setInterval(function(){

		if(sec > 0){
			sec -= 1;
			timer.innerHTML = sec;
			$(document).find("h1").html(sec);	
			$(document).find("title").html(sec);		
		}
		if(sec <= 50){
			$(timer).css('color','#602613');
		}
		if(sec <= 10){
			$(timer).css('color','var(--colorB)');
		}
		if(sec===0){
			location.reload();
		}
	},1000);

	//rader
	runrader = setInterval(function(){
		rad += 1;
		$('#rader').css('transform', 'scale(3) rotate(' + rad*3.6 +'deg)' );
	},200);
}
count();




// https://docs.google.com/spreadsheets/d/1Nw3mKxtavO9l63-SAO0FauvaDBOT1wkheejf4iY6lIw/edit?usp=sharing
// Data collect
fetch('https://opensheet.vercel.app/1Nw3mKxtavO9l63-SAO0FauvaDBOT1wkheejf4iY6lIw/Work')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((row) => {
    	var name = `${row.Name}`;
    	var work = `${row.Work}`;
    	var medium = `${row.Medium}`;
    	var desc = `${row.Description}`;
    	var word100 = `${row.kr100}`;
    	var keyword = `${row.Keyword}`;
    	var imgM = `${row.Main_img}`;
    	var imgD = `${row.Det_img}`;
    	var link = `${row.Link}`;
    	var noimg = `onerror="this.style.display='none';"`;


    	var symbol_back = 'style="background-image:url(symbol/' + name + '.png);"';
    	var symbol_button = "<button data-name='" + name + "' class='" + name + "'" + symbol_back + "></button>";
    	var work_box = "<div data-name>"

    	// 서브이미지...
		function addsub(){
    		var sub_text = "";
    		var s;
    		for (s = 1; s < 8; s++){
    		sub_text += `<img src="img/${name}_${s}.png" ${noimg}>`;
    		}
    		imgDstring = sub_text;
    		console.log(sub_text);   		
    	}
    	addsub();
    	
    	//header
    	header.innerHTML += symbol_button;

    	//main
    	main.innerHTML += `
    		<div id="${name}" class="work">
		 	<div class="head">
		 		<div class="blob">${work}</div>
		 		<div class="blob">${name}</div>
		 		<div class="blob low">${medium}</div>
		 		${symbol_button}	

		 	</div>
		 	<div class="content">
		 		${imgM}
		 		<h2><a href="${link}">웹사이트 탐험하기</a></h2>
		 		<p>${desc}</p>
		 		<div id="sub" data-name="${name}">${imgDstring}</div>
		 	</div>
 		 </div>
    	`;



    	


    	//wheel 
    	wheel1.innerHTML += `<div class="word100 ${name}">${word100}</div> <li><p class="${name}" data-name="${name}">${keyword}</p></li>`;
    	wheel2.innerHTML += `<li><p class="${name}" data-name="${name}">${symbol_button}</p></li>`;

    $('button, li p').click(function(){
		var who = $(this).data('name');
		var width = $(window).width();
		console.log('click check' + who);
		// 색깔 표시하기
		$('.word100').removeClass('select');
		$('button').removeClass('select');
		$('p').removeClass('select');  
		/* $(this).addClass('select'); */
		$('.' + who).addClass('select');
		$('.head').children('button').removeClass('select');
		

		// 이동시키기 
		if (width > 900) {
			$('#rader_wheel').delay(250).css('transform', 'translateX(-35%)');
			$('#line2').animate({width :'15vw'});
		}
		
		//블럭 보여주기	
		$('#main').show();
		$('.work').css({
			'transform' : 'translateX(200%)',
			'display':'block'		
		});
		$('#' + who).css({
			'transform' : 'translateX(0%)',
			'display':'block'
		
	});
})


    })
    })


//wheel 
var nbOptions = 25; // number of menus
var angleStart = -360; // start angle


// jquery rotate animation
function rotate(li,d) {
  $({d:angleStart}).animate({d:d}, {
   step: function(now) {
    $(li)
      .css({ transform: 'rotate('+now+'deg)' })
      .find('p')
       .css({ transform: 'rotate('+(-now)+'deg)' });
   }, duration: 0
  });
}

// show / hide the options
function rotatewheel(wheel) {
	let w = 0;
	runwheel = setInterval(function(){
		w += 1;
		console.log(w);
	  var li = $(wheel).find('li');
	  var deg = $(wheel).hasClass('half') ? 180/(li.length-1) : 360/li.length;

	  for(var i=0; i<li.length; i++) {
	   var d = $(wheel).hasClass('half') ? ((i*deg)-90)+(deg*w) : i*deg+(deg*w);
	   $(wheel).hasClass('open') ? rotate(li[i],d) : rotate(li[i],angleStart);
	 }

	},2000);	
}


rotatewheel(wheel1);
rotatewheel(wheel2);



//어둠이 걷히고..
let darkhour = 0;

function lighter() {
		belight = setInterval(function(){
		if (darkhour <= 5) {
			darkhour +=1;
		}

		if (5 < darkhour < 15) {
			darkhour += 1;
			$(dark).css('background','radial-gradient(transparent 0% ' + 5*(darkhour - 1) + '%, black ' + 5*darkhour + '%');
		}
		if (darkhour === 20) {
			$(dark).hide();
		}
	},100)
}
$('#dark p').on("click" ,function() {
	lighter();
});





    	








