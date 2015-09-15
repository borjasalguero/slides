(function(exports) {
  var _isPublished = false;
  var _participants = 0;
  var _videoLocalContainer = _videoRemoteContainer = null;
  var _session = null;
  var _apiKey = '45341902';
  var _sessionId = '1_MX40NTM0MTkwMn5-MTQ0MjI0MzM1MTk0N351YmMzWmpOTXJWaTcyeDNkT0JSZ2RvVDF-fg';
  var _token = 'T1==cGFydG5lcl9pZD00NTM0MTkwMiZzaWc9OTUyZmMxMTRlZDdkZDBiODEwNDAxMTQ1OWVkODAxZWRmN2YzZTU0Mjpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UTTBNVGt3TW41LU1UUTBNakkwTXpNMU1UazBOMzUxWW1NeldtcE9UWEpXYVRjeWVETmtUMEpTWjJSdlZERi1mZyZjcmVhdGVfdGltZT0xNDQyMjQ0NjQ2Jm5vbmNlPTAuMDQ1NDg4NDE0MDM3OTE5MzcmZXhwaXJlX3RpbWU9MTQ0NDgzNTI5MCZjb25uZWN0aW9uX2RhdGE9';
  var _constraints = {
    video: true,
    audio: true
  };

  function _resetHTML() {
    if (_videoLocalContainer) {
      _videoLocalContainer.innerHTML = '<div id="video-opentok"></div>';
    }
    
    if (_videoRemoteContainer) {
      _videoRemoteContainer.innerHTML = '<div id="video-opentok-fs"></div>';
    }
  }

  var TokBox = {
    start: function(videoLocalContainer, videoRemoteContainer) {
      _videoLocalContainer = videoLocalContainer;
      _videoRemoteContainer = videoRemoteContainer;
      _session = OT.initSession(_apiKey, _sessionId);

      _session.on({
        streamCreated: function(event) {
          _participants++;
          console.log('##### ' + _participants);
          if (_participants === 3) {
            console.log('----------------------------');
            console.log(' AQUI ESTAMOS CON LA TV ');
            console.log('----------------------------');
            return;
          }
          document.querySelector('.video-fullscreen').classList.remove('connecting');
          setTimeout(function() {
            document.querySelector('.video-status').classList.remove('animate');
            document.querySelector('.video-status').textContent = 'Connected';
            // As we don't have multi party calls yet there will be only one peer.
            var subscriber =
              _session.subscribe(
                event.stream,
                'video-opentok-fs',
                null,
                function onSubscribe(error) {
                  if (error) {
                    console.log('OpenTok: ' + error.message);
                  } else {
                    console.log('OpenTok: SUBSCRIBED');


                    document.getElementById('video-opentok-fs').style.width = 'auto';
                    document.getElementById('video-opentok-fs').style.height = '100%';
                  }
              }
            );
            subscriber.on({
              loaded: function() {
                if (_participants > 1) {
                  return;
                } 
                console.log('OpenTok: SUBSCRIBER LOADED');
                document.getElementById('video-opentok-fs').style.width = 'auto';
                document.getElementById('video-opentok-fs').style.height = '100%';
                
                
              }
            });
          }, 1000);
          
        },
        streamDestroyed: function(event) {
          console.log('STREAM DESTROYED ' + _participants);
          if (--_participants === 1) {
            TokBox.clean();
            document.getElementById('calllog-panel').classList.add('current');
            document.getElementById('call-panel').classList.remove('current');
          }
        }
      });


      _session.connect(_token, function(e) {
        if (e) {
          console.log('OpenTok: ' + e.message)
          return;
        }
        // OT.setConstraints(_constraints);
        _session.publish(
          'video-opentok',
          null,
          function onPublish(ee) {
            if (ee) {
              console.log('OpenTok: ' + ee.message);
            } else {
              console.log('OpenTok: STREAM PUBLISHED');
              if (_isPublished) {
                return;
              }
              _isPublished = true;
              _participants++;
              console.log('######  ' + _participants);
              setTimeout(function() {
                document.getElementById('video-opentok').style.width = '90px';
                document.getElementById('video-opentok').style.height = '90px';
              }, 1000);
            }
          }
        );
      });
    },
    clean: function() {
      _session && _session.disconnect();
      if (_videoLocalContainer) {
        _videoLocalContainer.innerHTML = '';
      }
      if (_videoRemoteContainer) {
        _videoRemoteContainer.innerHTML = '';
      }
      _session = null;
      _participants = 0;
      _isPublished = false;
      document.querySelector('.video-fullscreen').classList.add('connecting');
      document.querySelector('.video-status').classList.add('animate');
      document.querySelector('.video-status').textContent = 'Connecting';
      _resetHTML();
    }
  };

  exports.TokBox = TokBox;

})(this);

