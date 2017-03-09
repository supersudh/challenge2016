/**
  * Created by Zhengfeng Yao on 16/8/24.
  */
import path from 'path';
import gaze from 'gaze';
import replace from 'replace';
import fs from './lib/fs';
import Promise from 'bluebird';

/**
 * Copies static files such as favicon.ico to the
 * output (build) folder.
 */
async function copy({ watch } = {}) {
  const ncp = Promise.promisify(require('ncp'));
  if (!fs.existsSync('build')) {
    await fs.makeDir('build');
  }

  await Promise.all([
    ncp('src/public', 'build/public'),
    ncp('package.json', 'build/package.json'),
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze('src/public/**/*.*', (err, val) => err ? reject(err) : resolve(val));
    });
    watcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/public/').length);
      await ncp(`src/public/${relPath}`, `build/public/${relPath}`);
    });
  }
}

export default copy;
