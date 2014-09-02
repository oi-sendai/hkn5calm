'use strict';

eshoprShop.factory("ListingModel", function($http,$resource) {
  var factory = {};
  var url = "/api/listings";

  factory.getListings = function () {
    return $http.get(url);
  };
  factory.showListing = function (id) {
    return $http.get(url + '/' + id);
  };
  factory.insertListing = function (dataObject) {
    console.log(dataObject);
    return $http.post(url, dataObject);
  };
  // factory.updateListing = function (id, dataObject) {
  //   return $http.put(url + '/' + cust.ID, cust)
  // };

  factory.deleteListing = function (id) {
        return $http.delete(url + '/' + id);
  };
  return factory
});