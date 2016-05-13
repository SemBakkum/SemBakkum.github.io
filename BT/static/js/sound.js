/*global window, document, console, alert, AudioContext, webkitAudioContext, Float32Array*/

// Check if AudioContext() is supported
if (window.AudioContext || window.webkitAudioContext) {
    console.log('Yay, AudioContext is supported. Go have fun!');
} else {
    console.log('It seems that your browser does not support the Web Audio API (AudioContext). Please use the latest Chrome, Firefox, Edge or Safari to use this system.');
}

// Audio constructor to use the AudioModuleJS
window.Audio = (function () {
    'use strict';
    
    // CREATE OBJECT TO STORE ALL THE METHODS
    var Method = {},
    
        // SET CTX VARIABLE
        ctx = new AudioContext() || new webkitAudioContext(),

        // CHECK IF ELEMENT IS PRESENT AND OR IS A NUMBER
        chk = function (element, number) {
        
            if (typeof number === 'undefined' || typeof number === null || number === false) {
                if (typeof element === 'undefined' || typeof element === null) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (typeof element === 'undefined' || typeof element === null || isNaN(element)) {
                    return true;
                } else {
                    return false;
                }
            }
        };

    // Set a source that use for the Audio.Player() or Audio.Convolver()
    Method.Source = function (url, callback) {
        
        var self = this;

        // GET THE SOURCES
        function getBuffer(url) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function () {
                ctx.decodeAudioData(request.response, function (buffer) {
                    if (!buffer) {
                        console.error('Audio.Source - Error decoding file data: ' + url);
                        return;
                    }
                    self.buffer = buffer;
                    // FIRE CALLBACK
                    if (callback) {
                        callback();
                    }
                },
                    function (error) {
                        console.error('Audio.Source - DecodeAudioData error: ', error);
                    });

            };
            request.send();
        }

        if (chk(url)) {
            console.error('Audio.Source url is missing or not found.');
        } else {
            getBuffer(url, callback);
        }
    };

    // Set multiple sources to use for the Audio.Player() or Audio.Convolver()
    Method.MultiSource = function (url, callback, callLast) {
        
        var self = this,
            urlLength = url.length - 1,
            i = 0;
        
        this.buffer = [];

        // GET THE SOURCES
        function getBuffer(url, index) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function () {
                ctx.decodeAudioData(request.response, function (buffer) {
                    if (!buffer) {
                        console.error('error decoding file data: ' + url);
                        return;
                    }
                    self.buffer[index] = buffer;
                    // FIRE CALLBACK
                    if (callback) {
                        if (callLast === true) {
                            if (index === urlLength) {
                                callback();
                            }
                        } else {
                            callback();
                        }
                    }
                },
                    function (error) {
                        console.error('decodeAudioData error', error);
                    });
            };
            request.send();
        }
        
        // SEND ALL THE URL'S TO THE GETBUFFER FUNCTION
        function pushBuffer(input) {
            for (i; i < input.length; i += 1) {
                getBuffer(input[i], i);
            }
        }

        if (chk(url)) {
            console.error('Audio.MultiSource url is missing or not found.');
        } else {
            pushBuffer(url);
        }
    };
    
    // Get the source from an <audio> or <video> tag. This way you can manipulate the audio from an <audio> or <video> tag
    Method.HtmlSource = function (options) {
        
        if (chk(options)) {
            console.error('Audio.HtmlSource options not set or recognized. Please set the source property to an <audio> or <video> tag.');
        } else {
            
            if (chk(options.source)) {
                console.error('No Audio.HtmlSource.source has been given or recognized. Please set a valid source.')
            } else {
                // CREATE MEDIAELEMENTSOURCE
                this.source = ctx.createMediaElementSource(options.source);
            }
            
            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }
        }
        
    };

    // Create a new Effect object
    Method.Effect = function (options) {
        
        // CREATE NEW BIQUADFILTER
        this.source = ctx.createBiquadFilter();

        if (chk(options)) {
            console.error('Audio.Effect options not set. Please set the filter type. Other options are optional.');
        } else {
            // SET FILTER TYPE
            if (chk(options.type)) {
                console.error('Audio.Effect filter type is not set or recognized. Please set the filter type to: "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch" or "allpass".');
            } else {
                this.source.type = options.type;

                if (chk(options.frequency, true)) {
                    this.source.frequency.value = this.source.frequency.defaultValue;
                } else {
                    this.source.frequency.value = options.frequency;
                }

                if (chk(options.Q, true)) {
                    this.source.Q.value = this.source.Q.defaultValue;
                } else {
                    this.source.Q.value = options.Q;
                }

                if (chk(options.destination)) {
                    this.source.connect(ctx.destination);
                } else {
                    this.source.connect(options.destination.source);
                }
            }
        }
    };

    // FUNCTION MADE BY Kevin Ennis
    // TAKEN FROM http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
    function distortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;
        for (i; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    // Create a new Distortion
    Method.Distortion = function (options) {
        
        // CREATE NEW WAVE SHAPER
        this.source = ctx.createWaveShaper();

        // SET VALUES
        if (chk(options)) {
            this.source.curve = distortionCurve(50);
            console.info('Audio.Distortion options are not set. Default is set to 50.');
        } else {

            // SET DISTORTIONVALUE
            if (chk(options.curve, true)) {
                this.source.curve = distortionCurve(50);
            } else {
                this.source.curve = distortionCurve(options.curve);
            }

            // SET DISTORTIONOVERSAMPLING
            if (chk(options.oversample)) {
                this.source.oversample = 'none';
            } else {
                this.source.oversample = options.oversample;
            }

            // SET DESTINATION
            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }
        }
    };

    // Create a volume, gain or intensity control
    Method.Gain = function (options) {
        
        // CREATE NEW GAINNODE
        this.source = ctx.createGain();

        // SET VALUES
        if (chk(options)) {
            this.source.gain.value = this.node.gain.defaultValue;
            this.source.connect(ctx.destination);
            console.info('Audio.Gain options are not set. Default value is set to 1 and destination is set to AudioContext().destinations.');
        } else {

            // SET GAINVALUE
            if (chk(options.gainValue, true)) {
                this.source.gain.value = this.source.gain.defaultValue;
            } else {
                this.source.gain.value = options.gainValue;
            }

            // SET DESTINATION
            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }
        }
    };

    // Create a Panner to control the stereosound output
    Method.Panner = function (options) {
        
        // CREATE NEW STEREOPANNER
        this.source = ctx.createStereoPanner();

        if (chk(options)) {
            this.source.connect(ctx.destination);
            console.info('Audio.Panner value and destination not set. Default value is set to 0 and default destination is set to  AudioContext().destination.');
        } else {

            // SET PAN VALUE
            if (chk(options.pan, true)) {
                this.source.pan.value = this.source.pan.defaultValue;
            } else {
                this.source.pan.value = options.pan;
            }

            // SET DESTINATION
            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }
        }
    };

    // Create a Player to start and stop the audio
    Method.Player = function (options) {
        
        // CREATE NEW BUFFERSOURCE
        this.source = ctx.createBufferSource();

        if (chk(options)) {
            console.error('Audio.Player options not set. Please set the source. Other options are optional.');
        } else {
            // SET SOURCE
            if (chk(options.source)) {
                console.error('Audio.Player is missing source. Please create a source with the Audio.Source constructor en set the AudioPlayer source to the created Audio.Source.buffer.');
            } else {
                this.source.buffer = options.source;
            }

            // SET DETUNE
            if (chk(options.detune)) {
                this.source.detune.value = this.source.detune.defaultValue;
            } else {
                this.source.detune.value = options.detune;
            }

            // SET LOOP
            if (chk(options.loop)) {
                this.source.loop = false;
            } else {
                this.source.loop = options.loop;

                // SET LOOPSTART
                if (chk(options.loopStart, true)) {
                    this.source.loopStart = 0;
                } else {
                    this.source.loopStart = options.loopStart / 1000;
                }

                // SET LOOPEND
                if (chk(options.loopEnd, true)) {
                    this.source.loopEnd = 0;
                } else {
                    this.source.loopEnd = options.loopEnd / 1000;
                }
            }

            // SET PLAYBACKRATE
            if (chk(options.playbackRate)) {
                this.source.playbackRate.value = this.source.playbackRate.defaultValue;
            } else {
                this.source.playbackRate.value = options.playbackRate;
            }

            // ONENDED CALLBACK
            if (chk(options.onended)) {
                this.source.onended = null;
            } else {
                this.source.onended = options.onended;
            }

            // SET NAME
            if (chk(options.name)) {
                this.source.name = 'AudioPlayer';
            } else {
                this.source.name = options.name;
            }
        }
    };

    // Start the Audio.Player()
    Method.Player.prototype.play = function (options) {
        
        // IF NO OPTIONS ARE SET, JUST PLAY
        if (chk(options)) {
            this.source.connect(ctx.destination);
            this.source.start(ctx.currentTime);
        } else {
            // CONNECT SOURCE
            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else if (options.destination === 'destination') {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }

            // SET DELAY - DEFAULT = 0
            if (chk(options.delay, true)) {
                this.source.start(ctx.currentTime);
            } else {
                this.source.start(ctx.currentTime + (options.delay / 1000));
            }
        }

        console.info('Playing ' + this.source.name);
        this.source.playing = true;
    };

    // Stop the Audio.Player()
    Method.Player.prototype.stop = function (options) {
        
        var self = this;

        if (chk(options)) {
            this.source.stop(ctx.currentTime);
            this.source.disconnect();
        } else {
            if (chk(options.delay, true)) {
                this.source.stop(ctx.currentTime);
                this.source.disconnect();
            } else {
                this.source.stop(ctx.currentTime + (options.delay / 1000));
                setTimeout(function () {
                    self.source.disconnect();
                }, options.delay);
            }
        }

        console.info('Stopped ' + this.source.name);
        this.source.playing = false;
    };

    // Create an Oscillator
    Method.Oscillator = function (options) {
        
        // CREATE OSCILLATORNODE
        this.source = ctx.createOscillator();

        if (chk(options)) {
            this.source.type = 'sine';
            this.source.frequency.value = 440;
        } else {

            // SET VALUES
            if (chk(options.type)) {
                this.source.type = 'sine';
            } else if (options.type !== 'sine' && options.type !== 'square' && options.type !== 'sawtooth' && options.type !== 'triangle') {
                this.source.type = 'sine';
                console.error('AudioOsc.type is not correct. Type can be: "sine", "square", "sawtooth" or "triangle".');
            } else {
                this.source.type = options.type;
            }

            if (chk(options.frequency, true)) {
                this.source.frequency.value = this.sourc.frequency.defaultValue;
            } else {
                this.source.frequency.value = options.frequency;
            }

            if (chk(options.detune, true)) {
                this.source.detune.value = this.source.detune.defaultValue;
            } else {
                this.source.detune.value = options.detune;
            }
        }
    };

    // Play the Oscillator
    Method.Oscillator.prototype.play = function (options) {
        
        if (chk(options)) {
            this.source.connect(ctx.destination);
            this.source.start(ctx.currentTime);
        } else {

            // SET VALUES
            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }

            if (chk(options.delay, true)) {
                this.source.start(ctx.currentTime);
            } else {
                this.source.start(ctx.currentTime + (options.delay / 1000));
            }
        }
        this.source.playing = true;
    };

    // Stop the Oscillator
    Method.Oscillator.prototype.stop = function (options) {
        
        var self = this;

        if (chk(options)) {
            this.source.stop(ctx.currentTime);
            this.source.disconnect();
        } else {

            // SET VALUES
            if (chk(options.delay, true)) {
                this.source.stop(ctx.currentTime);
                this.source.disconnect();
            } else {
                this.source.stop(ctx.currentTime + (options.delay / 1000));
                setTimeout(function () {
                    self.source.disconnect();
                }, options.delay);
            }

        }
        this.source.playing = false;
    };

    // Create a Convolver to create a reverb
    Method.Convolver = function (options) {
        
        // CREATE CONVOLVERNODE
        this.source = ctx.createConvolver();

        if (chk(options)) {
            console.error('Audio.Convolver options not set. Please at least set the source.');
        } else {
            // SET VALUES
            if (chk(options.normalize)) {
                this.source.normalize = true;
            } else {
                this.source.normalize = options.normalize;
            }

            if (chk(options.source)) {
                console.error('Audio.Convolver is missing source. Please create a source with the Audio.Source constructor and set the Audio.Convolver source to the created source.');
            } else {
                this.source.buffer = options.source;
            }

            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }
        }
    };
    
    // Create a Compressor
    Method.Compressor = function (options) {
        
        // CREATE COMPRESSOR NODE
        this.source = ctx.createDynamicsCompressor();
        console.log(this);
        
        if (chk(options)) {
            this.source.threshold.value = this.source.threshold.defaultValue;
            this.source.knee.value = this.source.knee.value;
            this.source.ratio.value = this.source.ratio.defaultValue;
            this.source.reduction.value = this.source.reduction.defaultValue;
            this.source.attack.value = this.source.attack.defaultValue;
            this.source.release.value = this.source.release.defaultValue;
            this.source.connect(ctx.destination);
        } else {
            
            if (chk(options.threshold, true)) {
                this.source.threshold.value = this.source.threshold.defaultValue;
            } else {
                this.source.threshold.value = options.threshold;
            }
            
            if (chk(options.knee, true)) {
                this.source.knee.value = this.source.knee.value;
            } else {
                this.source.knee.value = options.knee;
            }
            
            if (chk(options.ratio, true)) {
                this.source.ratio.value = this.source.ratio.defaultValue;
            } else {
                this.source.ratio.value = options.ratio;
            }
            
            if (chk(options.reduction, true)) {
                this.source.reduction.value = this.source.reduction.defaultValue;
            } else {
                this.source.reduction.value = options.reduction;
            }
            
            if (chk(options.attack, true)) {
                this.source.attack.value = this.source.attack.defaultValue;
            } else {
                this.source.attack.value = options.attack;
            }
            
            if (chk(options.release, true)) {
                this.source.release.value = this.source.release.defaultValue;
            } else {
                this.source.release.value = options.release;
            }
            
            if (chk(options.destination)) {
                this.source.connect(ctx.destination);
            } else {
                this.source.connect(options.destination.source);
            }
            
        }
        
    };
    
    return Method;
    
}());