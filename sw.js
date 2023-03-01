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

self.addEventListener("install", (event) => {
  console.log("Service worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
  event.waitUntil(clients.claim());
});

self.addEventListener("message", (event) => {
  const msg = event.data;
  console.log(`${time()}: sw: cli-to-sw received: `, msg);
});

setInterval(() => {
  self.clients.matchAll().then((clients) => {
    const msg = { id: uuid(), timestamp: Date.now(), message: "Ping from service worker" };
    clients.forEach((client, i) => {
      console.log(`${time()}: sw: sw-to-cli sent: `, msg);
      client.postMessage(msg);
    });
  });
}, 5000);
