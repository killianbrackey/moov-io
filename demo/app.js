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
      out += String.fromCharCode((Math.random()*25+97).toFixed()) // 97 is ASCII/UTF-8 "a"
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
        elements[i].classList.remove("hidden");
      }
      document.querySelector("#show-details").style.display = 'none';
    },

    // Takes a json array of File objects and renders them to the page (in summary).
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
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // TODO(adam):
        if (!file.id.match(/^([a-zA-Z0-9]*)$/)) {
          console.log("SKIPPING '"+file.id+"' due to invalid dom selector characters");
          files.splice(i, 1); // remove invalid file from array
          continue
        }
        var header = file.fileHeader;

        var elm = document.createElement("table");
        elm.cellPadding = 5;
        elm.style.borderBottom = '1px solid #ccc';
        elm.innerHTML = '<tr><td id="delete-file-'+file.id+'">&nbsp;</td><td>ABA</td><td>Name</td><td>Valid?</td></tr>';
        elm.innerHTML += '<tr><td>Origin</td><td>'+header.immediateOrigin+'</td><td>'+header.immediateOriginName+'</td><td id="file-status-'+file.id+'"></td></tr>';
        elm.innerHTML += '<tr><td>Destination</td><td>'+header.immediateDestination+'</td><td>'+header.immediateDestinationName+'</td><td id="show-contents-'+file.id+'"></td></tr>';
        parent.appendChild(elm);

        // Add a button to delete this file
        var delButton = document.createElement("input");
        delButton.type = "button";
        delButton.dataset.fileId = file.id;
        delButton.onclick = function(e) {
          moov.deleteACHFile(this.dataset.fileId);
        };
        delButton.value = "Delete";

        // Update validation status
        moov.validateFile(file.id, function(fileId) {
          return function(success) {
            var elm = document.querySelector('#file-status-'+fileId)
            if (success === true) {
              elm.innerHTML = '\u2705'; // green checkmark
            } else {
              elm.innerHTML = '\u274C'; // red X
            }
          }
        }(file.id)); // pass current file.id to closure

        // Button to show ACH plaintext
        var contentsButton = document.createElement("input");
        contentsButton.type = "button";
        contentsButton.dataset.fileId = file.id;
        contentsButton.onclick = function(e) {
          moov.getFileContents(this.dataset.fileId);
        };
        contentsButton.value = "Raw File";

        var holder = document.querySelector("#show-contents-"+file.id);
        holder.appendChild(contentsButton);

        document.querySelector("#delete-file-"+file.id).appendChild(delButton);
      }
      parent.style.display = 'inherit';
    },

    setupACHFileCreate: function() {
      // file header
      document.querySelector("#immediateOrigin").value = "121042882";
      document.querySelector("#immediateOriginName").value = "My Bank Name"; // Wells Fargo
      document.querySelector("#immediateDestination").value = "231380104";
      document.querySelector("#immediateDestinationName").value = "Federal Reserve Bank"; // Citadel

      // Batch
      document.querySelector("#serviceClassCode").value = "200";
      document.querySelector("#standardEntryClassCode").value = "PPD";
      document.querySelector("#companyName").value = "Your Company, Inc"; // Wells Fargo
      document.querySelector("#companyIdentification").value = "121042882";
      document.querySelector("#companyEntryDescription").value = "Online Order";
      // bh.EffectiveEntryDate = time.Now().AddDate(0, 0, 1) // TODO(adam): ???
      document.querySelector("#ODFIIdentification").value = "12104288";

      // Entry Detail
      document.querySelector("#transactionCode").value = "22";
      document.querySelector("#RDFIIdentification").value = "23138010";
      document.querySelector("#checkDigit").value = "4";
      document.querySelector("#DFIAccountNumber").value = "81967038518      "; // TODO(adam): is the padding required?
      document.querySelector("#amount").value = "100000";
      document.querySelector("#identificationNumber").value = "#83738AB#      ";
      document.querySelector("#individualName").value = "Steven Tander         ";
      document.querySelector("#discretionaryData").value = "  ";
      document.querySelector("#traceNumber").value = "121042880000001";
      document.querySelector("#addendum-paymentRelatedInformation").value = "Bonus for working on #OSS!";
      document.querySelector("#category").value = "Forward";

      // make form visible
      document.querySelector("#file-header").style.display = "inherit";
    },

    createACHFile: function() {
      var fileId = nextId();
      var body = JSON.stringify({
        "id": fileId,
        "fileHeader": {
          "id": fileId,
          "immediateOrigin": document.querySelector("#immediateOrigin").value,
          "immediateOriginName": document.querySelector("#immediateOriginName").value,
          "immediateDestination": document.querySelector("#immediateDestination").value,
          "immediateDestinationName": document.querySelector("#immediateDestinationName").value,
          "fileCreationDate": "2018-10-08T00:00:00Z", // TODO(adam): generate via javascript
          "fileCreationTime": "2018-10-08T00:00:00Z",
          "fileIDModifier": "A"
        },
        "batches": [
          {
            "batchHeader": {
              "id": fileId,
              "serviceClassCode": parseInt(document.querySelector("#serviceClassCode").value, 10),
              "standardEntryClassCode": document.querySelector("#standardEntryClassCode").value,
              "companyName": document.querySelector("#companyName").value,
              "companyIdentification": document.querySelector("#companyIdentification").value,
              "companyEntryDescription": document.querySelector("#companyEntryDescription").value,
              "effectiveEntryDate": "2018-10-09T00:00:00Z",
              "ODFIIdentification": document.querySelector("#ODFIIdentification").value,
              "batchNumber": 1
            },
            "entryDetails": [
              {
                "id": fileId,
                "transactionCode": parseInt(document.querySelector("#transactionCode").value, 10),
                "RDFIIdentification": document.querySelector("#RDFIIdentification").value,
                "checkDigit": document.querySelector("#checkDigit").value,
                "DFIAccountNumber": document.querySelector("#DFIAccountNumber").value,
                "amount": parseInt(document.querySelector("#amount").value, 10),
                "identificationNumber": document.querySelector("#identificationNumber").value,
                "individualName": document.querySelector("#individualName").value,
                "discretionaryData": document.querySelector("#discretionaryData").value,
                "addendaRecordIndicator": 1,
                "traceNumber": document.querySelector("#traceNumber").value,
                "addenda05": [
                  {
                    "id": fileId,
                    "paymentRelatedInformation": document.querySelector("#addendum-paymentRelatedInformation").value,
                    "sequenceNumber": 1,
                    "entryDetailSequenceNumber": 1
                  }
                ],
                "category": document.querySelector("#category").value
              }
            ]
          }
        ]
      });

      // Create file
      moov.post('/ach/files/create', body, function (resp) {
        var js = JSON.parse(resp);

        // Build file
        moov.getFileContents(js.id);

        // run validation
        moov.validateFile(js.id, function(success) {
          if (success === true) {
            moov.getACHFiles();
          }
        });
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
    //
    // callback should take a boolean representing validation success
    validateFile: function(id, callback) {
      moov.get('/ach/files/'+id+'/validate', function (resp) {
        // Show the validation error (if there is one)
        var js = JSON.parse(resp);
        if (js.error) {
          moov.error("ERROR: "+js.error);
          console.log(js.error);
          if (callback !== undefined) {
            callback(false);
          }
        } else {
          if (callback !== undefined) {
            callback(true);
          }
        }
      });
    },

    getFileContents: function(id) {
      moov.get('/ach/files/'+id+'/contents', function (resp) {
        var elm = document.querySelector("#ach-file-contents");
        elm.innerText = resp;
      });
    },

  };
})()
