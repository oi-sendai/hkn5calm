'use strict'; // my armpit cried

var eshoprShop = angular.module('eshoprShop', [
    'ngCookies', 
    'ui.router',
    'ngResource',
    'ngAnimate',
    'LocalStorageModule',
    // 'angularFileUpload',
    'ngCookies',
    'cupboardController',
    'pageController',
    'clockController',
    'recipesController',
    'graphsController',
    'graphsDirective',
    'questionsController',
    'publicBlogController',
    'adminBlogController',
    'sidebarBlogController',
    'headerDirective',
    'footerDirective',
    'textAngular',
    'productController',
    'checkoutController',
    'contactController',
    'orderController',
    'listingController',
    'uiController',
    'addListingController',
    'weatherDirective',
    ]);

eshoprShop.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $uiViewScrollProvider, $anchorScrollProvider ) {

    var access = routingConfig.accessLevels;
    // console.log($uiViewScrollProvider);
    // $uiViewScrollProvider.useAnchorScroll();
    // $anchorScrollProvider.disableAutoScrolling();
    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: '<ui-view autoscroll="false"/>',
            data: {
                access: access.public
            }
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: '404'
        });

    // Anonymous routes
    $stateProvider
        .state('anon', {
            abstract: true,
            template: '<ui-view autoscroll="false"/>',
            data: {
                access: access.public
            }
        })
        // Home
        .state('anon.home', {
            abstract: true,
            url: '/',
            templateUrl: 'page/ngview',
        })
        // Home Intro
        .state('anon.home.intro', {
            url: '',
            templateUrl: 'page/intro'
        })
        // Home Intro
        .state('anon.home.welcome', {
            url: 'welcome/',
            templateUrl: 'page/welcome'
        })
        // Home Welcome
        .state('anon.home.two', {
            url: 'two/',
            templateUrl: 'page/two'
        })
        // Home Two
        .state('anon.home.three', {
            url: 'three/',
            templateUrl: 'page/three'
        })
        // Home Three
        .state('anon.login', {
            url: '/login/',
            templateUrl: 'login',
            controller: 'LoginCtrl'
        })
        // Login
        .state('anon.register', {
            url: '/register/',
            templateUrl: 'register',
            controller: 'RegisterCtrl'
        })
        // Register
        .state('anon.recipes', {
            url: '/recipes/',
            templateUrl: 'graphs/plot1',
            controller: 'graphsController'
        })
        // Recipe
        .state('anon.recipe', {
            url: '/recipes/:recipe_id',
            templateUrl: 'recipes/recipe',
            controller: function($scope, $stateParams) {
                $scope.foo = $stateParams.recipe_id;
            }
        });

    // Shop Routes
    $stateProvider
        .state('anon.shop', {
            url: '/shop/',
            templateUrl: 'shop/shop',
            controller: 'productController'
        })
        .state('anon.shop.products', {
            url: 'products/', 
            // note how it begins with no slash for follow from its ancestor /shop/
            controller: 'productController',
            views: {
                'main': {
                    templateUrl: 'shop/productlist',
                },
                'sidebar': {
                    templateUrl: 'shop/sidebar',
                    controller: 'checkoutController'
                    // templateUrl: 'shop/public/sidebar',
                }
            }
        })
        .state('anon.shop.thanks', {
            url: 'thanks/',
            views: {
                'main': {
                    templateUrl: 'shop/thanks',
                    controller: 'checkoutController',
                },
                'sidebar': {
                    templateUrl: 'shop/downloads',
                    controller: 'checkoutController',
                }
            }
        })
        .state('anon.contact', {
            url: '/contact/', 
            templateUrl: 'shop/contact',
            controller: 'contactController',
        });
        // .state('user.private.orders', {
        //     url: 'orders/',
        //     templateUrl: "shop/admin/orders",
        //     controller: 'orderController',
        //     data: {
        //         access: access.private
        //     }
        // });

    //Blog Routes
    $stateProvider
        .state('anon.blog', {
            url: '/blog/',
            templateUrl: 'blog/public/blog',
            controller: 'publicBlogController'
        })
        .state('anon.blog.posts', {
            url: 'posts/', 
            // note how it begins with no slash for follow from its ancestor /blog/
            controller: 'publicBlogController',
            views: {
                'main': {
                    templateUrl: 'blog/public/list',
                },
                'sidebar': {
                    templateUrl: 'blog/public/sidebar',
                    controller: 'publicBlogController'
                    // templateUrl: 'blog/public/sidebar',
                }
            }
        })
        .state('user.private.write', {
            url: 'write/',
            controller: 'adminBlogController',
            templateUrl: 'blog/admin/write'
        })
    //Regular user routes
    $stateProvider
        .state('user', {
            abstract: true,
            template: '<ui-view autoscroll="false"/>',
            data: {
                access: access.public
            }
        })
        // Private
        .state('user.private', {
            abstract: true,
            url: '/private/',
            templateUrl: 'private/layout'
        })
        // Private Welcome
        .state('user.private.welcome', {
            url: '',
            templateUrl: 'private/welcome',
            controller: 'pageController',
        })
        // Private AddRecipe
        .state('user.private.addrecipe', {
            url: 'addrecipe/',
            templateUrl: 'recipes/add',
            controller: 'recipesController',
        })
        // Private Cupboard
        .state('user.private.cupboard', {
            url: 'cupboard/',
            templateUrl: 'private/cupboard',
            controller: 'cupboardController'
        })
        // Private Admin
        .state('user.private.admin', {
            url: 'admin/',
            templateUrl: 'private/stock',
            data: {
                access: access.admin
            }
        });

    // Listing routes
     $stateProvider
        .state('anon.listings', {
          url: '/listings/',
          templateUrl: 'listing/layout',
          controller: 'listingController'
        })
        .state('anon.listings.listing', {
          url: 'listing/:instanceID',
          views:{
            'right':{
              templateUrl:'listing/ui',
              controller: 'uiController'
              }
            }
        })
        .state('anon.listings.add', {
          url: 'add/',
          views:{
            'right':{
              templateUrl:'listing/add',
              controller: 'addListingController'
              }
            }
        });
        // .state('anon.listing.edit', {
        //   views:{
        //     'right':{
        //       templateUrl:'listing/ui.jade',
        //       controller: 'listingController'
        //       }
        //   }
    // });

    // Admin routes
    $stateProvider
        .state('admin', {
            abstract: true,
            template: '<ui-view autoscroll="false"/>',
            data: {
                access: access.admin
            }
        })
        // Admin
        .state('admin.admin', {
            url: '/admin/',
            templateUrl: 'admin',
            controller: 'AdminCtrl'
        });


    $urlRouterProvider.otherwise('/404');

    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
    $urlRouterProvider.rule(function($injector, $location) {
        if($location.protocol() === 'file')
            return;

        var path = $location.path()
        // Note: misnomer. This returns a query object, not a search string
            , search = $location.search()
            , params
            ;

        // check to see if the path already ends in '/'
        if (path[path.length - 1] === '/') {
            return;
        }

        // If there was no search string / query params, return with a `/`
        if (Object.keys(search).length === 0) {
            return path + '/';
        }

        // Otherwise build the search string and return a `/?` prefix
        params = [];
        angular.forEach(search, function(v, k){
            params.push(k + '=' + v);
        });
        return path + '/?' + params.join('&');
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });

}])

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (!Auth.authorize(toState.data.access)) {
            $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
            event.preventDefault();
            
            if(fromState.url === '^') {
                if(Auth.isLoggedIn()) {
                    $state.go('user.home');
                } else {
                    $rootScope.error = null;
                    $state.go('anon.home');
                }
            }
        }
    });

}]);
