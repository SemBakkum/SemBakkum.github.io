(function () {
    'use strict';
    
    var audios = document.querySelectorAll('audio');
    var sections = document.querySelectorAll('section');
    var handler;
    var hardKick = new Audio('sounds/hard-kick.mp3');
    var clap = new Audio('sounds/clap-tape.mp3');
    var crash = new Audio('sounds/cowbell-808.mp3');
    var hihat = new Audio('sounds/hihat-plain.mp3');
    var kick = new Audio('sounds/kick-tape.mp3');
    var hat = new Audio('sounds/openhat-tight.mp3');
    var perc = new Audio('sounds/perc-nasty.mp3');
    var snare = new Audio('sounds/snare-big.mp3');
    
    var hardKickPlay = function() {
        hardKick.play();
        hardKick.currentTime = 0;
    };
    
    var clapPlay = function() {
        clap.play();
        clap.currentTime = 0;
    };
    
    var crashPlay = function() {
        crash.play();
        crash.currentTime = 0;
    };
    
    var hihatPlay = function() {
        hihat.play();
        hihat.currentTime = 0;
    };
    
    var kickPlay = function() {
        kick.play();
        kick.currentTime = 0;
    };
    
    var hatPlay = function() {
        hat.play();
        hat.currentTime = 0;
    };
    
    var percPlay = function() {
        perc.play();
        perc.currentTime = 0;
    };
    
    var snarePlay = function() {
        snare.play();
        snare.currentTime = 0;
    };
    
    window.onkeydown = function (e) {
        
       var down = event.keyCode;
        
        switch (down) {

            case(65): hardKickPlay();
            break;
                
            case(83): clapPlay();
            break;
                
            case(68): crashPlay();
            break;
                
            case(70): hihatPlay();
            break;
                
            case(71): kickPlay();
            break;
                
            case(72): hatPlay();
            break;
                
            case(74): percPlay();
            break;
                
            case(75): snarePlay();
            break;
        }
        
    };
        
    
    function play(event) {
        
        console.log(this);
        
        var audio = this.parentNode.querySelector('audio');
        
        if(audio.paused){
            
            audio.play();
            audio.currentTime = 0;
            
        } else {
            
            audio.pause();
            
        }
        
    };
    
    if ('ontouchstart' in document.documentElement) {
            handler = 'touchstart';
        } else {
            handler = 'click';
        }
    
    for (var i = 0; i < sections.length; i += 1) {
        var btn = document.createElement('button');
        btn.innerHTML = sections[i].querySelector('h2').innerHTML;
        sections[i].appendChild(btn);
        
        
        
        btn.addEventListener(handler, play, false);
        audios[i].removeAttribute('controls');
    }
    
    document.body.classList.add('enhanced-with-js')
    
}());
