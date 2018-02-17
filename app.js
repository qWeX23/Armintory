var express = require('express'),
    app = express(),
    exphbs = require('express-handlebars');

// Tell the app that the templating engine is handlebars
app.engine('hbs',
    // Passes default configuration to express-handlebars module
    exphbs({ defaultLayout: 'main', extname: '.hbs' }));

// Tell the app the the view engine property is also handlebars
app.set('view engine', 'hbs');

// Serve static files
app.use('/public', express.static('public'));

//routes
var index = require('./routes/index.js');
app.use('/', index);
var ammo = require('./routes/ammo.js');
app.use('/ammo', ammo);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Tell Express on which port to listen
var port = Number(process.env.PORT || 3000)
app.listen(port, function() {
    console.log('listening on ' + port);
});