# Tab vs service worker throttling demo

Demonstrates how timers on tabs are throttled while service worker's aren't.
For more info on throttling, see: https://blog.chromium.org/2020/11/tab-throttling-and-more-performance.html

## Run demo

Run: `npm start`

The tab and service worker will start sending each other messages every 5s and both are acknowleding the messages they received. Open the console, and you should see something like this:

```
15:41:02: sw: sw-to-cli sent:  {id: 'yegamtul', timestamp: 1677703262953, message: 'Ping from service worker'}
15:41:02: cli: sw-to-cli received {id: 'yegamtul', timestamp: 1677703262953, message: 'Ping from service worker'}
15:41:06: cli: cli-to-sw sent {id: 'o9mqpwlb', timestamp: 1677703266360, message: 'Ping from main thread'}
15:41:06: sw: cli-to-sw received:  {id: 'o9mqpwlb', timestamp: 1677703266360, message: 'Ping from main thread'}
```

Now put the tab into the background for ~7min. When you come back, you'll see that messages sent after 5min from the service worker continue to send every 5s and are immediately acknowledged by the client (search for "sw-to-cli"), while messages from the client are only sent roughly once per min (search for "cli-to-sw").
