(function (window) {
    'use strict'

    var App = window.App || {};
    var $ = window.jQuery;
    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    };

    RemoteDataStore.prototype.add = function (key, val) {
        $.post(this.serverUrl, val, function (serverResponse) {
            console.log(serverResponse);
        });
    };

    RemoteDataStore.prototype.getAll = function () {
        $.get(this.serverUrl, function (serverReponse) {
            console.log(serverReponse);
            cb(serverResponse);
        });
    };

    RemoteDataStore.prototype.get = function (key, cb) {
        $.get(this.serverUrl + '?emailAddress=' + key, function (serverResponse) {
            console.log(serverReponse);
            cb(serverReponse);
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        $.ajax(this.serverUrl + '?emailAddress=' + key, { type: 'DELETE'});
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window)