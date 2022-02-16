'use strict';

var Common = require('./common');

function DomainController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

DomainController.prototype.show = function(req, res) {
  var self = this;
  var domainName = req.domain;

  self.node.services.alterdotd.resolveDomain(domainName, function(err, data) {
    if (err) {
        return self.common.handleErrors(err, res);
    }
    
    res.jsonp(data);
  });
};

module.exports = DomainController;
