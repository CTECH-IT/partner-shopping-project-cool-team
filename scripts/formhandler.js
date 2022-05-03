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
                if (data[item.name]) { //if there is already an item of that type, add the second to an array
                    data[item.name] = [data[item.name]];
                    data[item.name].push(item.value);
                } else {
                data[item.name] = item.value;
                }
                console.log(item.name + ' is' + item.value);
            });
            data.tim = 'tim';
            console.log(data);
            if (data.snack[1]) { //if its an array, make it readable by rDS
                data.snack = JSON.stringify(data.snack);
            }
            if (data.drink[1]) {
                data.drink = JSON.stringify(data.drink);
            }
            if (data.candy[1]) {
                data.candy = JSON.stringify(data.candy);
            }
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
