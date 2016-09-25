process.env.NODE_ENV = 'development';

var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config/webpack.config.dev');
var paths = require('../config/paths');

var friendlySyntaxErrorLabel = 'Syntax error:';
function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatMessage(message) {
  return message
    .replace(
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    )
    .replace(
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      'Module not found:'
    )
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
    .replace('./~/css-loader!./~/postcss-loader!', '');
}

function clearConsole() {
  process.stdout.write('\x1bc');
}

var compilerWatcher = webpack(config, function(err, stats) {});

// "invalid" event fires when you have changed a file, and Webpack is
// recompiling a bundle. WebpackDevServer takes care to pause serving the
// bundle, so if you refresh, it'll wait instead of serving the old one.
// "invalid" is short for "bundle invalidated", it doesn't imply any errors.
compilerWatcher.compiler.plugin('invalid', function() {
  clearConsole();
  console.log('Compiling...');
});

// "done" event fires when Webpack has finished recompiling the bundle.
// Whether or not you have warnings or errors, you will get this event.
compilerWatcher.compiler.plugin('done', function(stats) {
  clearConsole();
  var hasErrors = stats.hasErrors();
  var hasWarnings = stats.hasWarnings();
  if (!hasErrors && !hasWarnings) {
    console.log();
    console.log(chalk.green('Compiled successfully!'));
    console.log();
    return;
  }

  var json = stats.toJson({}, true);
  var formattedErrors = json.errors.map(message =>
    'Error in ' + formatMessage(message)
  );
  var formattedWarnings = json.warnings.map(message =>
    'Warning in ' + formatMessage(message)
  );
  if (hasErrors) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    if (formattedErrors.some(isLikelyASyntaxError)) {
      formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
    }
    formattedErrors.forEach(message => {
      console.log(message);
      console.log();
    });
    return;
  }
  if (hasWarnings) {
    console.log(chalk.yellow('Compiled with warnings.'));
    console.log();
    formattedWarnings.forEach(message => {
      console.log(message);
      console.log();
    });
  }
});

