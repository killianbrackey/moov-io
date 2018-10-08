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

  window.onload = function(e) {
    moov.checkLogin();
  };

  window.moov = {
    baseUrl: "https://api.moov.io/v1",
    requestId: nextId(),

    get: function(path, callback) {
      var req = new XMLHttpRequest();
      req.withCredentials = true
      req.open('GET', moov.baseUrl + path);
      req.responseType = 'text';
      req.setRequestHeader("x-request-id", moov.requestId)

      req.onload = function() {
        if (req.status == 403) {
          moov.error("Error: You\'re not logged in.");
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

    delete: function(path, callback) {
      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.open('DELETE', moov.baseUrl + path);
      req.responseType = 'text';

      req.setRequestHeader("x-request-id", moov.requestId)

      req.onload = function() {
        callback(req.response);
      };
      req.onerror = function(e) {
        callback(e);
      };
      req.send(null);
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
          moov.getACHFiles();
        }
      });
    },

    checkLogin: function() {
      moov.get('/users/login', function(resp) {
        moov.success("Already logged in. Loading ach files...");
        moov.getACHFiles();
      });
    },

    getACHFiles: function() {
      moov.get('/ach/files?limit=20', function (resp) {
        if (!resp) {
          moov.error("Whoops! Try logging in again.");
          return
        }

        var js = JSON.parse(resp);
        if (js.error) {
          moov.error(js.error);
        } else {
          moov.success("Found "+js.files.length+" files");
          moov.setupACHFileCreate();
          moov.showCurrentFiles(js.files);
        }
      });
    },

    // Take all .hidden elements with display: 'none' and
    // make them visible by setting display: 'inherit'.
    showHiddenFields: function() {
      var elements = document.querySelectorAll(".hidden");
      for (var i = 0; i < elements.length; i++) {
        var elm = elements[0];
        if (elm.nodeName == "TR") {
          elm.style.display = 'table-row';
          elm.style['vertical-align'] = 'inherit';
        } else {
          console.log("Trying to display other element: "+elm);
        }
      }
    },

    showCurrentFiles: function(files) {
      // Clear the current content
      var parent = document.querySelector("#ach-file-list");
      parent.innerHTML = '';

      var header = document.createElement("h4");
      if (files.length > 0) {
        header.innerHTML = 'Current Files';
      } else {
        header.innerHTML = 'No files created yet';
        header.style.fontWeight = 'normal'; // unbold
      }
      parent.appendChild(header);

      // Add each ACH file now
      var len = files.length;
      for (var i = 0; i < len; i++) {
        var file = files[i];
        var header = file.fileHeader;

        var elm = document.createElement("table");
        elm.cellPadding = 5;
        elm.style.borderBottom = '1px solid #ccc';
        elm.innerHTML = '<tr><td id="delete-file-'+file.id+'">&nbsp;</td><td>ABA</td><td>Name</td></tr>';
        elm.innerHTML += '<tr><td>Origin</td><td>'+header.immediateOrigin+'</td><td>'+header.immediateOriginName+'</td></tr>';
        elm.innerHTML += '<tr><td>Destination</td><td>'+header.immediateDestination+'</td><td>'+header.immediateDestinationName+'</td></tr>';
        parent.appendChild(elm);

        // Add a button to delete this file
        var delButton = document.createElement("input");
        delButton.type = "button";
        delButton.dataset.fileId = file.id;
        delButton.onclick = function(e) {
          moov.deleteACHFile(this.dataset.fileId);
        };
        delButton.value = "Delete";

        var q = "#delete-file-"+file.id;
        if (!q.match(/^([a-zA-Z0-9]*)$/)) {
          console.log("SKIPPING "+file.id+" due to invalid dom selector characters")
        } else {
          var td = document.querySelector(q);
          if (td) {
            td.appendChild(delButton);
          }
        }
      }
      parent.style.display = 'inherit';
    },

    setupACHFileCreate: function() {
      // file header
      document.querySelector("#immediateOrigin").value = "121042882";
      document.querySelector("#immediateOriginName").value = "My Bank Name"; // Wells Fargo
      document.querySelector("#immediateDestination").value = "231380104";
      document.querySelector("#immediateDestinationName").value = "Federal Reserve Bank"; // Citadel

      // batch
      document.querySelector("#serviceClassCode").value = "220";
      document.querySelector("#standardEntryClassCode").value = "PPD";
      document.querySelector("#companyName").value = "Your Company, Inc"; // Wells Fargo
      document.querySelector("#companyIdentification").value = "121042882";
      document.querySelector("#companyEntryDescription").value = "Online Order";
      // bh.EffectiveEntryDate = time.Now().AddDate(0, 0, 1) // TODO(adam): ???
      document.querySelector("#ODFIIdentification").value = "121042882";

      // make form visible
      document.querySelector("#file-header").style.display = "inherit";
    },

    createACHFile: function() {
      var body = JSON.stringify({
        immediateOrigin:          document.querySelector("#immediateOrigin").value,
        immediateOriginName:      document.querySelector("#immediateOriginName").value,
        immediateDestination:     document.querySelector("#immediateDestination").value,
        immediateDestinationName: document.querySelector("#immediateDestinationName").value,
      });

      // Create file w/ header
      moov.post('/ach/files/create', body, function (resp) {
        var js = JSON.parse(resp);
        var batch = JSON.stringify({
          id:                      js.id,
          serviceClassCode:        parseInt(document.querySelector("#serviceClassCode").value, 10),
          standardEntryClassCode:  document.querySelector("#standardEntryClassCode").value,
          companyName:             document.querySelector("#companyName").value,
          companyIdentification:   document.querySelector("#companyIdentification").value,
          companyEntryDescription: document.querySelector("#companyEntryDescription").value,
          ODFIIdentification:      document.querySelector("#ODFIIdentification").value,
        });
        moov.addBatchToFile(js.id, batch);
        if (moov.validateFile(js.id)) {
          // only refresh files on validate success
          moov.getACHFiles();
        } else {
          // TODO(adam): we want to refresh, but not trample moov.error's value
          // (validateFile sets that on error)
        }

      });
    },

    deleteACHFile: function(id) {
      moov.delete('/ach/files/'+id, function(resp) {
        if (resp) {
          moov.getACHFiles();
        }
      });
    },

    addBatchToFile: function(id, body) {
      moov.post('/ach/files/'+id+'/batches/', body, function (resp) {
        if (!resp) {
          console.log(resp);
        }
      });
    },

    // validateFile returns a boolean indicating if the file validates
    // without errors.
    validateFile: function(id) {
      moov.get('/ach/files/'+id+'/validate', function (resp) {
        // Show the validation error (if there is one)
        try {
          var js = JSON.parse(resp);
          if (js.error) {
            moov.error("ERROR: "+js.error);
            console.log(js.error);
            return false
          }
        } catch (e) {
          // do nothing, we got success (probably)
          console.log("ERROR: "+e);
        }
        return true
      });
    },

    getFileContents: function(id) {
      moov.get('/ach/files/'+id+'/contents', function (resp) {
        console.log(resp);
      });
    },

  };
})()
