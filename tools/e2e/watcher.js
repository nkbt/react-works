const logError = err => {
  if (err) {
    console.error(err);
  }
};

process.on('uncaughtException', logError);
process.on('unhandledRejection', logError);

let i = 0;
module.exports = async filepath => {
  const run = async () => {
    console.clear();
    i += 1;
    console.log('[RUN]', i, filepath);
    try {
      if (filepath in require.cache) {
        delete require.cache[filepath];
      }
      const newRunner = require(filepath);
      newRunner();
      console.log('[DONE]');
    } catch (err) {
      console.error(err);
    }
  };

  require('fs').watch(filepath, eventName => {
    if (eventName === 'change') {
      run().catch(e => console.error(e));
    }
  });
  run().catch(e => console.error(e));
};
