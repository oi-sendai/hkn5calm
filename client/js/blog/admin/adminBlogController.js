// 'use strict';
var adminBlogController = angular.module('adminBlogController', ['ui.bootstrap']);

adminBlogController.controller('adminBlogController', function(
  $resource,
  $scope, 
  $http, 
  // FileUploader,
  PostFactory
  ) { 
  // we now must find some way to put ingredients in the 
  $scope.works = 'adminBlogController';
  $scope.posts = {};
  $scope.item = {};
  $scope.formData = {};
  // $scope.uploader = new FileUploader();
  // $scope.uploaderOpts = {
  //   url: '/api/uploads'
  // }

  function init() {
    PostFactory.getPosts().then(function(response) {
      console.log(response)
        $scope.posts = response.data;
    });
  }
  init();

  $scope.createPost = function(){
  	console.log($scope.formData);
    PostFactory.insertPost($scope.formData).then(function(response) {

      console.log(response);
      $scope.formData = {}; // clear the form so our user is ready to enter another
      $scope.posts = response.data;
    }); 
  }

  $scope.deletePost = function(id){
    PostFactory.deletePost(id).then(function(response) {
      console.log(response);
      $scope.posts = response.data;
    });
    $scope.$apply
  }
  $scope.updatePost = function(id){
    // should accept formdata 
  }

  $scope.showPost = function(id){
    PostFactory.showPost(id).then(function(response) {
      console.log(response);
      $scope.item = response.data;
    }); 
  }

});


