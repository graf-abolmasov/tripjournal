var path = require('path');

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

// we're in root
module.exports = {
  appBuild: resolveApp('public'),
  appSrc: resolveApp('webapp/src')
};

