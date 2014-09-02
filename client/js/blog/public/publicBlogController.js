'use strict';

var publicBlogController = angular.module('publicBlogController',[]);

publicBlogController.controller('publicBlogController',function(
  $scope, 
  $http, 
  PostFactory
  ) {
    $scope.debug = 'js/blog/public/publicBlogController';
    $scope.posts =  {};
  
  function init() {
    PostFactory.getPosts().then(function(response) {
      console.log(response)
        $scope.posts = response.data;
    });
  }
  init();
});

var sidebarBlogController = angular.module('sidebarBlogController',[]);

sidebarBlogController.controller('sidebarBlogController',
  function($scope){
    $scope.debug = 'js/blog/public/sidebarBlogController';
});

