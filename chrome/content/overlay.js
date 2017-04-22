const Cu = Components.utils;
Cu.import("resource:///modules/StringBundle.js"); // for StringBundle

var dialogOpen = false;
var state = "";

window.addEventListener("load", function(e) { 
    startup();
}, false);

let strings = new StringBundle("chrome://lightninginvitationnotifier/locale/message.properties");

function startup() {
	setInterval(function() {
		var invitationPending = document.getElementById('calendar-invitations-panel') != null && !document.getElementById('calendar-invitations-panel').hidden && document.getElementById('calendar-invitations-label') != null && document.getElementById('calendar-invitations-label').value.length > 0;

		var update = function () {
            state = document.getElementById('calendar-invitations-label').value;
            if (invitationPending) {
                popup(strings.get("invitations"), state);
                document.getElementById('lin').label = 'LIN: ' + state;
            } else {
                document.getElementById('lin').label = 'LIN';
			}
		};

		// first invitation!
		if (invitationPending && !dialogOpen) {
			document.getElementById('calendar-invitations-panel').click();
			dialogOpen = true;
            update();
			return;
		}
		
		// no more invitations
		if (!invitationPending) {
			dialogOpen = false;
			update();
			return;
		}
		
		// new additional invitation
		if (state != document.getElementById('calendar-invitations-label').value) {
            update();
			return;
		}
	}, 5000);
}

function popup(title, text) {
    try {
        Components.classes['@mozilla.org/alerts-service;1']
                  .getService(Components.interfaces.nsIAlertsService)
                  .showAlertNotification(null, title, text, false, '', null);
    } catch(e) {
        // prevents runtime error on platforms that don't implement nsIAlertsService
    }
}