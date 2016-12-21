var fs = require('fs'),
    yaml = require('js-yaml'),
    _ = require('underscore'),
    ipaddr = require('ipaddr.js'),
    doc = {};

module.exports.white = {
    privilege: function (req, res, next) {
        var ip = ipaddr.process(req.ip).toString();
        if(_.contains(doc.whitelist, ip)) return next();
        return next(new Error('Access Denied'));
    }
};

module.exports.black = {
    privilege: function (req, res, next) {
        if(_.contains(doc.blacklist, req.ip)) return next(new Error('Access Denied'));
        return next();
    }
};

module.exports.setprivilege = function (path) {
    doc = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    return;
};