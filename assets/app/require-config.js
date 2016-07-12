require.config({
    paths: {
        'jquery': '../vendor/jquery-1.10.2.min',
        'knockout': '../vendor/knockout-3.3.0',
        'durandal':'../vendor/durandal',
        'plugins' : '../vendor/durandal/plugins',
        'text': '../vendor/require/text',
        'promise': '../vendor/Promise',
        'moment': '../vendor/moment-with-locales.min',
        'moment-timezone': '../vendor/moment-timezone-with-data.min',
        'base64PolyFill' : '../vendor/base64.min',
        'corejs' : '../vendor/core-js.min'
    },
    shim: {
        promise: { exports: 'window.Promise' }
    }
});