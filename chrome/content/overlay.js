const Cu = Components.utils;
Cu.import("resource:///modules/StringBundle.js"); // for StringBundle

var alreadyOpen = false;
var state = "";

window.addEventListener("load", function(e) { 
	startup(); 
}, false);

let strings = new StringBundle("chrome://lightninginvitationnotifier/locale/message.properties");

function startup() {
	setInterval(function() {
		var invitationOpen = document.getElementById('calendar-invitations-panel') != null && !document.getElementById('calendar-invitations-panel').hidden && document.getElementById('calendar-invitations-label') != null && document.getElementById('calendar-invitations-label').value.length > 0;
		
		// first invitation!
		if (invitationOpen && !alreadyOpen) {
			document.getElementById('calendar-invitations-panel').click();
			alreadyOpen = true;
			state = document.getElementById('calendar-invitations-label').value;
			popup(strings.get("invitations"), state);
			document.getElementById('lin').label = 'LIN 1';
			return;
		}
		
		// no more invitations
		if (!invitationOpen) {
			alreadyOpen = false;
			document.getElementById('lin').label = 'LIN 0';
			state = document.getElementById('calendar-invitations-label').value;
			return;
		}
		
		// new additional invitation
		if (state != document.getElementById('calendar-invitations-label').value) {
			state = document.getElementById('calendar-invitations-label').value;
			popup(strings.get("invitations"), state);
			document.getElementById('lin').label = 'LIN 2';
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