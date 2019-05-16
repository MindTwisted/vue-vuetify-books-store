const path = require('path');

module.exports = {
    configureWebpack: {
        plugins: [

        ],
        resolve: {
            alias: {
                '@api': path.join(__dirname, 'src/api'),
                '@components': path.join(__dirname, 'src/components'),
                '@store': path.join(__dirname, 'src/store')
            }
        }
    }
};
