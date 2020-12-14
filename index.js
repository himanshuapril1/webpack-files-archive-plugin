'use strict';

const fs = require('fs');
const archiver = require('archiver');

class WebpackFilesArchivePlugin {
  constructor(options = {}) {
    this.options = options;
  }
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.afterEmit.tap('WebpackFilesArchivePlugin', compilation => {
      const options = this.options;

      // Set output location
      const output = options.output ? options.output : compiler.options.output.path;

      // Create archive streams
      let streams = [];
      let zip = true;
      let tar = true;
      if (options.format) {
        if (typeof options.format === 'string') {
          zip = (options.format === 'zip');
          tar = (options.format === 'tar');
        } else if (Array.isArray(options.format)) {
          zip = (options.format.indexOf('zip') !== -1);
          tar = (options.format.indexOf('tar') !== -1);
        }
      }
      if (zip) {
        const ext = options.ext || 'zip';
        let stream = archiver('zip');
        stream.pipe(fs.createWriteStream(`${output}.${ext}`));
        streams.push(stream);
      }
      if (tar) {
        const ext = options.ext || 'tar.gz';
        let stream = archiver('tar', {
          gzip: true,
          gzipOptions: {
            level: 1
          }
        });
        stream.pipe(fs.createWriteStream(`${output}.${ext}`));
        streams.push(stream);
      }

      // Add assets
      for (let asset in compilation.assets) {
        if (compilation.assets.hasOwnProperty(asset)) {
          for (let stream of streams) {
            stream.append(fs.createReadStream(`${output}/${asset}`), { name: asset });
          }
        }
      }

      // Finalize streams
      for (let stream of streams) {
        stream.finalize();
      }
    });
  }
}

module.exports = WebpackFilesArchivePlugin;