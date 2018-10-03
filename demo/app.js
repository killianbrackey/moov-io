// moov ACH demo
// For now just attach things straight onto window.moov
// TODO: cleanup
(function() {
  if (window.moov !== undefined) {
    console.log("before: "+window.moov);
  }

  function nextId() {
    var out = ""
    for (i = 0; i < 20; i++) {
      out += String.fromCharCode((Math.random()*26+97).toFixed()) // 97 is ASCII/UTF-8 "a"
    }
    return out
  }
  
  window.moov = {
    // baseUrl: "https://api.moov.io/v1",
    baseUrl: "http://localhost:8080",
    get: function(path, callback) {
      var req = new XMLHttpRequest();
      req.open('GET', moov.baseUrl + path);
      req.responseType = 'json';
      req.setRequestHeader("x-request-id", moov.requestId)

      req.onload = function() {
        callback(req.response);
      };
      req.onerror = function(e) {
        var elm = document.querySelector("#signup-error")
        console.dir(e);
        elm.innerHTML = "Whoops! Something went wrong...";
        elm.style.display = 'inherit';
      };
      req.send(null);
    },
    
    post: function(path, body, callback) {
      var req = new XMLHttpRequest();
      req.open('POST', moov.baseUrl + path);
      req.responseType = 'json';
      req.setRequestHeader("x-request-id", moov.requestId)

      req.onload = function() {
        callback(req.response);
      };
      req.onerror = function(e) {
        var elm = document.querySelector("#signup-error")
        console.dir(e);
        elm.innerHTML = "Whoops! Something went wrong...";
        elm.style.display = 'inherit';
      };
      req.send(body);
    },
    
    requestId: nextId(),  

    // update error element
    error: function(msg) {
      var elm = document.querySelector("#signup-error")
      elm.innerHTML = msg
      elm.style.display = 'inherit';
    },
    clearError: function() {
      var elm = document.querySelector("#signup-error")
      elm.style.display = 'none';
      elm.innerHTML = "";
    },

    // userland methods
    signup: function() {
      var name = document.querySelector("#signup-name");
      var email = document.querySelector("#signup-email");
      var password = document.querySelector("#signup-password");
      // var phone = document.querySelector("#signup-phone");

      if (!name.value != "") {
        moov.error("Whoops, please provide your name")
        name.focus();
        return
      }
      if (!email.value.includes("@")) {
        moov.error("Whoops, please provide in your email");
        email.focus();
        return
      }
      if (password.value == "") {
        moov.error("Whoops, please provide a password")
        password.focus();
        return
      }
      moov.clearError();

      var nameParts = name.value.split(' ');

      // make our request
      var body = {
        "email": email.value,
        "password": password.value,
        "phone": "555.555.5555",
      };
      if (nameParts.length > 1) {
        body.firstName = nameParts[0]
        body.lastName = nameParts[1]
      } else {
        body.firstName = name.value
        body.lastName = ""
      }

      moov.post('/users/create', JSON.stringify(body), function (resp) {
        var js = JSON.parse(resp);
        if (js.error !== undefined) {
          console.log(js.error);
        }
        console.log(js);

        // js.id // TODO(adam)
      })
    },

    createOAuth2Client: function(cookie) {
      moov.post('/oauth2/clients', null, function (resp) {
        var js = JSON.parse(resp)
        if (js.error !== undefined) {
          console.log(js.error);
        }
        console.log(js);
      });
    },

    createOAuthToken: function(clientId, clientSecret) {
      moov.post(
        '/oauth/token?grant_type=client_credentials&client_id='+clientId+'&client_secret='+clientSecret,
        null, // body
        function (resp) {
          console.log(resp);
        }
      );
    },

    getACHFiles: function() {
      moov.get('/ach/files', function (resp) {
        console.log(resp);
      });
    },

    
  };
})()
