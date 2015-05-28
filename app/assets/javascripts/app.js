

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