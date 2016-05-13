(function () {
'use strict';
    
    if( 'AudioContext' in window || 'webkitAudioContext' in window) {
        var effects = document.getElementById('controls');
        effects.classList.add('display');
        
        // Make all the buttons
        var buttons = document.querySelectorAll('audio');
        console.log(buttons);
        
        var audios = document.querySelectorAll('audio');
        var sections = document.querySelectorAll('section');
        var handler;
        var keys = {};

        if ('ontouchstart' in document.documentElement) handler = 'touchstart';
        else handler = 'click';
        
        for (var i = 0; i < sections.length; i += 1) {
            var key = sections[i].querySelector('audio').getAttribute('data-key');
            var keyString = String.fromCharCode(key);
            var btn = document.createElement('button');
            btn.innerHTML = sections[i].querySelector('h2').innerHTML + ' (' + keyString + ')';
            btn.setAttribute('id', i);
            btn.addEventListener('click', playSound);
            sections[i].appendChild(btn);
            audios[i].removeAttribute('controls');
            keys[key] = btn;
        }
        
        document.body.classList.add('enhanced-with-js')
        
        // Get all sources
        var source = new Audio.MultiSource(['sounds/hard-kick.mp3', 'sounds/clap-tape.mp3', 'sounds/cowbell-808.mp3', 'sounds/hihat-plain.mp3', 'sounds/kick-tape.mp3', 'sounds/openhat-tight.mp3', 'sounds/perc-nasty.mp3', 'sounds/snare-big.mp3', 'sounds/hiphop.mp3', 'sounds/what.mp3'], function () {
            console.log(source);
        }, true);
        
        // Effects for the sound
        var notch = new Audio.Effect({
            type: 'notch',
            frequency: 350
        });
        
        var lowPass = new Audio.Effect({
            type: 'lowpass',
            frequency: 10000,
            destination: notch
        });
        
        var highPass = new Audio.Effect({
            type: 'highpass',
            frequency: 0,
            destination: lowPass
        });
        
        // Play the sound
        function playSound(e) {
            var button = document.getElementById(e.target.id);
            console.log(button);
            if (!button.classList.contains('active')) {
                var player = new Audio.Player({
                    source: source.buffer[e.target.id],
                    onended: function () {
                        button.classList.remove('active');
                    }
                }).play({
                    destination: highPass
                });

                button.classList.add('active');
            }
        }
        
        var sliders = document.querySelectorAll('input[type="range"]');
        console.log(sliders);
        
        function effectControls() {
            notch.source.frequency.value = sliders[0].value;
            lowPass.source.frequency.value = sliders[1].value;
            highPass.source.frequency.value = sliders[2].value;
        }
        
        for (var i=0; i < sliders.length; i++){
            sliders[i].addEventListener('input', effectControls, false);
        }
        
        // ADD KEYBOARD CONTROLS
        function keypress(event) {
            var keyCode = event.keyCode;
            var foo = {
                target: {
                    id: 0
                }
            }
            console.log(keyCode);
            switch(keyCode) {
                case 65:
                    foo.target.id = 0;
                    playSound(foo);
                    break;
                case 83:
                    foo.target.id = 1;
                    playSound(foo);
                    break;
                case 68:
                    foo.target.id = 2;
                    playSound(foo);
                    break;
                case 70:
                    foo.target.id = 3;
                    playSound(foo);
                    break;
                case 71:
                    foo.target.id = 4;
                    playSound(foo);
                    break;
                case 72:
                    foo.target.id = 5;
                    playSound(foo);
                    break;
                case 74:
                    foo.target.id = 6;
                    playSound(foo);
                    break;
                case 75:
                    foo.target.id = 7;
                    playSound(foo);
                    break;
                case 76:
                    foo.target.id = 8;
                    playSound(foo);
                    break;
                case 77:
                    foo.target.id = 9;
                    playSound(foo);
                    break;
            }
        }
        
        window.addEventListener('keydown', keypress, false);
    }

    else if ('querySelector' in document && 'addEventListener' in window && 'classList' in document.createElement('a') && document.createElement('audio').canPlayType){
        
        var effects = document.getElementById('controls');
        effects.classList.add('display');
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
            keys[key] = btn;
        }

        document.body.classList.add('enhanced-with-js')
        
        
        
    }

}());

