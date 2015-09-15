(function(exports) {
  'use strict';
  var endpointCached;
  var ENDPOINT_NAME = 'endpoint';

  // var canvas, video, ctx;
  
  // function drawCanvas() {
  //   ctx.drawImage(video,0,0);
  //   try{
  //     qrcode.decode();
  //   }
  //   catch(e){
  //     setTimeout(drawCanvas, 500);
  //   };
  // }

  // function launchDonglePairing() {
  //   return new Promise(function(resolve, reject) {
  //     navigator.mozGetUserMedia(
  //       {
  //         video: {
  //           minWidth: 300,
  //           minHeight: 300
  //         },
  //         audio: false
  //       },
  //       function(stream) {
  //         document.body.classList.add('scanning');
  //         var pairingPanel = document.createElement('div');
  //         pairingPanel.id = 'pairing-panel';
  //         document.body.appendChild(pairingPanel);
  //         // Create a CB from the library. Will be executed
  //         // once the QR will be resolved.
  //         qrcode.callback = function(text) {
  //           document.body.removeChild(pairingPanel);
  //           document.body.classList.remove('scanning');
  //           resolve(text);
  //         }

  //         video = document.createElement('video');
  //         video.muted = true;
  //         video.mozSrcObject = stream;
  //         pairingPanel.appendChild(video);
  //         video.play();
  //         video.addEventListener('canplay', function() {
  //           function renderCanvas() {
  //             var p = document.createElement('p');
  //             var w = video.videoWidth;
  //             var h = video.videoHeight;
  //             p.textContent = 'width ' + w + 'heigth ' + h;
  //             pairingPanel.appendChild(p);

  //             canvas = document.createElement('canvas');
  //             canvas.id = 'qr-canvas';
  //             canvas.style.width = w + "px";
  //             canvas.style.height = h + "px";
  //             canvas.width = w;
  //             canvas.height = h;
  //             pairingPanel.appendChild(canvas);
  //             ctx = canvas.getContext("2d");
  //             ctx.clearRect(0, 0, w, h);

  //             setTimeout(drawCanvas, 500);
  //           }
  //           // This is a HACK. 'canplay' is not working as expected
  //           // so we need to wait until having the first working frame
  //           // in the video stream for rendering the canvas.
  //           var pollingInterval = window.setInterval(function() {
  //             if (video.mozPaintedFrames == 0) {
  //               return;
  //             }
  //             window.clearInterval(pollingInterval);
  //             renderCanvas()
  //           }, 100);
  //         });
  //       },
  //       function(error) {
  //         console.log('Error while showing own video stream through gUM ' + JSON.stringify(error));
  //         if (!pairingPanel) {
  //           return;
  //         }
  //         document.body.classList.remove('scanning');
  //         document.body.removeChild(pairingPanel);
  //       }
  //     );
  //   }); // End of the promise
  // }

  var EndpointManager = {
    get: function() {
      return new Promise(function(resolve, reject) {
        if (endpointCached) {
          resolve(endpointCached);
          return;
        }

        asyncStorage.getItem(
          ENDPOINT_NAME,
          function onRetrieved(endpoint) {
            if (!endpoint) {
              alert('NO EXISTE AUN UN ENDPOINT GUARDADO!');
              reject();
            }

            endpointCached = endpoint;
            resolve(JSON.parse(endpointCached));
          }
        );
      });
    },
    save: function(endpoint) {
      return new Promise(function(resolve, reject) {
        asyncStorage.setItem(
          ENDPOINT_NAME,
          JSON.stringify(endpoint),
          function() {
            endpointCached = endpoint;
            resolve();
          }
        );
      });
    },
    remove: function() {
      return new Promise(function(resolve, reject) {
        asyncStorage.setItem(
          ENDPOINT_NAME,
          null,
          function() {
            if (window.navigator.mozSetMessageHandler) {
              SimplePush.reset();
            }
            
            endpointCached = null;
            // video = ctx = canvas = null;
            resolve();
          }
        );
      });
    }
  };

  exports.EndpointManager = EndpointManager;
})(window);
