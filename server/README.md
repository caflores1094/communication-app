# Node Server

To run the server, ensure you have run `npm install` in the server directory.
Simply run `npm start` from the root directory.
If you want to run the app without the node server, run `npm run noserver`

## Note

In order to keep Hot Reloading along with Node, ensure that the `PORT` in `env.json` does **NOT** coincide with the `PORT` in `webpack.config.js`
Both need to be on separate ports in order to work. All your calls will be redirected to the correct port.
