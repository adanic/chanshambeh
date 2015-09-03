To install dependencies, run:

```
npm install
```

Add a local dns record by mapping chanshambeh.ir to localhost in `/etc/hosts`:

```
127.0.0.1 chanshambeh.ir
```

To run on port number 80, you'll need root permission:

```
sudo PORT=80 node server.js
```

Then open chanshambeh.ir in your browser.
