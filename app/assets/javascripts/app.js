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

		.state('property_edit_state', {
			url: '/property/{id}/edit',
			templateUrl: '/new_property.html',			
			controller: 'propCtrl',
			resolve: {
				prop: ['$stateParams', 'properties', function($stateParams, properties){
					return properties.fetchProperty($stateParams.id);
				}]
			}
		})

		.state('property_delete_state', {
			url: '/property/{id}/delete?:name',		
			templateUrl: '/properties.html',	
			controller: 'mainCtrl'
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
		},

		updateProperty: function(property){
			return $http.put('/properties/'+property.id+'.json', property).success(function(data){
				obj.getProperties();
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

	obj.deleteProperty = function(id){
		return $http.delete('/properties/'+id+'.json').success(function(data){
			//angular.copy(data, obj.properties);
		})
	}

	return obj;

}]);

// factory
angmod.factory('countries_list_factory', [ function(){
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

angmod.controller('mainCtrl', [ '$scope', '$window', '$http', 'properties', 'countries_list_factory', '$state' ,function($scope, $window, $http, properties, countries_list_factory, $state) {
	$scope.countries = countries_list_factory.list;
	properties.getProperties();
	$scope.properties_list = properties.properties;
	$scope.saveProperty = function(){
		properties.createProperty($scope.property);
		$state.go('properties_list');
	}

	$scope.removeProperty = function(id, name, idx){
		if( $window.confirm('Are you sure to remove '+ name+'?') ){
			properties.deleteProperty(id);
			properties.properties.splice( idx , 1);
		}
	}

	// if( $state.current.name == 'property_delete_state' ){
	// 	if($window.confirm('Are you sure to remove '+$state.params.name+'?')){
	// 		properties.deleteProperty($state.params.id);
	// 		$state.go('properties_list');
	// 	}		
	// }


}]);

angmod.controller('propCtrl', ['$scope', 'prop', 'countries_list_factory', '$state', 'properties',function($scope, prop, countries_list_factory, $state, properties){
	$scope.property = prop;
	$scope.countries = countries_list_factory.list;
	$scope.saveProperty = function(){
		properties.updateProperty($scope.property);
		$state.go('properties_list');
	}

}]);