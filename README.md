## Express middleware for white/black listing IP Addresses

### Getting Started
---
- In the root of your express app create a .yaml file (You can name it whatever you want)
- Define two sections
    - whitelist
    - blacklist
        - Look at priviledge.yaml in root of `gate-keep` for an example
- List IP Addresses in sequence notation under each section
    - Under `blacklist` for blocked IP's 
    - Under `whitelist` for allowed IP's
    - Reference [http://www.yaml.org/start.html](http://www.yaml.org/start.html) for example of a sequence
        
### Example
```javascript
var express = require('express'),
    app = express(),
    path = require('path');
    
var gate-keep = require('gate-keep');
gate-keep.setpriviledge(path.join(__dirname, 'priviledge.yaml')); //pass absolute path to .yaml allowed/blocked file

app.use(gate-keep.white.privilege); //Allows only the specified IP Address in priviledge.yaml `whitelist` section
// Other configurations include
// app.use(gate-keep.black.priviledge); Allows access to all IP Addresses except those listed in priviledge.yaml `blacklist` section

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