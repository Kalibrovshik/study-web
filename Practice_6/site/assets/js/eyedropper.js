var selectedColor = 'FFFFFF';
var colhue = 0;
var colsat = 0;
var colval = 0;
var colr = 0;
var colg = 0;
var colb = 0;
var colc = 0;
var colm = 0;
var coly = 0;
var colk = 0;
var betoltodott = 0;
var thistile = "-";
var olvashato = "FFFFFF";
var nem  = "FFFFFF";	
window.classifier = new ColorClassifier();
get_dataset('dataset.js', function (data){
    window.classifier.learn(data);
});
function updateOlvashatoszin() {
	olvashato = $('#myColor').css("color");
	//console.log(olvashato);
	$('.szinneve, .saveOrLink a').css('background',olvashato);
	$('.activeMenuItem, .szinInfok input, h3').css('color',olvashato);

	if (olvashato == "rgb(255, 255, 255)") {
		$('.saveOrLink a').css('color','#000');
	} else {
		$('.saveOrLink a').css('color','#FFF');
	}
}
function nameToFileName(x) {
	x = x.replace(" ", "-");
	x = x.replace(" ", "-");
	x = x.replace(" ", "-");
	x = x.replace(" ", "-");
	x = x.replace(" ", "-");
	x = x.replace(" ", "-");
	x = x.replace("(", "-");
	x = x.replace(")", "");
	x = x.replace("(", "-");
	x = x.replace(")", "");
	x = x.replace("/", "");	
	x = x.replace("--", "-");
	x = x.replace("--", "-");
	x = x.toLowerCase();
	return x;
}
function updateColor(color) {
	//console.log('updateColor');
	color == color.toString().toUpperCase();	
	thistile = $("#pageHeading").text();
	selectedColor = document.getElementById('myColor').value;
	var szinnev = '';
	szinnev = window.classifier.classify("#"+selectedColor);	
	$("#wrapImage").html("<img alt='" + szinnev + "' src='/color/images/" + nameToFileName(szinnev) + ".jpg' />");
	$("#wrapImage").css("opacity",0.05);
	setTimeout(function(){ 
		$( "#wrapImage" ).animate({
				opacity: 1
		}, 500, function() {
		});
	}, 200);	
	colr = parseInt((selectedColor.charAt(0)+selectedColor.charAt(1)).toString(16), 16);
	colg = parseInt((selectedColor.charAt(2)+selectedColor.charAt(3)).toString(16), 16);
	colb = parseInt((selectedColor.charAt(4)+selectedColor.charAt(5)).toString(16), 16);	
	rgb2cmyk(colr,colg,colb);
	var komplimentarisa = invertColor(selectedColor);
	var popul = "";	
	olvashato = $('#myColor').css("color");  //feher vagy fekete, amelyk jobban latszik a hatteren
	$("#menuToggle").html('<span style="color: #' + color + ';background-color: '+ olvashato + '">&equiv;</span>');
	document.getElementById('selectedbackgr').innerHTML = '<div class="szinInfok" style="color: '+ olvashato + '"><h2 class="szinneve" style="color: #' + color + ';background-color: '+ olvashato + '">' + szinnev + '</h2><div class="saveOrLink"><a id="addToPalette" style="color:#'+ color + ';background-color:'+ olvashato + '" onClick = "addtopalette();" title="Add to palette">Save</a><a style="color:#'+ color + ';background-color:'+ olvashato + '" class="colorLink" href="http://rgbcolorcode.com/color/' + selectedColor + '" title="Open on new page">Open</a></div><input id="clickableRGBinput" type="text" class="click2copy" /><input id="clickableRGB2input" type="text" class="click2copy" /><input id="clickableRGB3input" type="text" class="click2copy" /><input id="clickableCMYKinput" type="text" class="click2copy" /><input id="clickableHSVinput" type="text" class="click2copy" /></div>';	
	document.getElementById("clickableRGBinput").value = "#" + color;
	document.getElementById("clickableRGB2input").value = 'rgb(' + colr + ',' + colg + ',' + colb + ')';
	document.getElementById("clickableRGB3input").value = 'rgb(' + (colr/255).toFixed(2) + ',' + (colg/255).toFixed(2) + ',' + (colb/255).toFixed(2) + ')';
	document.getElementById("clickableCMYKinput").value = 'CMYK( ' + colc + ', ' + colm + ', ' + coly + ', ' + colk + ')';
	document.getElementById("clickableHSVinput").value = 'Hue: ' + colhue +', Saturation: '+ colsat + ', Value: ' + colval;
	$("#selectedbackgr input").css("color",olvashato);
	
	$(".click2copy").click(function() {		// copy to clipboard
		$(this).select();
		document.execCommand("copy");
		
		$("#pageHeading").html('<span class="alignCenter">Copied</span>');
		setTimeout(function(){ 
			$("#pageHeading span").fadeOut(500);
		}, 1500);
		setTimeout(function(){ 
			$("#pageHeading").html(thistile);
		}, 2000);		
	});
	document.getElementById('selectedbackgr').style.backgroundColor = '#'+color;
	
	$("a.activeMenuItem, a.activeMenuItem:hover, a.activeMenuItem:visited").css("background-color", '#'+color);
	$("a.activeMenuItem, a.activeMenuItem:hover, a.activeMenuItem:visited").css("color", olvashato);
	$(".navigation").css("border-color", '#'+color);	
	
	$(".csspage, #headerImage").css("background-color", '#'+color);	
	
	$("h3").css("background-color", '#'+color);
	$("#colorToUse>div").css("border-top", '3px solid #'+color);
	$("#savedCodes").css("border-top", '3px solid #'+color);
	$("#savedCodes").css("border-bottom", '3px solid #'+color);
	$("h3").css("color", '#'+ olvashato);
    $( "#red" ).slider( "value", colr );
    $( "#green" ).slider( "value", colg );
    $( "#blue" ).slider( "value", colb );
    $( "#slideh" ).slider( "value", colhue );
    $( "#slides" ).slider( "value", colsat );
    $( "#slidev" ).slider( "value", colval );
    $( "#cyan" ).slider( "value", colc*100 );
    $( "#magenta" ).slider( "value", colm*100 );
    $( "#yellow" ).slider( "value", coly*100 );
    $( "#key" ).slider( "value", colk*100 );	
	
	document.getElementById('komplimentaris').innerHTML = '<div class="ezaszin" style="background-color: #' + selectedColor + ';"><input onClick="this.select();" value=#' + selectedColor + ' /> </div><div class="komplimentarisa" style="background-color: #' + komplimentarisa + ';"><div onclick="aplikal(\''+komplimentarisa+'\');" class="aplikalo" title="Set Active"></div><input onClick="this.select();" value=#' + komplimentarisa + ' /> </div>';	
	
	document.getElementById('colorToUse').innerHTML = '<div class="demo1">\n<div class="inputKontener">\n<input onClick="this.select();" value="color:#' + selectedColor + ';" />\n</div>\n<div class="explanation1" style="background-color: '+ olvashato + ';">\n<span style="color:#' + selectedColor + '">Color of the text</span>\n</div>\n</div>\n<div class="demo2">\n<div class="inputKontener">\n<input onClick="this.select();" value="background-color:#' + selectedColor + ';" />\n</div>\n<div class="explanation2" style="background-color: #' + selectedColor + '; color: '+ olvashato + ';">\nBackground color \n</div>\n</div>\n<div class="demo3">\n<div class="inputKontener">\n<input onClick="this.select();" value="border: 3px solid #' + selectedColor + ';"/ >\n</div>\n<div class="explanation3" style="border: 3px solid #' + selectedColor + '">\nBox border\n</div>\n</div>\n<div class="demo4">\n<div class="inputKontener">\n<input onClick="this.select();" value="text-shadow: 1px 2px 2px #' + selectedColor + ';" / >\n</div>\n<div class="explanation4" style="text-shadow: 1px 2px 2px #' + selectedColor + ';">\nText shadow\n</div>\n</div>\n<div class="demo5">\n<div class="inputKontener">\n<input onClick="this.select();" value="box-shadow: 2px 2px 7px 1px #' + selectedColor + ';" / >\n</div>\n<div class="explanation5" style="  box-shadow: 2px 2px 7px 1px #' + selectedColor + ';">\nBox shadow\n</div>\n</div>';
	
	updateOlvashatoszin();
}
function aplikal(szin) {
	document.getElementById('myColor').value = szin;
	document.getElementById('myColor').color.fromString(szin);
	updateColor(szin);
}
function addtopalette() {
	document.getElementById('savedCodes').innerHTML = document.getElementById('savedCodes').innerHTML + '<div class="savedPalette" style="background-color:#' + selectedColor +'"><div onclick="aplikal(\''+selectedColor+'\');" class="aplikalo" title="Set Active"></div><input onClick="this.select();" value=#' + selectedColor + ' /> </div>';
	$("#savedCodes").fadeIn(400);
}
function rgbchanged() {
	var newvalue = (Math.round(255 * document.getElementById('colorr').value)).toString(16);
	newvalue = newvalue + (Math.round(255 * document.getElementById('colorg').value)).toString(16);
	newvalue = newvalue + (Math.round(255 * document.getElementById('colorb').value)).toString(16);	
	
	document.getElementById('myColor').color.fromString(newvalue);
}

function invertColor(hex) {
    thisrgb = new Object();
    thisrgb.r = parseInt( hex.substring(0, 2), 16);;
    thisrgb.g = parseInt( hex.substring(2, 4), 16);;
    thisrgb.b = parseInt( hex.substring(4, 6), 16);;
 
    // complement
    temprgb=thisrgb;
    temphsv=RGB2HSV(temprgb);
    temphsv.hue=HueShift(temphsv.hue,180.0);
    temprgb=HSV2RGB(temphsv);
    
    hex_out = "rgb(" + temprgb.r + "," + temprgb.g + "," + temprgb.b + ")";
	hex_out = ketjegyu(temprgb.r).toString(16) + ketjegyu(temprgb.g).toString(16) + ketjegyu(temprgb.b).toString(16);
	hex_out = hex_out.toUpperCase();
	return hex_out;
}

function RGB2HSV(rgb) {
    hsv = new Object();
    max=max3(rgb.r,rgb.g,rgb.b);
    dif=max-min3(rgb.r,rgb.g,rgb.b);
    hsv.saturation=(max==0.0)?0:(100*dif/max);
    if (hsv.saturation==0) hsv.hue=0;
    else if (rgb.r==max) hsv.hue=60.0*(rgb.g-rgb.b)/dif;
    else if (rgb.g==max) hsv.hue=120.0+60.0*(rgb.b-rgb.r)/dif;
    else if (rgb.b==max) hsv.hue=240.0+60.0*(rgb.r-rgb.g)/dif;
    if (hsv.hue<0.0) hsv.hue+=360.0;
    hsv.value=Math.round(max*100/255);
    hsv.hue=Math.round(hsv.hue);
    hsv.saturation=Math.round(hsv.saturation);
	colhue = hsv.hue;
	colsat = hsv.saturation;
	colval = hsv.value;
    return hsv;
}

function CMYK2RGB(C,M,Y,K){	
	var c = C / 100;
	var m = M / 100;
	var y = Y / 100;
	var k = K / 100;
	var r = 1 - Math.min( 1, c * ( 1 - k ) + k );
	var g = 1 - Math.min( 1, m * ( 1 - k ) + k );
	var b = 1 - Math.min( 1, y * ( 1 - k ) + k );
	r = Math.round( r * 255 );
	g = Math.round( g * 255 );
	b = Math.round( b * 255 );
	return rgb2hex(r,g,b);
}
function HSV2RGB(hsv) {
	var rgb=new Object();
    if (hsv.saturation==0) {
        rgb.r=rgb.g=rgb.b=Math.round(hsv.value*2.55);
    } else {
        hsv.hue/=60;
        hsv.saturation/=100;
        hsv.value/=100;
        i=Math.floor(hsv.hue);
        f=hsv.hue-i;
        p=hsv.value*(1-hsv.saturation);
        q=hsv.value*(1-hsv.saturation*f);
        t=hsv.value*(1-hsv.saturation*(1-f));
        switch(i) {
        case 0: rgb.r=hsv.value; rgb.g=t; rgb.b=p; break;
        case 1: rgb.r=q; rgb.g=hsv.value; rgb.b=p; break;
        case 2: rgb.r=p; rgb.g=hsv.value; rgb.b=t; break;
        case 3: rgb.r=p; rgb.g=q; rgb.b=hsv.value; break;
        case 4: rgb.r=t; rgb.g=p; rgb.b=hsv.value; break;
        default: rgb.r=hsv.value; rgb.g=p; rgb.b=q;
        }
        rgb.r=Math.round(rgb.r*255);
        rgb.g=Math.round(rgb.g*255);
        rgb.b=Math.round(rgb.b*255);
    }
    return rgb;
}
function min3(a,b,c) {
    return (a<b)?((a<c)?a:c):((b<c)?b:c);
}
function max3(a,b,c) {
    return (a>b)?((a>c)?a:c):((b>c)?b:c);
}
function HueShift(h,s) {
    h+=s; while (h>=360.0) h-=360.0;
    while (h<0.0) h+=360.0;
    return h;
}

// CMYK
function rgb2cmyk(r,g,b) {
 var computedC = 0;
 var computedM = 0;
 var computedY = 0;
 var computedK = 0;
 //remove spaces from input RGB values, convert to int
 var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
 var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
 var b = parseInt( (''+b).replace(/\s/g,''),10 ); 
 if ( r==null || g==null || b==null ||
     isNaN(r) || isNaN(g)|| isNaN(b) )
 {
   alert ('Please enter numeric RGB values!');
   return;
 }
 if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
   alert ('RGB values must be in the range 0 to 255.');
   return;
 }
 // BLACK
 if (r==0 && g==0 && b==0) {
  computedK = 1;
  return [0,0,0,1];
 }
 computedC = 1 - (r/255);
 computedM = 1 - (g/255);
 computedY = 1 - (b/255);
 var minCMY = Math.min(computedC,
              Math.min(computedM,computedY));
 computedC = (computedC - minCMY) / (1 - minCMY) ;
 computedM = (computedM - minCMY) / (1 - minCMY) ;
 computedY = (computedY - minCMY) / (1 - minCMY) ;
 computedK = minCMY;
 colc = Math.round(computedC*10000)/10000;
 colm = Math.round(computedM*10000)/10000;
 coly = Math.round(computedY*10000)/10000;
 colk = Math.round(computedK*10000)/10000;
 
 return [computedC,computedM,computedY,computedK];
}

function ketjegyu(x) {
	if (x < 10) {
		return "0" + x;
	} else {
		return x;
	}
}

/*jQuery color slider RGB*/
  function rgb2hex(r, g, b) {
    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    });
    return hex.join( "" ).toUpperCase();
  }
  function refreshSwatch() {
    var red = $( "#red" ).slider( "value" ),
      green = $( "#green" ).slider( "value" ),
      blue = $( "#blue" ).slider( "value" ),
      hex = rgb2hex( red, green, blue );
	document.getElementById('swatch').innerHTML = '<div style="background-color:#' + hex +'"><div onclick="aplikal(\''+hex+'\');" class="aplikalo" title="Set Active"></div><input onClick="this.select();" value=#' + hex + ' /> </div>';
  }
  $(function() {
    $( "#red, #green, #blue" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: refreshSwatch,
      change: refreshSwatch
    });
    $( "#red" ).slider( "value", 255 );
    $( "#green" ).slider( "value", 255 );
    $( "#blue" ).slider( "value", 255 );
  });
  
/*jQuery color slider HSV  HSV2RGB(Object {saturation: 42, hue: 6, value: 100})*/
  function refreshSwatch3() {
    var slideh = $( "#slideh" ).slider( "value" ),
      slides = $( "#slides" ).slider( "value" ),
      slidev = $( "#slidev" ).slider( "value" );
	var hsvobj = {
		saturation: slides,
		hue: slideh,
		value: slidev
	};
	var temprgb=HSV2RGB(hsvobj);
	var hex = rgb2hex(temprgb.r,temprgb.g,temprgb.b)
	document.getElementById('swatch3').innerHTML = '<div style="background-color:#' + hex +'"><div onclick="aplikal(\''+hex+'\');" class="aplikalo" title="Set Active"></div><input onClick="this.select();" value=#' + hex + ' /> </div>';
  }
  $(function() {
    $( "#slideh" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 360,
      slide: refreshSwatch3,
      change: refreshSwatch3
    });
    $( "#slideh" ).slider( 0 );
  });
  $(function() {
    $( "#slides" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 100,
      slide: refreshSwatch3,
      change: refreshSwatch3
    });
    $( "#slides" ).slider( 0 );
  });
  $(function() {
    $( "#slidev" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 100,
      slide: refreshSwatch3,
      change: refreshSwatch3
    });
    $( "#slidev" ).slider( 0 );
  });
  
  
/*jQuery color slider CMYK*/
  function refreshSwatch2() {
    var cyan = $( "#cyan" ).slider( "value" ),
      magenta = $( "#magenta" ).slider( "value" ),
      yellow = $( "#yellow" ).slider( "value" ),
      key = $( "#key" ).slider( "value" ),
      hex = CMYK2RGB( cyan, magenta, yellow, key );
	  document.getElementById('swatch2').innerHTML = '<div style="background-color:#' + hex +'"><div onclick="aplikal(\''+hex+'\');" class="aplikalo" title="Set Active"></div><input onClick="this.select();" value=#' + hex + ' /> </div>';
  }
  $(function() {
    $( "#cyan, #magenta, #yellow, #key" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 100,
      value: 0.5,
      slide: refreshSwatch2,
      change: refreshSwatch2
    });
    $( "#cyan" ).slider( "value", 0 );
    $( "#magenta" ).slider( "value", 0 );
    $( "#yellow" ).slider( "value", 0 );
    $( "#key" ).slider( "value", 0 );
  });

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function sticktothetop() {
	if (window.innerWidth > 1400) {
		var window_top = $(window).scrollTop();
		var top = $('#stick-here').offset().top;
		if (window_top > top) {
			$('#stickThis').addClass('stick');
			$('#stick-here').height($('#stickThis').outerHeight());
		} else {
			$('#stickThis').removeClass('stick');
			$('#stick-here').height(0);
		}
		
		var meddigScroll = 0;
		var thisAnchorPos = $('#colorStuffContainer').offset().top - 20;
		if (window_top > thisAnchorPos) {
			meddigScroll = 1;
		}
		thisAnchorPos = $('#colormixers').offset().top-20;
		if (window_top > thisAnchorPos) {
			meddigScroll = 2;
		}
		thisAnchorPos = $('#codepicker').offset().top-20;
		if (window_top > thisAnchorPos) {
			meddigScroll = 3;
		}
		$(".thumbnails a").removeClass("active");
		if (meddigScroll == 1) {
			$("#pageHeadingLink").addClass("active");
		}
		if (meddigScroll == 2) {
			$("#colormixersLink").addClass("active");
		}
		if (meddigScroll == 3) {
			$("#scrollLinkLink").addClass("active");
		}
	}
}
$(function() {
    $(window).scroll(sticktothetop);
    sticktothetop();
});


	//colorlist search sort http://www.listjs.com/examples
!function(){function a(b,c,d){var e=a.resolve(b);if(null==e){d=d||b,c=c||"root";var f=new Error('Failed to require "'+d+'" from "'+c+'"');throw f.path=d,f.parent=c,f.require=!0,f}var g=a.modules[e];if(!g._resolving&&!g.exports){var h={};h.exports={},h.client=h.component=!0,g._resolving=!0,g.call(this,h.exports,a.relative(e),h),delete g._resolving,g.exports=h.exports}return g.exports}a.modules={},a.aliases={},a.resolve=function(b){"/"===b.charAt(0)&&(b=b.slice(1));for(var c=[b,b+".js",b+".json",b+"/index.js",b+"/index.json"],d=0;d<c.length;d++){var b=c[d];if(a.modules.hasOwnProperty(b))return b;if(a.aliases.hasOwnProperty(b))return a.aliases[b]}},a.normalize=function(a,b){var c=[];if("."!=b.charAt(0))return b;a=a.split("/"),b=b.split("/");for(var d=0;d<b.length;++d)".."==b[d]?a.pop():"."!=b[d]&&""!=b[d]&&c.push(b[d]);return a.concat(c).join("/")},a.register=function(b,c){a.modules[b]=c},a.alias=function(b,c){if(!a.modules.hasOwnProperty(b))throw new Error('Failed to alias "'+b+'", it does not exist');a.aliases[c]=b},a.relative=function(b){function c(a,b){for(var c=a.length;c--;)if(a[c]===b)return c;return-1}function d(c){var e=d.resolve(c);return a(e,b,c)}var e=a.normalize(b,"..");return d.resolve=function(d){var f=d.charAt(0);if("/"==f)return d.slice(1);if("."==f)return a.normalize(e,d);var g=b.split("/"),h=c(g,"deps")+1;return h||(h=0),d=g.slice(0,h+1).join("/")+"/deps/"+d},d.exists=function(b){return a.modules.hasOwnProperty(d.resolve(b))},d},a.register("component-classes/index.js",function(a,b,c){function d(a){if(!a)throw new Error("A DOM element reference is required");this.el=a,this.list=a.classList}var e=b("indexof"),f=/\s+/,g=Object.prototype.toString;c.exports=function(a){return new d(a)},d.prototype.add=function(a){if(this.list)return this.list.add(a),this;var b=this.array(),c=e(b,a);return~c||b.push(a),this.el.className=b.join(" "),this},d.prototype.remove=function(a){if("[object RegExp]"==g.call(a))return this.removeMatching(a);if(this.list)return this.list.remove(a),this;var b=this.array(),c=e(b,a);return~c&&b.splice(c,1),this.el.className=b.join(" "),this},d.prototype.removeMatching=function(a){for(var b=this.array(),c=0;c<b.length;c++)a.test(b[c])&&this.remove(b[c]);return this},d.prototype.toggle=function(a,b){return this.list?("undefined"!=typeof b?b!==this.list.toggle(a,b)&&this.list.toggle(a):this.list.toggle(a),this):("undefined"!=typeof b?b?this.add(a):this.remove(a):this.has(a)?this.remove(a):this.add(a),this)},d.prototype.array=function(){var a=this.el.className.replace(/^\s+|\s+$/g,""),b=a.split(f);return""===b[0]&&b.shift(),b},d.prototype.has=d.prototype.contains=function(a){return this.list?this.list.contains(a):!!~e(this.array(),a)}}),a.register("segmentio-extend/index.js",function(a,b,c){c.exports=function(a){for(var b,c=Array.prototype.slice.call(arguments,1),d=0;b=c[d];d++)if(b)for(var e in b)a[e]=b[e];return a}}),a.register("component-indexof/index.js",function(a,b,c){c.exports=function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}}),a.register("component-event/index.js",function(a){var b=window.addEventListener?"addEventListener":"attachEvent",c=window.removeEventListener?"removeEventListener":"detachEvent",d="addEventListener"!==b?"on":"";a.bind=function(a,c,e,f){return a[b](d+c,e,f||!1),e},a.unbind=function(a,b,e,f){return a[c](d+b,e,f||!1),e}}),a.register("timoxley-to-array/index.js",function(a,b,c){function d(a){return"[object Array]"===Object.prototype.toString.call(a)}c.exports=function(a){if("undefined"==typeof a)return[];if(null===a)return[null];if(a===window)return[window];if("string"==typeof a)return[a];if(d(a))return a;if("number"!=typeof a.length)return[a];if("function"==typeof a&&a instanceof Function)return[a];for(var b=[],c=0;c<a.length;c++)(Object.prototype.hasOwnProperty.call(a,c)||c in a)&&b.push(a[c]);return b.length?b:[]}}),a.register("javve-events/index.js",function(a,b){var c=b("event"),d=b("to-array");a.bind=function(a,b,e,f){a=d(a);for(var g=0;g<a.length;g++)c.bind(a[g],b,e,f)},a.unbind=function(a,b,e,f){a=d(a);for(var g=0;g<a.length;g++)c.unbind(a[g],b,e,f)}}),a.register("javve-get-by-class/index.js",function(a,b,c){c.exports=function(){return document.getElementsByClassName?function(a,b,c){return c?a.getElementsByClassName(b)[0]:a.getElementsByClassName(b)}:document.querySelector?function(a,b,c){return b="."+b,c?a.querySelector(b):a.querySelectorAll(b)}:function(a,b,c){var d=[],e="*";null==a&&(a=document);for(var f=a.getElementsByTagName(e),g=f.length,h=new RegExp("(^|\\s)"+b+"(\\s|$)"),i=0,j=0;g>i;i++)if(h.test(f[i].className)){if(c)return f[i];d[j]=f[i],j++}return d}}()}),a.register("javve-get-attribute/index.js",function(a,b,c){c.exports=function(a,b){var c=a.getAttribute&&a.getAttribute(b)||null;if(!c)for(var d=a.attributes,e=d.length,f=0;e>f;f++)void 0!==b[f]&&b[f].nodeName===b&&(c=b[f].nodeValue);return c}}),a.register("javve-natural-sort/index.js",function(a,b,c){c.exports=function(a,b,c){var d,e,f=/(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,g=/(^[ ]*|[ ]*$)/g,h=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,i=/^0x[0-9a-f]+$/i,j=/^0/,c=c||{},k=function(a){return c.insensitive&&(""+a).toLowerCase()||""+a},l=k(a).replace(g,"")||"",m=k(b).replace(g,"")||"",n=l.replace(f,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),o=m.replace(f,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),p=parseInt(l.match(i))||1!=n.length&&l.match(h)&&Date.parse(l),q=parseInt(m.match(i))||p&&m.match(h)&&Date.parse(m)||null,r=c.desc?-1:1;if(q){if(q>p)return-1*r;if(p>q)return 1*r}for(var s=0,t=Math.max(n.length,o.length);t>s;s++){if(d=!(n[s]||"").match(j)&&parseFloat(n[s])||n[s]||0,e=!(o[s]||"").match(j)&&parseFloat(o[s])||o[s]||0,isNaN(d)!==isNaN(e))return isNaN(d)?1:-1;if(typeof d!=typeof e&&(d+="",e+=""),e>d)return-1*r;if(d>e)return 1*r}return 0}}),a.register("javve-to-string/index.js",function(a,b,c){c.exports=function(a){return a=void 0===a?"":a,a=null===a?"":a,a=a.toString()}}),a.register("component-type/index.js",function(a,b,c){var d=Object.prototype.toString;c.exports=function(a){switch(d.call(a)){case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object Error]":return"error"}return null===a?"null":void 0===a?"undefined":a!==a?"nan":a&&1===a.nodeType?"element":typeof a.valueOf()}}),a.register("list.js/index.js",function(a,b,c){!function(a,d){"use strict";var e=a.document,f=b("get-by-class"),g=b("extend"),h=b("indexof"),i=function(a,c,i){var j,k=this,l=b("./src/item")(k),m=b("./src/add-async")(k),n=b("./src/parse")(k);j={start:function(){k.listClass="list",k.searchClass="search",k.sortClass="sort",k.page=200,k.i=1,k.items=[],k.visibleItems=[],k.matchingItems=[],k.searched=!1,k.filtered=!1,k.handlers={updated:[]},k.plugins={},k.helpers={getByClass:f,extend:g,indexOf:h},g(k,c),k.listContainer="string"==typeof a?e.getElementById(a):a,k.listContainer&&(k.list=f(k.listContainer,k.listClass,!0),k.templater=b("./src/templater")(k),k.search=b("./src/search")(k),k.filter=b("./src/filter")(k),k.sort=b("./src/sort")(k),this.items(),k.update(),this.plugins())},items:function(){n(k.list),i!==d&&k.add(i)},plugins:function(){for(var a=0;a<k.plugins.length;a++){var b=k.plugins[a];k[b.name]=b,b.init(k)}}},this.add=function(a,b){if(b)return m(a,b),void 0;var c=[],e=!1;a[0]===d&&(a=[a]);for(var f=0,g=a.length;g>f;f++){var h=null;a[f]instanceof l?(h=a[f],h.reload()):(e=k.items.length>k.page?!0:!1,h=new l(a[f],d,e)),k.items.push(h),c.push(h)}return k.update(),c},this.show=function(a,b){return this.i=a,this.page=b,k.update(),k},this.remove=function(a,b,c){for(var d=0,e=0,f=k.items.length;f>e;e++)k.items[e].values()[a]==b&&(k.templater.remove(k.items[e],c),k.items.splice(e,1),f--,e--,d++);return k.update(),d},this.get=function(a,b){for(var c=[],d=0,e=k.items.length;e>d;d++){var f=k.items[d];f.values()[a]==b&&c.push(f)}return c},this.size=function(){return k.items.length},this.clear=function(){return k.templater.clear(),k.items=[],k},this.on=function(a,b){return k.handlers[a].push(b),k},this.off=function(a,b){var c=k.handlers[a],d=h(c,b);return d>-1&&c.splice(d,1),k},this.trigger=function(a){for(var b=k.handlers[a].length;b--;)k.handlers[a][b](k);return k},this.reset={filter:function(){for(var a=k.items,b=a.length;b--;)a[b].filtered=!1;return k},search:function(){for(var a=k.items,b=a.length;b--;)a[b].found=!1;return k}},this.update=function(){var a=k.items,b=a.length;k.visibleItems=[],k.matchingItems=[],k.templater.clear();for(var c=0;b>c;c++)a[c].matching()&&k.matchingItems.length+1>=k.i&&k.visibleItems.length<k.page?(a[c].show(),k.visibleItems.push(a[c]),k.matchingItems.push(a[c])):a[c].matching()?(k.matchingItems.push(a[c]),a[c].hide()):a[c].hide();return k.trigger("updated"),k},j.start()};c.exports=i}(window)}),a.register("list.js/src/search.js",function(a,b,c){var d=b("events"),e=b("get-by-class"),f=b("to-string");c.exports=function(a){var b,c,g,h,i={resetList:function(){a.i=1,a.templater.clear(),h=void 0},setOptions:function(a){2==a.length&&a[1]instanceof Array?c=a[1]:2==a.length&&"function"==typeof a[1]?h=a[1]:3==a.length&&(c=a[1],h=a[2])},setColumns:function(){c=void 0===c?i.toArray(a.items[0].values()):c},setSearchString:function(a){a=f(a).toLowerCase(),a=a.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),g=a},toArray:function(a){var b=[];for(var c in a)b.push(c);return b}},j={list:function(){for(var b=0,c=a.items.length;c>b;b++)j.item(a.items[b])},item:function(a){a.found=!1;for(var b=0,d=c.length;d>b;b++)if(j.values(a.values(),c[b]))return a.found=!0,void 0},values:function(a,c){return a.hasOwnProperty(c)&&(b=f(a[c]).toLowerCase(),""!==g&&b.search(g)>-1)?!0:!1},reset:function(){a.reset.search(),a.searched=!1}},k=function(b){return a.trigger("searchStart"),i.resetList(),i.setSearchString(b),i.setOptions(arguments),i.setColumns(),""===g?j.reset():(a.searched=!0,h?h(g,c):j.list()),a.update(),a.trigger("searchComplete"),a.visibleItems};return a.handlers.searchStart=a.handlers.searchStart||[],a.handlers.searchComplete=a.handlers.searchComplete||[],d.bind(e(a.listContainer,a.searchClass),"keyup",function(b){var c=b.target||b.srcElement,d=""===c.value&&!a.searched;d||k(c.value)}),d.bind(e(a.listContainer,a.searchClass),"input",function(a){var b=a.target||a.srcElement;""===b.value&&k("")}),a.helpers.toString=f,k}}),a.register("list.js/src/sort.js",function(a,b,c){var d=b("natural-sort"),e=b("classes"),f=b("events"),g=b("get-by-class"),h=b("get-attribute");c.exports=function(a){a.sortFunction=a.sortFunction||function(a,b,c){return c.desc="desc"==c.order?!0:!1,d(a.values()[c.valueName],b.values()[c.valueName],c)};var b={els:void 0,clear:function(){for(var a=0,c=b.els.length;c>a;a++)e(b.els[a]).remove("asc"),e(b.els[a]).remove("desc")},getOrder:function(a){var b=h(a,"data-order");return"asc"==b||"desc"==b?b:e(a).has("desc")?"asc":e(a).has("asc")?"desc":"asc"},getInSensitive:function(a,b){var c=h(a,"data-insensitive");b.insensitive="true"===c?!0:!1},setOrder:function(a){for(var c=0,d=b.els.length;d>c;c++){var f=b.els[c];if(h(f,"data-sort")===a.valueName){var g=h(f,"data-order");"asc"==g||"desc"==g?g==a.order&&e(f).add(a.order):e(f).add(a.order)}}}},c=function(){a.trigger("sortStart"),options={};var c=arguments[0].currentTarget||arguments[0].srcElement||void 0;c?(options.valueName=h(c,"data-sort"),b.getInSensitive(c,options),options.order=b.getOrder(c)):(options=arguments[1]||options,options.valueName=arguments[0],options.order=options.order||"asc",options.insensitive="undefined"==typeof options.insensitive?!0:options.insensitive),b.clear(),b.setOrder(options),options.sortFunction=options.sortFunction||a.sortFunction,a.items.sort(function(a,b){return options.sortFunction(a,b,options)}),a.update(),a.trigger("sortComplete")};return a.handlers.sortStart=a.handlers.sortStart||[],a.handlers.sortComplete=a.handlers.sortComplete||[],b.els=g(a.listContainer,a.sortClass),f.bind(b.els,"click",c),a.on("searchStart",b.clear),a.on("filterStart",b.clear),a.helpers.classes=e,a.helpers.naturalSort=d,a.helpers.events=f,a.helpers.getAttribute=h,c}}),a.register("list.js/src/item.js",function(a,b,c){c.exports=function(a){return function(b,c,d){var e=this;this._values={},this.found=!1,this.filtered=!1;var f=function(b,c,d){if(void 0===c)d?e.values(b,d):e.values(b);else{e.elm=c;var f=a.templater.get(e,b);e.values(f)}};this.values=function(b,c){if(void 0===b)return e._values;for(var d in b)e._values[d]=b[d];c!==!0&&a.templater.set(e,e.values())},this.show=function(){a.templater.show(e)},this.hide=function(){a.templater.hide(e)},this.matching=function(){return a.filtered&&a.searched&&e.found&&e.filtered||a.filtered&&!a.searched&&e.filtered||!a.filtered&&a.searched&&e.found||!a.filtered&&!a.searched},this.visible=function(){return e.elm.parentNode==a.list?!0:!1},f(b,c,d)}}}),a.register("list.js/src/templater.js",function(a,b,c){var d=b("get-by-class"),e=function(a){function b(b){if(void 0===b){for(var c=a.list.childNodes,d=0,e=c.length;e>d;d++)if(void 0===c[d].data)return c[d];return null}if(-1!==b.indexOf("<")){var f=document.createElement("div");return f.innerHTML=b,f.firstChild}return document.getElementById(a.item)}var c=b(a.item),e=this;this.get=function(a,b){e.create(a);for(var c={},f=0,g=b.length;g>f;f++){var h=d(a.elm,b[f],!0);c[b[f]]=h?h.innerHTML:""}return c},this.set=function(a,b){if(!e.create(a))for(var c in b)if(b.hasOwnProperty(c)){var f=d(a.elm,c,!0);f&&("IMG"===f.tagName&&""!==b[c]?f.src=b[c]:f.innerHTML=b[c])}},this.create=function(a){if(void 0!==a.elm)return!1;var b=c.cloneNode(!0);return b.removeAttribute("id"),a.elm=b,e.set(a,a.values()),!0},this.remove=function(b){a.list.removeChild(b.elm)},this.show=function(b){e.create(b),a.list.appendChild(b.elm)},this.hide=function(b){void 0!==b.elm&&b.elm.parentNode===a.list&&a.list.removeChild(b.elm)},this.clear=function(){if(a.list.hasChildNodes())for(;a.list.childNodes.length>=1;)a.list.removeChild(a.list.firstChild)}};c.exports=function(a){return new e(a)}}),a.register("list.js/src/filter.js",function(a,b,c){c.exports=function(a){return a.handlers.filterStart=a.handlers.filterStart||[],a.handlers.filterComplete=a.handlers.filterComplete||[],function(b){if(a.trigger("filterStart"),a.i=1,a.reset.filter(),void 0===b)a.filtered=!1;else{a.filtered=!0;for(var c=a.items,d=0,e=c.length;e>d;d++){var f=c[d];f.filtered=b(f)?!0:!1}}return a.update(),a.trigger("filterComplete"),a.visibleItems}}}),a.register("list.js/src/add-async.js",function(a,b,c){c.exports=function(a){return function(b,c,d){var e=b.splice(0,100);d=d||[],d=d.concat(a.add(e)),b.length>0?setTimeout(function(){addAsync(b,c,d)},10):(a.update(),c(d))}}}),a.register("list.js/src/parse.js",function(a,b,c){c.exports=function(a){var c=b("./item")(a),d=function(a){for(var b=a.childNodes,c=[],d=0,e=b.length;e>d;d++)void 0===b[d].data&&c.push(b[d]);return c},e=function(b,d){for(var e=0,f=b.length;f>e;e++)a.items.push(new c(d,b[e]))},f=function(b,c){var d=b.splice(0,100);e(d,c),b.length>0?setTimeout(function(){init.items.indexAsync(b,c)},10):a.update()};return function(){var b=d(a.list),c=a.valueNames;a.indexAsync?f(b,c):e(b,c)}}}),a.alias("component-classes/index.js","list.js/deps/classes/index.js"),a.alias("component-classes/index.js","classes/index.js"),a.alias("component-indexof/index.js","component-classes/deps/indexof/index.js"),a.alias("segmentio-extend/index.js","list.js/deps/extend/index.js"),a.alias("segmentio-extend/index.js","extend/index.js"),a.alias("component-indexof/index.js","list.js/deps/indexof/index.js"),a.alias("component-indexof/index.js","indexof/index.js"),a.alias("javve-events/index.js","list.js/deps/events/index.js"),a.alias("javve-events/index.js","events/index.js"),a.alias("component-event/index.js","javve-events/deps/event/index.js"),a.alias("timoxley-to-array/index.js","javve-events/deps/to-array/index.js"),a.alias("javve-get-by-class/index.js","list.js/deps/get-by-class/index.js"),a.alias("javve-get-by-class/index.js","get-by-class/index.js"),a.alias("javve-get-attribute/index.js","list.js/deps/get-attribute/index.js"),a.alias("javve-get-attribute/index.js","get-attribute/index.js"),a.alias("javve-natural-sort/index.js","list.js/deps/natural-sort/index.js"),a.alias("javve-natural-sort/index.js","natural-sort/index.js"),a.alias("javve-to-string/index.js","list.js/deps/to-string/index.js"),a.alias("javve-to-string/index.js","list.js/deps/to-string/index.js"),a.alias("javve-to-string/index.js","to-string/index.js"),a.alias("javve-to-string/index.js","javve-to-string/index.js"),a.alias("component-type/index.js","list.js/deps/type/index.js"),a.alias("component-type/index.js","type/index.js"),"object"==typeof exports?module.exports=a("list.js"):"function"==typeof define&&define.amd?define(function(){return a("list.js")}):this.List=a("list.js")}();


var hoveredPalette = "none";
var displayedPalette = "x";
$( document ).ready(function() {
	
	setTimeout(function(){ 	// load header image
		if (window.innerWidth > 1000) {
			$("#myColor").focus();
		}
	
		var headerImg = "0";
		if (window.innerWidth > 950) {
			headerImg = '<img src="/color/color900.png" alt="header image" />';
		}
		if (headerImg == "0") {
			$("#wrapHeaderImage").hide(200);
		} else {
			$("#headerImage").html(headerImg);
			$("#headerImage img").fadeIn(600, function() {
				$("#headerImage img").css('display','block');
			});
		}
	}, 700);
	
    $( "a.scrollLink" ).click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
    });
    $( "#menuToggle" ).click(function( event ) {
		$(".navigation, .wrapGeneratorList").toggle(300);
    });
	
	setTimeout(function(){ 
		updateOlvashatoszin();
	}, 1600);
	
	if (window.location.href.length < 30) {
		$(".myColorContainer").css('background',"url(/color/pickhere.png) no-repeat top left transparent");
	}

	setTimeout(function(){ 
		$(".myColorContainer").css('background',"none");
	}, 6000);

	betoltodott = 1;
	if(window.location.href.indexOf("clr") > -1){
		var urlcolor = getUrlVars()["clr"];	
		if (urlcolor.length == 6){
			document.getElementById('myColor').value = urlcolor;
			setTimeout(function(){ updateColor(urlcolor); }, 500);
		}
	}
	
	//colorlist search sort
	var options = {
	  valueNames: [ 'colorname' ]
	};
	var userList = new List('colorsearch', options);	

	setTimeout(function(){ 
		/*Big palette BEGIN*/
		var hsv = {saturation: 83, hue: 175, value: 89};
		var hex;
		var h = 0;
		var s = 50;
		var v = 100;
		var htm ="";
		var seged;
		var neve;
		var alignment;
		var notSelected;
		for (s = 0; s <= 10; s++) {
			htm += '<div class="row">';
			for (h = 0; h < 36; h++) {
				hsv = {hue: h * 10, saturation: s * 10, value: v};
				seged = hsv.hue + ',' + hsv.saturation + ',' + hsv.value;
				rgb = HSV2RGB(hsv);
				hex = rgb2hex(rgb.r, rgb.g, rgb.b);
				notSelected = 'notSelected';
				if (hex == selectedColor) {	notSelected = 'yesSelected';	}
				alignment = "hoverRight";
				if (h > 20) {alignment = "hoverLeft";}
				neve = window.classifier.classify("#"+hex);			
				htm += '<a class="' + notSelected + '" data-color="' + neve + '" data-id="' + s + '_' + h + '" href="https://rgbcolorcode.com/color/' + hex + '" style="background-color: rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')"> <div class="' + alignment +'" style="border-color: #' + hex + ';"><span class="nevHeader" style="background-color: rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')">' + neve + '</span>#<span class="hexe">' + hex + '</span><br />rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')<em class="tooltipImage" style="background-color: rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')"></em></div></a>';
			}
			htm += '</div>';
		}
		
		s = 100;
		for (v = 9; v >= 0; v--) {
			htm += '<div class="row">';
			for (h = 0; h < 36; h++) {
				hsv = {hue: h * 10, saturation: s, value: v * 10};
				seged = hsv.hue + ',' + hsv.saturation + ',' + hsv.value;
				rgb = HSV2RGB(hsv);
				hex = rgb2hex(rgb.r, rgb.g, rgb.b);
				notSelected = 'notSelected';
				if (hex == selectedColor) {	notSelected = 'yesSelected';	}
				alignment = "hoverRight";
				if (h > 20) {alignment = "hoverLeft";}				
				neve = window.classifier.classify("#"+hex);				
				htm += '<a class="' + notSelected + '" data-color="' + neve + '" data-id="' + v + '-' + h + '" href="https://rgbcolorcode.com/color/' + hex + '" style="background-color: rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')"> <div class="' + alignment +'" style="border-color: #' + hex + ';"><span class="nevHeader" style="background-color: rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')">' + neve + '</span>#<span class="hexe">' + hex + '</span><br />rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')<em class="tooltipImage" style="background-color: rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')"></em></div></a>';
			}
			htm += '</div>';
		}
		$('#bigPalette').html(htm);
		$( "#bigPalette, .navigation" ).animate({
			opacity: 1
		}, 500, function() {
		});
		$('#bigPalette .row > a').mouseleave(function(event) {
			$(".tooltipImage").html('');
			$(this).find('div').stop().fadeOut(100, function() {
				$(this).removeClass('hovered');
			});
		});
		$('#bigPalette .row > a').mouseover(function(event) {
			//console.log($(this).find('.hexe').html());
			//console.log(window.classifier.classify("#"+$(this).find('.hexe').html()));
			$(this).find('div').stop().fadeIn(500, function() {
				$(this).addClass('hovered');
				hoveredPalette = $(this).parent().attr("data-id");
				if (displayedPalette != hoveredPalette) {
					var nowHoveringName = $(this).parent().attr("data-color");
					displayedPalette = hoveredPalette;
					//console.log(nowHoveringName);
					$(".tooltipImage").html('<img src="/color/images/thumbs/' + nameToFileName(nowHoveringName) + '.jpg" alt="' + nowHoveringName + '" />');
					/*
					$( ".tooltipImage" ).stop().css('opacity', 0.1);					
					setTimeout(function(){ 
						$( ".tooltipImage" ).stop().animate({
							opacity: 1
						}, 500, function() {});
					}, 500);
					*/
				}				
			});
		});
	 }, 1000);
});