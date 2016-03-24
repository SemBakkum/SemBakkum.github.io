(function () {
    'use strict';
    
    var audios = document.querySelectorAll('audio');
    var sections = document.querySelectorAll('section');
    
    function play(event) {
        
        console.log(this);
        
        var audio = this.parentNode.querySelector('audio');
        
        if(audio.paused){
            
            audio.play();
            
        } else {
            
            audio.pause();
            
        }
        
    };
    
    for (var i = 0; i < sections.length; i += 1) {
        var btn = document.createElement('button');
        btn.innerHTML = sections[i].querySelector('h2').innerHTML;
        sections[i].appendChild(btn);
        
        
        
        btn.addEventListener('click', play, false);
        audios[i].removeAttribute('controls');
    }
    
    if ('ontouchstart' in document.documentElement) {
            handler = 'touchstart';
        } else {
            handler = 'click';
        }
    
    document.body.classList.add('enhanced-with-js')
    
}());
