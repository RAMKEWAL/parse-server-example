// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const express        = require('express');
const cors           = require('cors');
const ParseServer    = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path           = require('path');


const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://heroku_nqxgmr02:sfs5os02gd9rt4mfppsci5oiph@ds111798.mlab.com:11798/heroku_nqxgmr02';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_nqxgmr02:sfs5os02gd9rt4mfppsci5oiph@ds111798.mlab.com:11798/heroku_nqxgmr02',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'appId',
  masterKey: process.env.MASTER_KEY || 'master', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://panda-parse.herokuapp.com/parse',  // Don't forget to change to https if needed
//  liveQuery: {
//    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
//  }
});

const dashboard = new ParseDashboard({
    apps       : [
        {
            appName  : 'panda-parse',
            serverURL: 'http://panda-parse.herokuapp.com/parse',
            appId    : 'appId',
            masterKey: 'master',
            iconName : 'icon.png'
        }
    ],
    users      : [
        {
            user: 'admin', // Used to log in to your Parse Dashboard
            pass: 'admin123'
        }
    ],
    iconsFolder: 'www/assets/images'
}, true);

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();
const port = 1337;

// Cors
app.use(cors());

// EJS Template
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use((req, res, next) => {
    res.locals.appId     = 'appId';
    res.locals.serverUrl = 'http://panda-parse.herokuapp.com/parse';
    next();
});

app.get('/', function (req, res) {
    res.render('index');
});

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);


// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);


var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);