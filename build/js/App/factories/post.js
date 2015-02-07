InVision.factory('PostService', ['$http', function($http){
  return {
    fetch: function(callback){
    
      $http.get('/data/posts.json')
        .success(function(data){
          if (callback) {
            callback(data.posts);
          }
        })
        .error(function(data, status){
          console.log("error", data, status);
        })
    }
  }
}]);

