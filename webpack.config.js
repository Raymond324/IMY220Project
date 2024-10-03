const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';  // Check if it's production mode

    return {
        entry: './frontend/src/index.js',  // Entry point of your application
        output: {
            path: path.resolve(__dirname, 'frontend/public'),  // Output directory for bundled files
            filename: 'bundle.js',  // The bundled JavaScript file
            publicPath: isProduction ? '/' : '/',  // Adjust public path for production if needed
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,  // Transpile JS and JSX files using Babel
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.css$/,  // Load and bundle CSS files
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,  // Load images
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/',  // Ensure images go to the right directory
                                publicPath: 'images/',  // Ensure images are referenced correctly
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],  // Resolve these extensions
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'frontend/public'),  // Serve files from the public folder
            },
            compress: true,
            port: 3000,  // Port for the dev server
            historyApiFallback: true,  // Fallback to index.html for single-page apps
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './frontend/public/index.html',  // Point to your index.html file
                minify: isProduction ? { collapseWhitespace: true, removeComments: true } : false,  // Minify HTML in production mode
            }),
        ],
        mode: isProduction ? 'production' : 'development',  // Can be changed to 'production' for production build
        optimization: isProduction ? { minimize: true } : {},  // Minimize output for production
    };
};
