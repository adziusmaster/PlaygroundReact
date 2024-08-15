import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import { Configuration as WebpackConfiguration } from 'webpack';
import 'webpack-dev-server';

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
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  devtool: 'inline-source-map',
});

export default config;
