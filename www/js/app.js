var unionVillage = angular.module('unionVillage', ['ui.router', 'unionVillage.controllers', 'unionVillage.services', 'unionVillage.directives', 'firebase']);

unionVillage.config(function($stateProvider, $urlRouterProvider) {
      
  $stateProvider
  
  // setup an abstract state for the tabs directive   
  .state('unionVillage', {
        abstract: true,
        views: {
            'header': {
                templateUrl: 'templates/header.html'
            },
            'footer': {
                templateUrl: 'templates/footer.html'
            }
        }
    })
    .state("unionVillage.home", {
        url: "/",
        views: {
            'content@': {
                templateUrl: 'templates/home.html'
            }
        }
    })
    .state("unionVillage.dashboard", {
        url: "/dashboard",
        views: {
            'content@': {
                templateUrl: 'templates/dashboard.html'
            }
        }
    })
    .state("unionVillage.medicalPortal", {
        url: "/medicalPortal",
        views: {
            'content@': {
                templateUrl: 'templates/medicalPortal.html'
            }
        }
    })
    .state("unionVillage.community", {
        url: "/community",
        views: {
            'content@': {
                templateUrl: 'templates/community.html'
            }
        }
    })
    .state("unionVillage.nearby", {
        url: "/nearby",
        views: {
            'content@': {
                templateUrl: 'templates/nearby.html'
            }
        }
    })
    .state("unionVillage.submitRequest", {
        url: "/submitRequest",
        views: {
            'content@': {
                templateUrl: 'templates/submitRequest.html'
            }
        }
    })
    .state("unionVillage.success", {
        url: "/success",
        views: {
            'content@': {
                templateUrl: 'templates/success.html'
            }
        }
    });

    
    $urlRouterProvider.otherwise("/");
    
});