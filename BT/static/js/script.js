(function () {
    'use strict';
    
    var audios = document.querySelectorAll('audio');
    var sections = document.querySelectorAll('section');
    var handler;
    
    function play(event) {
        
        console.log(this);
        
        var audio = this.parentNode.querySelector('audio');
        
        if(audio.paused){
            
            audio.play();
            
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
