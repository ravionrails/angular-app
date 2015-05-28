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