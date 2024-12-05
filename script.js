

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        //alert('Left was pressed');
        kotek.wLewo();
        chechState();
        checkPoints();
        
    }
    else if(event.keyCode == 39) {
        //alert('Right was pressed');
        kotek.wPrawo();
        chechState();
        checkPoints();
    }
    else if(event.keyCode == 38) {
        //alert('up was pressed');
        kotek.wGore();
        chechState();
        checkPoints();
    }
    else if(event.keyCode == 40) {
        //alert('down was pressed');
        kotek.wDol();
        chechState();
        checkPoints();
    }
    else if(event.keyCode == 85) {
        kotek0.skosLG();
        chechState();
    }
    else if(event.keyCode == 73) {
        kotek0.skosPG();
        chechState();
    }
    else if(event.keyCode == 74) {
        kotek0.skosLD();
        chechState();
    }
    else if(event.keyCode == 75) {
        kotek0.skosPD();
        chechState();
    }
    else if(event.keyCode == 70) {
        ruchAutom(kotek0);
        ruchAutom(kotek1);
        ruchAutom(kotek2);
        ruchAutom(kotek3);
        chechState();
    }
    
});

myInterval = setInterval(ruch, 150)

function ruch()
{
    ruchAutom(kotek0);
    ruchAutom(kotek1);
    ruchAutom(kotek2);
    ruchAutom(kotek3);
    chechState();
}


var Auto = function (x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
}

Auto.prototype.rysuj = function (auto) {
    var autoHtml = this.img;

    this.autoElement = $(autoHtml);

    this.autoElement.css({
        position: "absolute",
        left: this.x,
        top: this.y
    });

    $("body").append(this.autoElement);
}

Auto.prototype.wPrawo = function() {
    this.x += 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.wLewo = function() {
    this.x -= 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.wGore = function() {
    this.y -= 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.wDol = function() {
    this.y += 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.skosPD = function(){
    this.x += 33;
    this.y += 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
} 
Auto.prototype.skosLD = function(){
    this.x -= 33;
    this.y += 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.skosPG = function(){
    this.x += 33;
    this.y -= 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.skosLG = function(){
    this.x -= 33;
    this.y -= 20;

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.los = function(){
    this.x = Math.floor(Math.random()*1200 + 1);
    this.y = Math.floor(Math.random()*800 + 1);
}
Auto.prototype.defenestrate = function(){
    this.x = Math.floor(Math.random()*1200 + 1);
    this.y = Math.floor(Math.random()*800 + 1);

    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}

var XL = Math.floor(Math.random()*1200 + 1);
var YL = Math.floor(Math.random()*800 + 1);

var kotek = new Auto(800,300,'<img src="imgs/kotekp.png">');
var kotek0 = new Auto(800,0,'<img src="imgs/kotekp.png">');
var kotek1 = new Auto(1295,300,'<img src="imgs/kotekp.png">');
var kotek2 = new Auto(800, 600,'<img src="imgs/kotekp.png">');
var kotek3 = new Auto(305, 300,'<img src="imgs/kotekp.png">');
var tost = new Auto(XL, YL, '<img src="imgs/tost.png">')


kotek.rysuj();
kotek0.rysuj();
kotek1.rysuj();
kotek2.rysuj();
kotek3.rysuj();
tost.rysuj();

var diff = 0;
var diff0 = 0;


function checkCollision(k, hei, wid){
    var chX = false;
    var chY = false;
    
    if(kotek.x-k.x < 0){
        diff = (kotek.x-k.x)*(-1);
    }
    else{
        diff = kotek.x - k.x;
    }
    
    if(k.x-kotek.x < 0){
        diff0 = (k.x-kotek.x)*(-1);
    }
    else{
        diff0 = k.x - kotek.x;
    }
    if(diff <= wid || diff0 <= wid){
        chX = true;
    }

    if(kotek.y-k.y < 0){
        diff = (kotek.y-k.y)*(-1);
    }
    else{
        diff = kotek.y - k.y;
    }
    
    if(k.y-kotek.y < 0){
        diff0 = (k.y-kotek.y)*(-1);
    }
    else{
        diff0 = k.y - kotek.y;
    }
    if(diff <= hei || diff0 <= hei){
        chY = true;
    }

    if(chX == true && chY == true){
        return true;
    }
}

var k;

function ruchAutom(k){
    if(k.x >= 800 && k.y < 300){
        k.skosPD();
    }
    if(k.x > 800 && k.y >= 300){
        k.skosLD();
    }
    if(k.x <= 800 && k.y > 300){
        k.skosLG();
    }
    if(k.x < 800 && k.y <= 300){
        k.skosPG();
    }
}


var points = 0;
function checkPoints(){
    if(checkCollision(tost,150,150) == true){
        tost.defenestrate();
        points++;
        let p = document.getElementById("pkt");
        p.innerText = points;
    }
}

var nmbrOfColls = 0;
function checkKotki(){
    if(checkCollision(kotek0, 150, 75) == true ||
    checkCollision(kotek1, 150, 75) == true ||
    checkCollision(kotek2, 150, 75) == true ||
    checkCollision(kotek3, 150, 75) 
    ){
        return true;
    }
}

function chechState(){
    if(checkKotki() == true){
        alert("Kolizja");
        location.reload();
    }
}
