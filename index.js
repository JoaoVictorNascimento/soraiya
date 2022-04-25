#!/usr/bin/env node

const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));
const soraiyaPath = path.join(mainPath, './soraiya');

const soraiya = function() {
    const linuxcmd = R.join('', ['paplay ', soraiyaPath, '.ogg']);
    const windowscmd = R.join('', [path.join(mainPath, './forWindows.vbs'), ' ', soraiyaPath, '.mp3']);
    const maccmd = R.join('', ['afplay ', soraiyaPath, '.mp3']);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)

    function exec(cmd) {
        return exect(cmd, function(error) {
            R.ifElse(
                R.empty,
                () => console.log('Soraiya'),
                (error) => console.error(error),
                error)
        });
    }
}

module.exports = soraiya;

if (!module.parent) {
    soraiya();
}