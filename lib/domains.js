'use strict';

var Common = require('./common');

function DomainController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

DomainController.prototype.show = function(req, res) {
  var self = this;
  var domainName = req.params.domain;

  self.node.resolveDomain(domainName, function(err, data) {
    if (err) {
        return self.common.handleErrors(err, res);
    }
    
    res.jsonp(data);
  });
};

module.exports = DomainController;
