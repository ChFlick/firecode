Development Troubleshooting
===========================


Running the Extension
---------------------

When the Extension cannot be loaded due to an error regarding the wrong NODE_MODULE_VERSION,
look at https://sneezry.com/vscode-version-watcher/ and use `./node_modules/.bin/electron-rebuild -v <ELECTRON_VERSION>` 
to rebuild the binaries for the correct electron version.