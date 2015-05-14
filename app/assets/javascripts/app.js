angmod = angular.module('angApp', []);


angmod.factory('properties', [ '$http', function($http){
	var obj = {
		properties: [],

		createProperty: function(property){
			return $http.post('/properties.json', property)
		}		
	}

	obj.getProperties = function(){
		return $http.get('/properties.json').success(function(data){
			angular.copy(data, obj.properties);
		})
	}
	return obj;

}]);

angmod.factory('countries_list', [ function(){
	var c = {
		list: [
			{name: 'India'},
			{name: 'USA'},
			{name: 'Australia'},
			{name: 'UAE'},
			{name: 'NewZealand'}
		]
	};

	return c;
} ]);

angmod.controller('MainController', [ '$scope', '$window', '$http', 'properties', 'countries_list', function($scope, $window, $http, properties, countries_list){
	$scope.app_name = "Property Management";
	$scope.countries = countries_list.list;
	properties.getProperties();
	$scope.properties_list = properties.properties;
	$scope.saveProperty = function(){
		properties.createProperty($scope.property);
		//$window.alert('saved'+ $scope.property.name);
	}

}])