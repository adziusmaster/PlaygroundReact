import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { Configuration as WebpackConfiguration, DefinePlugin } from 'webpack';

interface Configuration extends WebpackConfiguration {
  devServer?: {
    historyApiFallback?: boolean;
    port?: number;
    static?: {
      directory: string;
    };
  };
}

const isProduction = process.env.NODE_ENV === "production"; 
const envFilePath = isProduction ? "./.env.production" : "./.env.development";


const config: Configuration = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new Dotenv({
      path: envFilePath,
      systemvars: true, 
    }),
  ],
};

export default config;
