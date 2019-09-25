(function () {
    'use strict';

    angular
        .module('app')
        .factory('RoupaService', Service);

    function Service($http, $q) {
        var service = {};

       service.GetAll = GetAll;
        service.Create = Create;
        service.Delete = Delete;
        return service;

       

        function Delete(_id) {
            return $http.delete('/api/roupa/' + _id).then(handleSuccess, handleError);
        }
        function GetAll(user) {
            return $http.get('/api/roupa/list/' + user._id).then(handleSuccess, handleError);
        }
        function Create(item) {
            return $http.post('/api/roupa/create', item).then(handleSuccess, handleError);
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
