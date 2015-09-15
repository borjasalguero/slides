(function(exports) {
  'use strict';


  /*
   * This class will be in charge of the connections with the server.
   */

  // var  SERVER_URL = 'http://foxcast-dev.herokuapp.com/api/v1';
  var  SERVER_URL = 'http://localhost:5000/api/v1';

  // POST http://foxcast-dev.herokuapp.com/api/v1/dongle/register
  // POST http://foxcast-dev.herokuapp.com/api/v1/:id/create
  // GET http://foxcast-dev.herokuapp.com/api/v1/:id/

  var Server = {
    request: function(target, requestType, data, cb) {

      if (typeof cb !== 'function') {
        cb = function foo(){};
      }


      // Parse data to XHR Data before sending it
      if (data) {
        var dataXHR = new FormData();
        for (var key in data) {
          dataXHR.append(key, data[key]);
        }
      }

      // Create URI. Based on the Server, we just need the target ('dongle' or dongle:id)
      // and action if required

      var uri = SERVER_URL + target;
      console.log(uri);
      

      var xhr = new XMLHttpRequest({mozSystem: true});

      xhr.onload = function onLoad(evt) {
        if (xhr.status === 200 || xhr.status === 0) {
          cb(null, JSON.parse(xhr.response));
        } else {
          cb(xhr.status);
        }
      };
      xhr.open(requestType, uri, true);
      xhr.onerror = function onError(e) {
        console.error('onerror en xhr ' + xhr.status);
        cb(e);
      }
      xhr.send(dataXHR);
    }
  };


  var ConnectedTV = {
    register: function(endpoint, identity, callback) {
      alert('REGISTER');
      Server.request(
        '/endpoint/register',
        'POST',
        {
          endpoint: endpoint,
          identity: identity
        },
        callback
      );
    },
    get: function(id, callback) {
      alert('GET');
      Server.request(
        '/endpoint/' + id,
        'GET',
        null,
        callback
      );
    },
    call: function(id, destination, callback) {
      alert('CALL');
      Server.request(
        '/endpoint/' + id + '/call',
        'POST',
        {
          destination: destination
        },
        callback
      );
    },
    addDevice: function(dongle_id, callback) {
      // Server.request(
      //   dongle_id,
      //   null,
      //   'GET',
      //   null,
      //   callback
      // );
    },
    removeDevice: function(params, callback) {
      // Server.request(
      //   params.dongle_id,
      //   'create',
      //   'POST',
      //   params,
      //   callback
      // );
    }
  };


  exports.ConnectedTV = ConnectedTV;
})(window);
