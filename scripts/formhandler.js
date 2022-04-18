(function (window) {
    'use strict';

    let App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        //do stuff
        if (!selector) {
            throw new Error('No selector Provided!');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length == 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (func) {
        console.log('Setting the submit hander for the form...');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            // copy all info from form into the data variable
            let data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is' + item.value);
            });
            console.log(data);
            func(data);

            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function (func) {
        console.log('Setting input handler for the form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            let emailAddress = event.target.value;
            if (func(emailAddress) == true) {
                event.target.setCustomValidity('');
            } else {
                event.target.setCustomValidity(emailAddress + 'is not an autorized email address!');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
