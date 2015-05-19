angmod = angular.module('angApp', ['ui.router']);

angmod.config(['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ){

	$stateProvider
		.state('propertyShow', {
			url: '/property/{id}',
			templateUrl: '/property.html',
			controller: 'MainController',
			resolve: {
				prop: ['$stateParams', 'properties', function($stateParams, properties){
					return properties.fetchProperty($stateParams.id);
				}]
			},
			controller: function($scope, prop){
				$scope.property = prop;
			}
		});

}]);


// factory

angmod.factory('properties', [ '$http', function($http){
	var obj = {
		properties: [],

		createProperty: function(property){
			return $http.post('/properties.json', property).success(function(data){
				obj.properties.push(data);
			});
		}
	}

	obj.fetchProperty = function(id){
		return $http.get('/properties/' + id + '.json').then(function(res){
			console.log(res.data);
			return res.data;
		});
	}

	obj.getProperties = function(){
		return $http.get('/properties.json').success(function(data){
			angular.copy(data, obj.properties);
		})
	}
	return obj;

}]);

// factory

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

angmod.controller('MainController', [ '$scope', '$window', '$http', 'properties', 'countries_list',  function($scope, $window, $http, properties, countries_list){
	$scope.app_name = "Property Management";
	$scope.countries = countries_list.list;
	properties.getProperties();
	// $scope.property = prop;
	$scope.properties_list = properties.properties;
	$scope.saveProperty = function(){
		properties.createProperty($scope.property);
		//$scope.property = {};
		//$window.alert('saved'+ $scope.property.name);
	}

}]);

// angmod.controller('PropertyController', ['$scope', function($scope){
// 	s
// }];