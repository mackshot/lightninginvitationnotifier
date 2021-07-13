async function main() {
  messenger.WindowListener.registerChromeUrl([
    ["content", "invitchecker", "content/"]
  ]);
  messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xhtml", "chrome://invitchecker/content/listener.js");
  messenger.WindowListener.startListening();
}

main();