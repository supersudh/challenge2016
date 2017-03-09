/**
  * Created by Zhengfeng Yao on 16/8/29.
  */
import run from './run';
import path from 'path';
import Server from 'karma/lib/server';
import open from 'open';

function openReportOnBrowser() {
  open(`file://${path.resolve(__dirname, '../coverage/index.html')}`);
}

async function test() {
  process.env.NODE_ENV = 'test';
  const configFile = path.join(__dirname, 'karma.conf.js');
  const watch = process.argv.includes('--watch');
  const detail = process.argv.includes('--detail');
  const port = process.argv.includes('--port') || 8080;
  const options = {
    configFile,
    singleRun: !watch,
    autoWatch: watch,
    port,
    logLevel: `${detail ? 'debug': 'info'}`
  };
  if (!watch) {
    await new Promise(resolve => {
      Server.start(options, () => {
        openReportOnBrowser();
        resolve();
      });
    });
  } else {
    const server = new Server(options);
    server.on('run_complete', () => {
      open(`file://${path.resolve(__dirname, '../coverage/index.html')}`);
    });
    await server.start();
  }
}

export default test;
