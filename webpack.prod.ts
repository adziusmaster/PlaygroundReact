import { merge } from 'webpack-merge';
import common from './webpack.common';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

interface Configuration extends WebpackConfiguration {
  devServer?: {
    historyApiFallback?: boolean;
    port?: number;
    static?: {
      directory: string;
    };
  };
}

const config: Configuration = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.ts$|\.tsx$/,
      threshold: 10240,
      minRatio: 0.8,
    }), 
    new BundleAnalyzerPlugin(),    
  ],
});

export default config;
