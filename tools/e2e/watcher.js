const logError = err => {
  if (err) {
    console.error(err);
  }
};

process.on('uncaughtException', logError);
process.on('unhandledRejection', logError);

const watcher = async (filepath, files, flags) => {
  let i = 0;
  const options = {
    skipReload: flags.includes('--skip-reload')
  };

  const run = async () => {
    //    console.clear();
    i += 1;
    console.log('[RUN]', i, filepath, options);
    try {
      if (filepath in require.cache) {
        delete require.cache[filepath];
      }
      const newRunner = require(filepath);
      await newRunner(require('./assert').assert, options);
      console.log('[DONE]');
    } catch (err) {
      console.error(err);
    }
  };

  const runOnChange = eventName => eventName === 'change' && run().catch(e => console.error(e));
  const {watch} = require('fs');
  files.concat([filepath]).forEach(file => watch(file, runOnChange));
  run().catch(e => console.error(e));
};

module.exports = {
  watcher
};
