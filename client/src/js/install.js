const installButton = document.getElementById("buttonInstall");

// Logic for installing the Progressive Web App (PWA)
// Add an event handler to the 'beforeinstallprompt' event
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;
  installButton.style.visibility = "visible";
});

// Implement a click event handler on the 'installButton' element
installButton.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();
  window.deferredPrompt = null;
  installButton.classList.toggle("hidden", true);
});

// Add a handler for the 'appinstalled' event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
