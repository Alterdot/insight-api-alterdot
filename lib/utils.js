'use strict';

var _ = require('lodash');
var async = require('async');
var Common = require('./common');

function UtilsController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

UtilsController.prototype.estimateFee = function(req, res) {
  var self = this;
  var args = req.query.nbBlocks || '2';
  var nbBlocks = args.split(',');

  async.map(nbBlocks, function(n, next) {
    var num = parseInt(n);
    // Insight and Alterdot JSON-RPC return alterdot for this value (instead of dots).
    self.node.services.alterdotd.estimateFee(num, function(err, fee) {
      if (err) {
        return next(err);
      }
      next(null, [num, fee]);
    });
  }, function(err, result) {
    if (err) {
      return self.common.handleErrors(err, res);
    }
    res.jsonp(_.fromPairs(result));
  });

};

module.exports = UtilsController;
