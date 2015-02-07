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

