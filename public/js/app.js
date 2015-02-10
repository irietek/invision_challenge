var InVision;

InVision = angular.module('InVision', []);

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


InVision.directive('post', function(){
  return {
    restrict    : 'E',
    scope       : {
      name    : '@',
      user    : '@',
      post    : '@',
      time    : '@',
      expand  : '@',
      type    : '@',
      link    : '@',
      photo   : '@',
      video   : '@'
    },
    templateUrl : '/templates/post.html',
    link        : function(scope, element, attrs){
      $(element).find("button.expand").bind("click", function(event){
        var expanded = (scope.expanded) ? false : true
        scope.$apply(function(){ scope.expanded = expanded });
      });
    }
  }
});

InVision.controller('HomeController', [function(){
  console.log("HomeController");
}]);

InVision.controller('PostController', ['PostService', function(PostService){
  var ctrl;

  this.items = [];
  ctrl = this;

  this.init = function(){
    PostService.fetch(ctrl.fetch);
  };

  this.fetch = function(data){
    ctrl.items = data;
  };

  this.init();
}]);

