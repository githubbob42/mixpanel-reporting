define(['plugins/dialog', 'knockout', 'jquery'], function (dialog, ko, $) {

    dialog.addContext('modal', {
        blockoutOpacity: 0.2,
        removeDelay: 200,
        /**
         * In this function, you are expected to add a DOM element to the tree which will serve as the "host" for the modal's composed view. 
         * You must add a property called host to the modalWindow object which references the dom element. 
         * It is this host which is passed to the composition module.
         * @method addHost
         * @param {Dialog} theDialog The dialog model.
         */
        addHost: function(theDialog) {
            var body = $('body');
            var blockout = $('<div class="modalBlockout"></div>')
                .css({ 'z-index': dialog.getNextZIndex(), 'opacity': this.blockoutOpacity })
                .appendTo(body);

            var host = $('<div class="modal"></div>')
                .css({ 'z-index': dialog.getNextZIndex() })
                .appendTo(body);

            theDialog.host = host.get(0);
            theDialog.blockout = blockout.get(0);

            if (!dialog.isOpen()) {
                var html = $("html");
                var oldScrollTop = html.scrollTop();
                $("html").css("overflow", "hidden");
                html.scrollTop(oldScrollTop); // necessary for Firefox
            }
        },
        /**
         * This function is expected to remove any DOM machinery associated with the specified dialog and do any other necessary cleanup.
         * @method removeHost
         * @param {Dialog} theDialog The dialog model.
         */
        removeHost: function(theDialog) {
            $(theDialog.host).removeClass('modal--active');
            $(theDialog.blockout).css('opacity', 0);

            setTimeout(function() {
                ko.removeNode(theDialog.host);
                ko.removeNode(theDialog.blockout);
            }, this.removeDelay);

            if (!dialog.isOpen()) {
                var html = $("html");
                var oldScrollTop = html.scrollTop(); // necessary for Firefox.
                html.css("overflow", "").scrollTop(oldScrollTop);
            }
        },
        /**
         * This function is called after the modal is fully composed into the DOM, allowing your implementation to do any final modifications, 
         * such as positioning or animation. You can obtain the original dialog object by using `getDialog` on context.model.
         * @method compositionComplete
         * @param {DOMElement} child The dialog view.
         * @param {DOMElement} parent The parent view.
         * @param {object} context The composition context.
         */
        compositionComplete: function (child, parent, context) {
            var $child = $(child);
            var theDialog = dialog.getDialog(context.model);

            $(theDialog.host).addClass('modal--active');

            if ($child.hasClass('autoclose')) {
                $(theDialog.blockout).click(function() {
                    theDialog.close();
                });
            }

            $('.autofocus', child).each(function() {
                $(this).focus();
            });
        }
    });

    var Modal = function() { };

    Modal.prototype.activate = function (activationData) {
        this.activateModal(activationData[0]);
    };
    Modal.prototype.activateModal = function (/* params */) { };

    Modal.prototype.show = function () {
        return dialog.showModal(this, arguments);
    };
    Modal.prototype.cancel = function () {
        dialog.close(this, false);
        return false; // for testing, so we don't actually have to 'show' the modal
    };
    Modal.prototype.close = function (result) {
        dialog.close(this, result);
        return result; // for testing, so we don't actually have to 'show' the modal
    };

    return Modal;
});