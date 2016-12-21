# Express middleware for white/black listing IP Addresses

### Example
```javascript
var express = require('express'),
    app = express();
    
var gate-keep = require('gate-keep');
gate-keep.setPriviledge(path.join(__dirname, 'priviledge.yaml'));

app.use(gate-keep.white.priviledge);

/****************
 * Other stuff **
 ****************/
 
// gate-keep passes a `err` to next() when the IP is restricted so you 
// need to define an error handler to catch it
app.use(function(err, req, res, next){
    res.status(403);
    res.send('Denied');
});

app.listen(3000);
```