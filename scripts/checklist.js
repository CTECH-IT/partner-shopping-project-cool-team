(function (window) {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;
    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find the element with selector:')
        }
    }

    //when the checkbox is clicked, get the email address from the row
    // and then call the finction (func) that is passed in with the email as a paramenter
    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    // the method that adds a new row to the checklist
    CheckList.prototype.addRow = function (coffeeOrder) {
        //remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);
        //create new instance of row, using the coffee order infor
        var rowElement = new Row(coffeeOrder);
        // add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    //remove a row identified by an email address
    CheckList.prototype.removeRow = function (email) {
        this.$element
        .find('[value="' + email + '"]')
        .closest('[data-coffee-order="checkbox"]')
        .remove();
    }

    function Row(coffeeOrder) {
        let $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });
        let $label = $('<label></label>');

        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });
        console.log(coffeeOrder.emailAddress)


        let discription =   ' ';
        if (coffeeOrder.flavor) {
            discription += coffeeOrder.flavor + ' ';
        }
        discription += coffeeOrder.coffee + ', ';
        discription += ' (' + coffeeOrder.emailAddress + ')\n' + '<br>' ;
        discription +=  coffeeOrder.pop + coffeeOrder.drink + '\n' + '<br>' ;
        discription += coffeeOrder.size ;
        console.log(coffeeOrder.snack);
        if (coffeeOrder.snack.includes('[')) { // if its an array, move out each element
            coffeeOrder.snack = JSON.parse(coffeeOrder.snack); //turns string into array
            coffeeOrder.snack.forEach(element => discription += element + ' '); //for each element of snack[], adds a description part for it
        } else { // if its a string (not array) then just add the description
            discription += coffeeOrder.snack.replaceAll('"', '');
        }
        /*coffeeOrder.drink = JSON.parse(coffeeOrder.snack);
        coffeeOrder.drink.forEach(element => discription += ' ['  + element + ']');
        coffeeOrder.candy = JSON.parse(coffeeOrder.candy);
        coffeeOrder.candy.forEach(element => discription += ' ['  + element + ']');*/
        discription += '<br>' + coffeeOrder.candy ;


        $label.append($checkbox);
        $label.append(discription);
        $div.append($label);
        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);


