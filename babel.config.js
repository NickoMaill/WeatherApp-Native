module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env.development.local',
                    safe: false,
                    allowUndefined: true,
                    verbose: false,
                },
            ],
            [
                'module-resolver',
                {
                    alias: {
                        '~': './src',
                    },
                },
            ],
        ],
    };
};
