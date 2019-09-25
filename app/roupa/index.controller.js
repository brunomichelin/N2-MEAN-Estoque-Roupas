(function () {
    'use strict';

    angular
        .module('app')
        .controller('roupa.IndexController', Controller);

    function Controller($window, RoupaService, FlashService,UserService) {
        var vm = this;
        
        vm.user = null;
        vm.item= null;
        vm.saveItem = saveItem;
        vm.listItem = null;
        vm.deleteItem = deleteItem;
        vm.UpdateItem = UpdateItem;
        vm.atualizando = false;
        vm.Cancel = clear;

        initController();

        function initController()
         {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                UpdatePage();
            });
          
        }
        function clear()
        {
            vm.item = {};
            vm.atualizando = false;
        }

        function UpdatePage()
        {
            RoupaService.GetAll(vm.user).then(function(item)
            {
                vm.listItem = item;
            })
        }

        function saveItem() {
            let item = {
                cod_item: vm.item.cod_item,
                data:vm.item.data,
                tipo:vm.item.tipo,
                marca: vm.item.marca, 
                caracteristicas: vm.item.caracteristicas,
                tamanho: vm.item.tamanho, 
                cor: vm.item.cor, 
                valor_etiqueta: vm.item.valor_etiqueta,
                valor_compra: vm.item.valor_compra , 
                valor_margem: vm.item.valor_compra*2, 
                valor_sugerido: vm.item.valor_sugerido,
                userid: vm.user._id
            };

            vm.atualizando = false;

            RoupaService.Create(item)
                .then(function () {
                    FlashService.Success('Item Inserido');
                    UpdatePage();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function UpdateItem(item)
        {
            vm.atualizando = true;
            vm.item = item;
        }

        function deleteItem(item) {
            vm.atualizando = false;

            RoupaService.Delete(item._id)
                .then(function () {
                    UpdatePage();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();