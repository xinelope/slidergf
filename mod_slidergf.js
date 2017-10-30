var slider = {
  data : [],
  "domobj" : "",
  "slideroot" : "",
  "bilderbox" : "",
  "imganz" : "",
  "radstat" : 99,
  "radioB" : "",
  "bidHoehe" : 0,
  "bullH" : 0,
  init : function(){
    slider.strukturneu();
    slider.domobj = document.querySelectorAll('figure');
    slider.slideroot = document.getElementById('myCSSGbox');
    slider.bilderbox = document.getElementById('myCSSGbilder');

    for(var fele=0; fele < slider.domobj.length; fele++ ) {
    //  alert(slider.domobj[fele].parentNode.getAttribute('id'));
      if(slider.domobj[fele].parentNode.getAttribute('id') != null && slider.domobj[fele].parentNode.getAttribute('id') == "myCSSGbilder") {
        slider.imganz++; }
    }
    //alert(slider.imganz;
    //slider.imganz = slider.domobj.length;
    var stxt = "slide_"; var ftxt = "fignbr_"; var idtxt;
//
    cssnavi = document.createElement('div');
    cssnavi.setAttribute('id', 'myCSSnavi');
    slider.slideroot.appendChild(cssnavi);
    //
    bulls = document.createElement('div');
    bulls.setAttribute('id', 'bulls');
    cssnavi.appendChild(bulls);
    //
    label1 = document.createElement('label');
    label2 = document.createElement('label');
  //  label1.setAttribute('for', 'slide_0');
    label1.setAttribute('id', 'vor');
    label1.setAttribute('onclick', 'slider.abspielen()');
    label2.setAttribute('id', 'pause');
    label2.setAttribute('onclick', 'slider.stopp()');
    myCSSnavi.appendChild(label1);
    myCSSnavi.appendChild(label2);
  //
    for(var a=0; a < slider.imganz; a++ ) {
      idtxt = ftxt + a;
      slider.domobj[a].setAttribute("id", idtxt);
      //
      idtxt = stxt + a;
      input = document.createElement('input');
      input.setAttribute("id", idtxt);
      input.setAttribute("type", "radio");
      input.setAttribute("name", "anchor");
      input.setAttribute("class", "slideanchor");
      slider.slideroot.insertBefore(input, slider.bilderbox);
      //
      label = document.createElement('label');
      label.setAttribute('for', idtxt);
      label.setAttribute('onclick', 'slider.stopp()');
      bulls.appendChild(label);
      /*slider.bullH = document.getElementById('bulls').height;*/
    }
    /**/
    //document.getElementById('test').value = navigator.userAgent.toLowerCase();
    /**/
      slider.radioB = document.querySelectorAll('.slideanchor');
      slider.bullH = (document.getElementById('myCSSGbox').offsetWidth <= 450) ? document.getElementById('bulls').getBoundingClientRect().height : 0;
      slider.setHoeheInit();
      setTimeout("slider.abspielen()", 2000);
  },
  setHoeheInit : function(){
    var slhoehe = document.querySelector('figure').offsetHeight;
    var slhoeheBild = slhoehe + "px";
    var slhoeheBox = (document.getElementById('myCSSGbox').offsetWidth <= 450) ? slhoehe + slider.bullH : slhoehe;
    slhoeheBox = slhoeheBox + "px";
    document.querySelector('.moduletableslider').style.height = slhoeheBox;
    slider.slideroot.style.height = slhoeheBox;
    slider.bilderbox.style.height = slhoeheBild;
    document.getElementById('myCSSnavi').style.height = slhoeheBox;
    document.getElementById('myCSSnavi').style.marginTop = "-" + slhoeheBild;
    document.getElementById('vor').style.height = slhoeheBild;
    document.getElementById('pause').style.height = slhoeheBild;
  },
  setHoehe : function(){
    // Anpassung der Höhe
    var bid = "fignbr_" + slider.radstat;
    var aktbh  = document.getElementById(bid).offsetHeight + "px";
    var aktslh = (document.getElementById('myCSSGbox').offsetWidth <= 450) ? document.getElementById(bid).offsetHeight + slider.bullH : document.getElementById(bid).offsetHeight;
    aktslh = aktslh + "px";
    document.getElementById('myCSSGbox').style.height = aktslh;
    document.querySelector('.moduletableslider').style.height = aktslh;
    document.getElementById('myCSSGbilder').style.height = aktbh;
    document.getElementById('myCSSnavi').style.height = aktslh;
    document.getElementById('myCSSnavi').style.marginTop = "-" + aktbh;
    document.getElementById('vor').style.height = aktbh;
    document.getElementById('pause').style.height = aktbh;
  },
  setSteuerung : function(){
    if(slider.radstat != 99) {
    if(slider.radstat == (slider.imganz-1)) {
      slider.radstat = 0;
    } else {
      slider.radstat = slider.radstat + 1;
    }
    slider.radioB[slider.radstat].checked = true;
    slider.setHoehe();
    //
    setTimeout("slider.setSteuerung()", 8000);
    }
  },
  abspielen : function() {
    document.getElementById('pause').style.display = "block";
    document.getElementById('vor').style.display = "none";
    for(var b=0; b < slider.imganz; b++ ) {  if (slider.radioB[b].checked == true) slider.radstat = b; }
      if(slider.radstat == 99) {  slider.radstat = 0; slider.radioB[slider.radstat].checked = true; }
      setTimeout("slider.setSteuerung()", 8000);
  },
  stopp : function() {
    slider.radstat = 99; document.getElementById('pause').style.display = "none"; document.getElementById('vor').style.display = "block";
    //slider.setHoehe();
  },
  strukturneu : function() {
    var alterKnoten = document.querySelector('.customslider');
    var rootneu = document.createElement('div');
    rootneu.setAttribute('id', 'myCSSGbox');
    rootneu.setAttribute('class','customslider');
    document.querySelector('.moduletableslider').appendChild(rootneu);
    slider.slideroot = document.querySelector('#myCSSGbox');
    var neuerKnoten = alterKnoten.cloneNode(true);
    neuerKnoten.setAttribute('id','myCSSGbilder');
    neuerKnoten.removeAttribute('class');
    slider.slideroot.appendChild(neuerKnoten);
    document.querySelector('.moduletableslider').removeChild(alterKnoten);
  }
}
window.onload = function(){
  slider.init();
}
window.onresize = function () {
  slider.setHoeheInit();
}
