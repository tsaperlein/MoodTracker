module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            services: './app/services',
            context: './app/context',
          },
        },
      ],
    ],
  };
};
