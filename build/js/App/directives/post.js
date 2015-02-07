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
