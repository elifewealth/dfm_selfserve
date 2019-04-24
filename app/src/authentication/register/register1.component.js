(function () {
    'use strict';

    angular.module('selfService')
        .controller('RegisterCtrl1', ['$scope', '$state', '$mdToast', 'AuthService', '$location',  RegisterCtrl1]);

    /**
     * @module RegisterCtrl
     * @description
     * Handles Registration of self service user
     */
    function RegisterCtrl1($scope, $state, $mdToast, AuthService, $location) {
        var vm = this;
        vm.clearForm = clearForm;

        function clearForm() {
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
        }

        $scope.submit = function() {
            AuthService.register1(vm.form).then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Confirmation email is sent')              // The success part is not working as the response
                        .position('top right')                                  // is not in JSON format
                );
                vm.clearForm();
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }if(errors!=''){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Error in creating user: ' + errors)
                            .position('top right')
                    );
                }
                else{
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Confirmation email is sent')
                            .position('top right')
                    );
                    $location.path('/verify');
                    vm.clearForm();
                }


            });

        }
    }

})();
