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
			return $http.put('/properties/'+property._id.$oid+'.json', property).success(function(data){
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
			//console.debug("%o", data);
			angular.copy(data, obj.properties);
		})
	}

	obj.deleteProperty = function(id){
		return $http.delete('/properties/'+id+'.json')
	}

	return obj;

}]);