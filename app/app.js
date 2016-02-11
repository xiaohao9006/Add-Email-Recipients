'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngTagsInput'])
    .controller('MainCtrl', function($scope, $http){
        $scope.tags=[];

        $scope.employeeList = [];

        $http.get('contacts.json', { cache: true}).then(function(response) {
            $scope.employeeList = response.data;
            console.log($scope.employeeList)
        });

        $scope.loadCountries = function($query) {
            return $http.get('contacts.json', { cache: true}).then(function(response) {
                var countries = response.data;
                return countries.filter(function(country) {
                    return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
                });
            });
        };

        var re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        $scope.checkTag = function(tag) {
            //console.log(tag);

            var findFlag = _.find($scope.employeeList,function(item){
                return tag.name === item.name;
            });

            if (findFlag != null) {
                //console.log("!!!!");
                return true;
            }
            else
            {
                return re.test(tag.name)
            }
        };

});
