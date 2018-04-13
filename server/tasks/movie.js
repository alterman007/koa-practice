const cp = require('child_process');
const { resolve } = require('path');

;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list.js');
  const child = cp.fork(script, []);

  let invoked = false;
  child.on('error', (err) => {
    if (invoked) return;
    invoked = true;
    console.log(err);
  });
  child.on('exit', (code) => {
    if (invoked) return;
    invoked = false;
    console.log(
      code === 0 ? 'ok' : 'error',
    );
  });
  child.on('message', (data) => {
    let result = data.result;
    console.log(result.length);
  })
})();
