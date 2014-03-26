module.exports = config;

function config () {
    return {
        env : process.env.NODE_ENV || 'development',
        port : 81,
        profileport : 8081,
        tempDirectory : "/srv/tmp/nucleus/entropy/"
    };

}

