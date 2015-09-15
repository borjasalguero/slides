// 'use strict';

// /*
//  * This app is the fallback for FoxCast where Addon are not available
//  * in the platform (OS Version < 2.2). In this case we will send the
//  * URL to our server in a different manner: using WebActivities.
//  */

window.onload = function() {
  var videoel = document.querySelector('.video-fullscreen');
  if ('ontouchstart' in window) {
    videoel.addEventListener(
      'touchstart',
      function onmd(evt) {
        console.log('HEMOS DETECTADO UN touchstart ');
        var y1 = evt.changedTouches[0].pageY;
        videoel.addEventListener(
          'touchend',
          function onma(evt) {
            videoel.removeEventListener('mouseup', onma);
            console.log('HEMOS DETECTADO UN touchend');
            var y2 = evt.changedTouches[0].pageY;
            var result = y1 - y2;
            console.log('EL RESULT ES ' + result);
            if (result > 100) {
              console.log('Para la TV')
              var req = new XMLHttpRequest();
              req.open('GET', 'http://arcane-brushlands-6872.herokuapp.com/start', false); 
              req.send(null);
            } else if (result < -100){
              console.log('De vuelta al movil');
              var req = new XMLHttpRequest();
              req.open('GET', 'http://arcane-brushlands-6872.herokuapp.com/stop', false); 
              req.send(null);
              
            }
          }
        );
      }
    );

  } else {
    videoel.addEventListener(
      'mousedown',
      function onmd(evt) {
        console.log('HEMOS DETECTADO UN MOUSEDOWN ' + evt.screenY);
        var y1 = evt.screenY;
        videoel.addEventListener(
          'mouseup',
          function onma(evt) {
            videoel.removeEventListener('mouseup', onma);
            console.log('HEMOS DETECTADO UN MOUSEUP ' + evt.screenY);
            var y2 = evt.screenY;
            var result = y1 - y2;
            if (result > 100) {
              var req = new XMLHttpRequest();
              req.open('GET', 'http://arcane-brushlands-6872.herokuapp.com/start', false); 
              req.send(null);
              console.log('Para la TV')
            } else if (result < -100){
              var req = new XMLHttpRequest();
              req.open('GET', 'http://arcane-brushlands-6872.herokuapp.com/stop', false); 
              req.send(null);
              console.log('De vuelta al movil');
            }
          }
        );
      }
    );
  }
  

  document.getElementById('make-call').addEventListener(
    'click',
    function() {
      document.getElementById('call-panel').classList.add('current');
      document.getElementById('calllog-panel').classList.remove('current');
      TokBox.start(
        document.querySelector('.video-mini'),
        document.querySelector('.video-fullscreen')
      );
    }
  );

  document.getElementById('hangup').addEventListener(
    'click',
    function() {
      TokBox.clean();
      document.getElementById('calllog-panel').classList.add('current');
      document.getElementById('call-panel').classList.remove('current');
      
    }
  );
  
  
  // Initialize collapse button
  // TokBox.start();
      
//   function register(endpoint) {
//     alert('AQUI REGISTRAMOS EL CLIENTE! con ENDPOINT: ' + endpoint);
//   }

//   document.getElementById('delete-button').addEventListener(
//     'click',
//     function() {
//       EndpointManager.remove().then(function() {
//         var messagesDongle = document.getElementById('messages-dongle');
//         messagesDongle.textContent = 'TV Removed';
//         messagesDongle.setAttribute('color', 'red');
//         messagesDongle.removeAttribute('loading');
//       });
//     }
//   );

//   EndpointManager.get().then(function(endpoint) {
//     alert('LO TENEMOS!');
//     console.log(JSON.stringify(endpoint));
//   }).catch(function() {
//     alert('NO LO TENEMOS!');

//     var endpoint;
//     if (!navigator.push) {
//       endpoint = 'fake_endpoint';
//       alert('NOTENEMOSPUSH');
//       register(endpoint);
//     } else {
//       SimplePush.createChannel(
//         'tv-notifications',
//         function() {
//           alert('notificación PUSH recibida!');
//           // TODO Aquí haría mi 
//         },
//         function(e, endpoint) {
//           if (e) {
//             alert('ERROR: Unable to create the endpoint');
//             return;
//           }
//           alert('registrado!');
//           register(endpoint);
//         }
//       )
//     }
//       // // ConnectedTV.register('endpoint_', 'ejemplo@otro.es');
//       // ConnectedTV.register('endpoint_', 'ejemplo@otro.es', function(e, result) {
//       //   console.log('#####################');
//       //   console.log('El valor que hemos guardado es:');
//       //   console.log(JSON.stringify(result));

//       //   EndpointManager.save(result).then(function() {
//       //     alert('VAMOS!!!');
//       //   })

//       //   // ConnectedTV.get(result._id, function(e, retrieved) {
//       //   //   console.log('#####################');
//       //   //   console.log('El valor que hemos RECUPERADO es:');
//       //   //   console.log(JSON.stringify(retrieved));
//       //   //   ConnectedTV.call(result._id, 'destino@otro.es', function(e, retrieved) {
//       //   //     console.log('######## LA LLAMADA SE REALIZO CON EXITO #############');
//       //   //   });
//       //   // });

//       // });

//   });


//   // FLUJO AL ARRANCAR
//   // asyncstorage {} existe?
//   // NO
//     // REGISTRO Y RECUPERO. PINTO
//   // SI
//     // RECUPERO. PINTO

//   // AÑADIR DISPOSITIVO SECUNDARIO
//   // Escaneo QR y añado. El QR es el endpoint. Tengo que especificar el type.







//   // // ConnectedTV.register('endpoint_', 'ejemplo@otro.es');
//   // ConnectedTV.register('endpoint_', 'ejemplo@otro.es', function(e, result) {
//   //   console.log('#####################');
//   //   console.log('El valor que hemos guardado es:');
//   //   console.log(JSON.stringify(result));
//   //   ConnectedTV.get(result._id, function(e, retrieved) {
//   //     console.log('#####################');
//   //     console.log('El valor que hemos RECUPERADO es:');
//   //     console.log(JSON.stringify(retrieved));
//   //     ConnectedTV.call(result._id, 'destino@otro.es', function(e, retrieved) {
//   //       console.log('######## LA LLAMADA SE REALIZO CON EXITO #############');
//   //     });
//   //   });

//   // });




//   // DongleManager.get().then(function(dongle_id) {
//   //   var messagesDongle = document.getElementById('messages-dongle');
//   //   messagesDongle.textContent = 'TV Paired!';
//   //   messagesDongle.setAttribute('color', 'green');
//   //   messagesDongle.removeAttribute('loading');

//   //   navigator.mozSetMessageHandler('activity', function(activityRequest) {
//   //     document.body.classList.remove('scanning');
//   //     var url = activityRequest.source.data.url;
//   //     if(!url || url.length === 0){
//   //       window.close();
//   //       return;
//   //     }
//   //     // Request to the server to create a new 'media' content
//   //     // based on the URL
//   //     FoxCast.create(
//   //       {
//   //         url: url,
//   //         dongle_id: dongle_id,
//   //         action:  'open'
//   //       }, function(e, result) {
//   //         if (e) {
//   //           messagesDongle.textContent = 'Error :(';
//   //           messagesDongle.setAttribute('color', 'red');
//   //           console.log('ERROR WHILE CREATING MEDIA ' + JSON.stringify(e));
//   //           setTimeout(function(){
//   //             window.close();
//   //           }, 1000)
//   //           return;
//   //         }

//   //         setTimeout(function(){
//   //           messagesDongle.textContent = 'Content sent!';
//   //           messagesDongle.setAttribute('color', 'dark-green');
//   //         }, 500);

//   //         setTimeout(function(){
//   //           window.close();
//   //         }, 1500);
//   //       }
//   //     );
//   //   });
//   // });
//   // document.getElementById('cancel-share').addEventListener(
//   //   'click',
//   //   function(){
//   //     window.close();
//   //   }
//   // );
//   // document.getElementById('delete-button').addEventListener(
//   //   'click',
//   //   function() {
//   //     DongleManager.remove().then(function() {
//   //       var messagesDongle = document.getElementById('messages-dongle');
//   //       messagesDongle.textContent = 'TV Removed';
//   //       messagesDongle.setAttribute('color', 'red');
//   //       setTimeout(function(){
//   //         window.location.reload();
//   //       }, 1500)
//   //     });
//   //   }
//   // );
};
