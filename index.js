function uuid() {
  return Math.random().toString(36).substring(2, 10);
}

function time() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("Service worker registered:", registration);
      setInterval(() => {
        const msg = { id: uuid(), timestamp: Date.now(), message: "Ping from main thread" };
        console.log(`${time()}: cli: cli-to-sw sent`, msg);
        registration.active.postMessage(msg);
      }, 5000);
    })
    .catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  navigator.serviceWorker.addEventListener("message", (event) => {
    const msg = event.data;
    console.log(`${time()}: cli: sw-to-cli received`, msg);
  });
} else {
  console.warn("Service worker not supported");
}
