(function() {
  if (window.moov !== undefined) {
    console.log("before: "+window.moov);
  }

  function nextId() {
    var out = ""
    for (i = 0; i < 20; i++) {
      out += String.fromCharCode((Math.random()*25+97).toFixed()) // 97 is ASCII/UTF-8 "a"
    }
    return out
  }

  window.onload = function(e) {
    moov.checkLogin();
  };

  window.moov = {
    // baseUrl: 'https://api.moov.io/v1',
    baseUrl: "http://localhost:9000/v1", // local dev
    requestId: nextId(),

    get: function(path, callback) {
      var req = new XMLHttpRequest();
      req.withCredentials = true
      req.open('GET', moov.baseUrl + path);
      req.responseType = 'text';
      req.setRequestHeader("x-request-id", moov.requestId)

      req.onload = function() {
        if (req.status == 403) {
          moov.error("Error: You\'re not logged in. Try <a href='/demo'>logging in</a> (or signing up).");
        } else {
          callback(req.response);
        }
      };
      req.onerror = function(e) {
        moov.error("Whoops! Something went wrong...");
        console.log(e);
      };
      req.send(null);
    },

    post: function(path, body, callback) {
      var req = new XMLHttpRequest();
      req.withCredentials = true
      req.open('POST', moov.baseUrl + path);
      req.responseType = 'text';
      req.setRequestHeader("x-request-id", moov.requestId)
      req.setRequestHeader("content-type", "application/json");

      req.onload = function() {
        callback(req.response);
      };
      req.onerror = function(e) {
        callback(e);
      };
      req.send(body);
    },

    // update error element
    error: function(msg) {
      var elm = document.querySelector("#dialog")
      elm.innerHTML = msg
      elm.style.display = 'inherit';
      elm.classList = ['moov-pink'];
    },
    clearError: function() {
      var elm = document.querySelector("#dialog")
      elm.style.display = 'none';
      elm.innerHTML = "";
    },

    // update 'success' element
    success: function(msg) {
      var elm = document.querySelector("#dialog")
      elm.innerHTML = msg;
      elm.style.display = 'inherit';
      elm.classList = ['moov-blue'];
    },

    // userland methods
    signup: function() {
      var name = document.querySelector("#signup-name");
      var email = document.querySelector("#signup-email");
      var password = document.querySelector("#signup-password");

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
        "phone": "555.555.5555", // hardcoded so demos have less to fill in
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
        if (js.error) {
          moov.error(js.error);
        } else {
          // happy path, trigger login
          moov.login();
        }
      })
    },

    login: function() {
      // TODO: abstract validation / value getter
      var email = document.querySelector("#signup-email");
      var password = document.querySelector("#signup-password");

      var body = {
        "email": email.value,
        "password": password.value,
      };
      moov.post('/users/login', JSON.stringify(body), function (resp) {
        var js = JSON.parse(resp);
        if (js.error) {
          moov.error(js.error);
        } else {
          moov.success("Logged in! Loading ach files...");
          moov.checkLogin();
        }
      });
    },

    checkLogin: function() {
      moov.get('/users/login', function(resp) {
        moov.success("Already logged in!");
        moov.fillOAuth2ClientCredentials();

        moov.generateCurlAuthCheck("#auth-check-cmd");
        moov.fillExampleAuthCheckResponse("#auth-check-resp");

        moov.generateCurlListFiles("#ach-files-cmd");
        moov.fillExampleACHFilesList("#ach-files-resp");

        moov.generateCurlOFACSearch("#ofac-search-cmd");
        moov.fillExampleOFACSearch("#ofac-search-resp");
      });
    },

    fillOAuth2ClientCredentials: function() {
      moov.get('/oauth2/clients', function(resp) {
        var clients = JSON.parse(resp)
        if (clients && clients != null) {
          var results = "<h3>OAuth2 Clients</h3><table><thead><tr><td>Client ID</td><td>Client Secret</td><td>Domain</td></tr></thead>";
          for (var i = 0; i < clients.length; i++) {
            if (i == 0) {
              // When we have an OAuth client then create curl for making a token
              moov.generateCurlOAuthToken("#oauth-token-curl-cmd", clients[i].client_id, clients[i].client_secret);
            }
            // Write OAuth client to the page
            results += "<tr><td><input type='text' class='oauth-clientid' value='" + clients[i].client_id + "' /></td>";
            results += "<td><input type='text' class='oauth-clientsecret' value='" + clients[i].client_secret + "' /></td>";
            results += "<td>" + clients[i].domain + "</td></tr>";
          }
          results += "</table>";
          document.querySelector("#results").innerHTML = results;
        } else {
          moov.post("/oauth2/client", null, function (resp) {
            // console.log(JSON.parse(resp));
          });
          return moov.fillOAuth2ClientCredentials()
        }
      });
    },

    cookie: function() {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[0].startsWith("moov")) {
          return cookies[0]
        }
      }
      return ""
    },

    generateCurlAuthCheck: function(id) {
      document.querySelector(id).innerHTML = "curl -H 'cookie: " + moov.cookie() + "' '" + moov.baseUrl + "/users/login'<br />";
    },
    fillExampleAuthCheckResponse: function(id) {
      moov.get('/users/login', function(resp) {
        if (resp != null) {
          // pretty print JSON
          document.querySelector(id).innerHTML = JSON.stringify(JSON.parse(resp), null, 2);
        }
      });
    },

    generateCurlOAuthToken: function(id, clientId, clientSecret) {
      document.querySelector(id).innerHTML = "curl -H 'cookie: " + moov.cookie() + "' '" + moov.baseUrl + "/oauth2/token?grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret + "'<br />";
    },

    generateCurlListFiles: function(id) {
      document.querySelector(id).innerHTML = "curl -H 'cookie: " + moov.cookie() + "' '" + moov.baseUrl + "/ach/files'<br />";
    },
    fillExampleACHFilesList: function(id) {
      moov.get('/ach/files', function(resp) {
        if (resp != null) {
          document.querySelector(id).innerHTML = JSON.stringify(JSON.parse(resp), null, 2);
        }
      });
    },

    generateCurlOFACSearch: function(id) {
      document.querySelector(id).innerHTML = "curl -H 'cookie: " + moov.cookie() + "' '" + moov.baseUrl + "/ofac/search?name=nicolas+maduro&limit=1'<br />";
    },
    fillExampleOFACSearch: function(id) {
      moov.get('/ofac/search?name=nicolas+maduro&limit=1', function(resp) {
        if (resp != null) {
          document.querySelector(id).innerHTML = JSON.stringify(JSON.parse(resp), null, 2);
        }
      });
    },
  };
})()
