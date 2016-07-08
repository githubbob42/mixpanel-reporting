define(function (require) {
    var app = require('durandal/app'),
        viewLocator = require('durandal/viewLocator'),
        router = require('plugins/router');

    require('corejs');

    require('base64PolyFill');

    app.configurePlugins({
        router:true
    });

    app.title = null;
    router.updateDocumentTitle = function noOp() {};

    app.start().then(function () {
      viewLocator.useConvention();
    }).then(function() {
        var shell = require('viewmodels/shell'),
            bindings = require('bindings/init'),
            // sObjectData = require('api/sObjectData'),
            extensions  = require('system/extensions');

        if (shell.__moduleId__) {
            extensions.apply();

            bindings.applyBindings();
            // sObjectData.init();
            app.setRoot(shell);
        }
        else {
            console.error(">>>> shell module has no __moduleId__ : RESTARTING APP...");
            window.location.reload();
        }
    });
});