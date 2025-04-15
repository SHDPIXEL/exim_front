module.exports = function override(config, env) {
    if (env === 'production') {
      // Directly add the Babel plugin here
      const babelLoader = config.module.rules.find(
        rule => rule.loader && rule.loader.includes('babel-loader')
      );
      
      if (babelLoader) {
        babelLoader.options.plugins = [
          ...(babelLoader.options.plugins || []),
          'transform-remove-console'
        ];
      }
    }
    return config;
  };
  