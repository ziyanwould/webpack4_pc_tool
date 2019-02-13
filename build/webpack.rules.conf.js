const extractTextPlugin = require("extract-text-webpack-plugin");
const rules = [{
        test: /\.(css|scss|sass)$/,
        // 不分离的写法
        // use: ["style-loader", "css-loader",sass-loader"]
        // 使用postcss不分离的写法
        // use: ["style-loader", "css-loader", "sass-loader","postcss-loader"]
        // 此处为分离css的写法
        /*use: extractTextPlugin.extract({
        	fallback: "style-loader",
        	use: ["css-loader", "sass-loader"],
        	// css中的基础路径
        	publicPath: "../"
        })*/
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? ['style-loader', {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        }, {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: (loader) => [require('autoprefixer')({ browsers: ['> 0.15% in CN'] })]
            }
        }, {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }] : extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader", "postcss-loader"],
            // css中的基础路径
            publicPath: "../"

        })
    },
    {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            }
        }
        // 不检查node_modules下的js文件
        // exclude: "/node_modules/"
    }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
            // 需要下载file-loader和url-loader
            loader: "url-loader",
            options: {
                limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
                // 图片文件输出的文件夹
                outputPath: "images"
            }
        }]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
        }
    },
    {
        test: /\.html$/,
        // html中的img标签
        use: [{
            loader: "html-withimg-loader",
            options: {
                min: false //不压缩HTML
            }
        }]

    },
    {
        test: /\.less$/,
        // 三个loader的顺序不能变
        // 不分离的写法
        // use: ["style-loader", "css-loader", "less-loader"]
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "less-loader"] : extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"],
            // css中的基础路径
            publicPath: "../"
        })
    }, {
        test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader'
    }
];
module.exports = rules;