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
    var query = "alh";
    document.querySelector("#input").value = query;
    moov.searchOFAC(query);
  };

  window.moov = {
    baseUrl: 'https://api.moov.io/v1/ofac',
    // baseUrl: "http://localhost:8084", // local dev
    requestId: nextId(),

    get: function(path, callback) {
      var req = new XMLHttpRequest();
      req.withCredentials = true
      req.open('GET', moov.baseUrl + path);
      req.responseType = 'text';
      req.setRequestHeader("x-request-id", moov.requestId)

      req.onload = function() {
        if (req.status == 403) {
          moov.error("Error: You\'re not logged in. Try <a href='https://moov.io/demo'>logging in</a> (or signing up).");
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

    searchOFAC: function(name) {
      moov.get('/search?name=' + name + "&limit=10", function(resp) {
        if (!resp) {
          moov.error('Problem making OFAC search! Try <a href="https://moov.io/demo">logging in</a> (or signing up).');
          return
        }

        var sdns = JSON.parse(resp)["SDNs"];
        moov.success("Loaded OFAC response");

        var parent = document.querySelector("#results");

        // Clear out previous results
        parent.innerHTML = "";

        var elm = document.createElement("p");
        elm.innerHTML = "Results"
        elm.style.fontWeight = "bold";
        parent.appendChild(elm);

        var tbl = document.createElement("table");
        tbl.cellPadding = "10px";
        parent.appendChild(tbl);
        var header = document.createElement("tr");
        header.innerHTML = "<td>ID</td><td>Name</td><td>Match</td><td>Remarks</td>";
        header.style.fontWeight = "bold";
        tbl.appendChild(header);

        for (i = 0; i < sdns.length; i++) {
          var tr = document.createElement("tr");
          tr.innerHTML = moov.formatSDN(sdns[i]);
          if (i % 2 == 0) {
            tr.classList.add("results-even-row");
          }
          tbl.appendChild(tr);
        }
      });
    },

    formatSDN: function(sdn) {
      return "<td>" + sdn.entityID + "</td><td>" + sdn.sdnName + "</td><td>" + Number(sdn.match*100).toFixed(1) + "%</td><td>" + sdn.remarks + "</td>";
    }
  };
})()
