
 (function () {
    'use strict';
    var buttons = document.querySelectorAll('.button-audio'),
        audios = document.querySelectorAll('audio'),
        handler;
    
    
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext(),
            gainNode = context.createGain(),
            highFilter = context.createBiquadFilter(),
            lowFilter = context.createBiquadFilter(),
            notchFilter = context.createBiquadFilter(),
            bufferList = [],
            paths = [];
        
        // GET LINKS FROM HREF ATTRIBUTES
        for (var i = 0; i < buttons.length; i += 1) {
            paths.push(buttons[i].getAttribute('href'));
        }
        
        // PUSH THE PATHS TO THE LOADBUFFER
        (function pushBuffer(input) {
            for (var i = 0; i < input.length; i += 1) {
                loadBuffer(input[i]);
            }
        }(paths));
        
        // BUFFER AND HTTPREQUESTS
        function loadBuffer(url) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            
            request.onload = function () {
                context.decodeAudioData(request.response, function (buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    
                    bufferList.push(buffer); 
                });
            }
            request.send();            
        }

        // PLAY THE SOUND
        function playSound(event) {
            var source = context.createBufferSource();
            source.buffer = bufferList[event.target.id];
            source.connect(gainNode);
            gainNode.connect(highFilter);
            highFilter.connect(lowFilter);
            lowFilter.connect(context.destination);
            
            highFilter.type = 'highpass';
            lowFilter.type = 'lowpass';
            notchFilter.type= 'notch';
            
            console.log(source);
            source.start(0);
            console.log(source);
            event.preventDefault();
        }
        
        // SEE IF TOUCHEVENTS ARE SUPPORTED
        if ('ontouchstart' in document.documentElement) {
            handler = 'touchstart';
        } else {
            handler = 'click';
        }
        
        for (var i = 0; i < buttons.length; i += 1) {
            buttons[i].addEventListener(handler, playSound, false);
        }
        
    } else if ('querySelectorAll' in document) {

        // AUDIOTAG FUNCTIONS
        // THIS IS ACTIVATED WHEN THE AUDIOCONTEXT IS NOT SUPPORTED
        function playAudioTag(event) {
            var audioPlayer = audios[event.target.id];
            if (audioPlayer.classList.contains('playing')) {
                audioPlayer.classList.remove('playing');
                audioPlayer.pause();
            } else {
                audioPlayer.classList.add('playing');
                audioPlayer.play();
            }
            event.preventDefault();
        }

        for (var i = 0; i < buttons.length; i += 1) {
            buttons[i].addEventListener('click', playAudioTag, false);
        }
    }
    
}());