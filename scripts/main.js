(function (window) {
    'use strict'; 
    
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    

    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    
    let Validation = App.Validation;

    var myTruck= new Truck('12345', new RemoteDataStore("http://saturn.rochesterschools.org:8080/json"));
    window.mytruck = myTruck;

    let formHandler = new FormHandler(FORM_SELECTOR);

    

    

    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);