var fs = require('fs'),
    yaml = require('js-yaml'),
    _ = require('underscore'),
    doc = {};

module.exports.white = {
    priviledge: function (req, res, next) {
        if(_.contains(doc.whitelist, req.ip)) return next();
        return next(new Error('Access Denied'));
    }
};

module.exports.black = {
    priviledge: function (req, res, next) {
        if(_.contains(doc.blacklist, req.ip)) return next(new Error('Access Denied'));
        return next();
    }
};

module.exports.setpriviledge = function (path) {
    doc = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    return;
};