module.exports = [{
    mode: 'production',
    entry: './output/client/index.js',
    output: {
        filename: 'index.js',
        path: __dirname + '/dist'
    }
}];
