var app = require('./app.js');


// Cleanup
process.on('SIGTERM', function() { // ctrl c
    process.exit();
});

process.on('SIGINT', function() { // ctrl z
    process.exit();
});

process.on('uncaughtException', function(err) {
    // Logger.crash(err);
});
