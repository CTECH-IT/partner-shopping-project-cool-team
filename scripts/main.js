(function (window) {
    'use strict'; 
    
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR ='[data-coffee-order="checklist"]';


    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    
    let Validation = App.Validation;

    let rDS = new RemoteDataStore("http://saturn.rochesterschools.org:8080/json");
    var myTruck= new Truck('12345', rDS);
    window.mytruck = myTruck;
    
    if (document.querySelector(FORM_SELECTOR) != null) {
        let formHandler = new FormHandler(FORM_SELECTOR);
        formHandler.addSubmitHandler(function (data) {
            myTruck.createOrder.call(myTruck, data);
            
        });
    
        formHandler.addInputHandler(Validation.isCompanyEmail);
    }
    
    
    
    

    
    function pullOrders () {
        let data = rDS
        let CheckList = App.CheckList;
        let checkList = new CheckList(CHECKLIST_SELECTOR);
        checkList.addRow.call(checkList, data);
        checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
        rDS.getAll(function () {});
        //myTruck.printOrders;
    }
    if (document.querySelector('[page-detail="manager"]') != null) {
        pullOrders();
    }
    
})(window);