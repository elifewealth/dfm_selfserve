(function () {
    'use strict';

    angular.module('selfService')
        .controller('Register1Ctrl', ['$scope', '$state', '$mdToast', 'AuthService', '$location',  Register1Ctrl]);

    /**
     * @module RegisterCtrl
     * @description
     * Handles Registration of self service user
     */
    function Register1Ctrl($scope, $state, $mdToast, AuthService, $location) {
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
                        .textContent('Account Created')              // The success part is not working as the response
                        .position('top right')                                  // is not in JSON format
                );
                $window.location.href = '/register2';
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
