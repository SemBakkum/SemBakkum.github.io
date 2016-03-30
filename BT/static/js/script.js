(function () {
    'use strict';
    
    var audios = document.querySelectorAll('audio');
    var sections = document.querySelectorAll('section');
    var handler;
    var keys = {}
    
    function play(evt, btn) {
        
        if(this) btn = this;
        
        var audio = btn.parentNode.querySelector('audio');

        if(audio.paused){
            
            audio.play();
            audio.currentTime = 0;
            console.log(btn);
            btn.classList.add('active');
            return;
        } 
        
        audio.pause();
        btn.classList.remove('active');
    };
    
    window.addEventListener('keydown', function(evt) {
        if(keys[evt.keyCode]) play(null, keys[evt.keyCode]);
    });
    
    if ('ontouchstart' in document.documentElement) handler = 'touchstart';
    else handler = 'click';
    
    for (var i = 0; i < sections.length; i += 1) {
        var key = sections[i].querySelector('audio').getAttribute('data-key');
        var keyString = String.fromCharCode(key);
        var btn = document.createElement('button');
        btn.innerHTML = sections[i].querySelector('h2').innerHTML + ' (' + keyString + ')';
        sections[i].appendChild(btn);
        btn.addEventListener(handler, play, false);
        audios[i].removeAttribute('controls');
        //console.log(btn);
        keys[key] = btn;
        //console.log(keys[key]);
    }
    
    document.body.classList.add('enhanced-with-js')
    
}());