var dns;
try{
  dns = chrome.experimental.dns;
} catch(e) {
  console.log(e);
}
// no experimental permission, but returning domain name will be good for chrome.sockets
dns = dns || {
  resolve: function(domain, callback) {
    callback({
      resultCode: 0,
      address: domain
    });
  }
}

// Easy DNS A/AAAA look up
// lookup(domain, [family,] callback)
exports.lookup = function(domain, family, callback) {
  // parse arguments
  if (arguments.length === 2) {
    callback = family;
    family = 0;
  } else if (!family) {
    family = 0;
  } else {
    family = +family;
    if (family !== 4 && family !== 6) {
      throw new Error('invalid argument: `family` must be 4 or 6');
    }
  }

  dns.resolve(domain, function(result) {
    if(result.resultCode === 0) {
      callback(null, result.address, 4);
    } else {
      callback('Error: ' + result.resultCode);
    }
  });
};


// function resolver(bindingName) {
//   console.log('resolver', bindingName);
// }

// var resolveMap = {};
// exports.resolve4 = resolveMap.A = resolver('queryA');
// exports.resolve6 = resolveMap.AAAA = resolver('queryAaaa');
// exports.resolveCname = resolveMap.CNAME = resolver('queryCname');
// exports.resolveMx = resolveMap.MX = resolver('queryMx');
// exports.resolveNs = resolveMap.NS = resolver('queryNs');
// exports.resolveTxt = resolveMap.TXT = resolver('queryTxt');
// exports.resolveSrv = resolveMap.SRV = resolver('querySrv');
// exports.resolveNaptr = resolveMap.NAPTR = resolver('queryNaptr');
// exports.reverse = resolveMap.PTR = resolver('getHostByAddr');

exports.resolve = function(domain, type, callback) {
  console.log('resolve', domain, type, callback);
};


// ERROR CODES
exports.NODATA = 'ENODATA';
exports.FORMERR = 'EFORMERR';
exports.SERVFAIL = 'ESERVFAIL';
exports.NOTFOUND = 'ENOTFOUND';
exports.NOTIMP = 'ENOTIMP';
exports.REFUSED = 'EREFUSED';
exports.BADQUERY = 'EBADQUERY';
exports.ADNAME = 'EADNAME';
exports.BADFAMILY = 'EBADFAMILY';
exports.BADRESP = 'EBADRESP';
exports.CONNREFUSED = 'ECONNREFUSED';
exports.TIMEOUT = 'ETIMEOUT';
exports.EOF = 'EOF';
exports.FILE = 'EFILE';
exports.NOMEM = 'ENOMEM';
exports.DESTRUCTION = 'EDESTRUCTION';
exports.BADSTR = 'EBADSTR';
exports.BADFLAGS = 'EBADFLAGS';
exports.NONAME = 'ENONAME';
exports.BADHINTS = 'EBADHINTS';
exports.NOTINITIALIZED = 'ENOTINITIALIZED';
exports.LOADIPHLPAPI = 'ELOADIPHLPAPI';
exports.ADDRGETNETWORKPARAMS = 'EADDRGETNETWORKPARAMS';
exports.CANCELLED = 'ECANCELLED';
