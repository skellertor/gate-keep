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
    
var gatekeep = require('gate-keep');
gatekeep.setprivilege(path.join(__dirname, 'privilege.yaml')); //pass absolute path to .yaml allowed/blocked file

app.use(gatekeep.white.privilege); //Allows only the specified IP Address in privilege.yaml `whitelist` section
// Other configurations include
// app.use(gatekeep.black.privilege); Allows access to all IP Addresses except those listed in privilege.yaml `blacklist` section

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