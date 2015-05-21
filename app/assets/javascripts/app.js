angmod = angular.module('angApp', ['ui.router']);

angmod.run(function($rootScope) {
  $rootScope.app_name = 'Property Management';
})

angmod.config(['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '',
			// templateUrl: '/',			
			controller: 'mainCtrl'
		})

		.state('new_property', {
			url: '/properties/new',
			templateUrl: '/new_property.html',
			controller: 'mainCtrl'
		})

		.state('properties_list', {
			url: '/properties',
			templateUrl: '/properties.html',			
			controller: 'mainCtrl'
		})

		.state('property_detail', {
			url: '/property/{id}',
			templateUrl: '/property.html',			
			controller: 'propCtrl',
			resolve: {
				prop: ['$stateParams', 'properties', function($stateParams, properties){
					return properties.fetchProperty($stateParams.id);
				}]
			}
		})

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

angmod.controller('mainCtrl', [ '$scope', '$window', '$http', 'properties', 'countries_list', '$state' ,function($scope, $window, $http, properties, countries_list, $state) {
	$scope.countries = countries_list.list;
	properties.getProperties();
	$scope.properties_list = properties.properties;
	$scope.saveProperty = function(){
		properties.createProperty($scope.property);
		$state.go('properties_list');
	}

}]);

angmod.controller('propCtrl', ['$scope', 'prop',function($scope, prop){
	$scope.property = prop;
}]);