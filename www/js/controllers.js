var unionVillage = angular.module('unionVillage.controllers', []);


unionVillage.controller("headerCtrl", function($scope, $location) {
  $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
    $(".navbar-collapse").collapse('hide');
  });
});



/* !!!FIREBASE 3.0!!! Initialize Firebase */
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEQLgoUIz4JcggXiURBVPylAq0pJYrgi0",
    authDomain: "temporaryuv.firebaseapp.com",
    databaseURL: "https://temporaryuv.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

unionVillage.controller("headerCtrl", function($scope, $location) {
  $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
    $(".navbar-collapse").collapse('hide');
  });
});

//Totally functioning simple login
unionVillage.controller("LoginCtrl", function($scope, $state, $timeout, $firebaseArray){
  
  //This is going to get and log the user status, this could be copied and/or used for the beginning framework to build
  //a functioning profile page
  var user = firebase.auth().currentUser;

  if (user) {
    console.log("User is logged in");
    $state.go('unionVillage.dashboard');
  } else {
    console.log("User is logged out");
    $state.go('unionVillage.home');
  };
  
  $scope.login = function(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END authwithemail]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $state.go('unionVillage.dashboard');
      };
    });
    
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);
      });
    };
  };
  
  /*Logout Functionality*/
  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
    $state.go('unionVillage.home');
  };
  
});



/*Thread Page Controller*/
unionVillage.controller("dashboardCtrl", function($scope, $firebaseArray, $timeout) {

    /* Get Stored Posts*/
    var ratesRef = firebase.database().ref('notificationCenter');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    /* Add posts*
    $scope.addItem = function writeUserData(userId, name, email) {
      var timestamp = new Date().valueOf()
      
      firebase.database().ref('notificationCenter').push({
        id: timestamp,
        description: $scope.postDescription,
        liked: false
      });
      
      $scope.postDescription = "";
    };*/
    
});



/* My Neighbors Controllers */
unionVillage.controller("restaurantsCtrl", function($scope, $firebaseArray, $timeout) {

    /* Get Stored Posts*/
    var ratesRef = firebase.database().ref('restaurants');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    /* Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };*/
    
});

unionVillage.controller("gamblingCtrl", function($scope, $firebaseArray, $timeout) {

    /* Get Stored Posts*/
    var ratesRef = firebase.database().ref('gambling');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    /* Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };*/
    
});

unionVillage.controller("sightsCtrl", function($scope, $firebaseArray, $timeout) {

    /* Get Stored Posts*/
    var ratesRef = firebase.database().ref('sights');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    
    /* Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };*/
    
});









// !!!FIREBASE 2.0!!! NEED TO UPDATE TO 3.0 ONCE ANGULAR FIRE IS UPDATED 
//Totally functioning simple login
/*unionVillage.controller("LoginCtrl", function($scope, $firebaseAuth, $state){
var users = new Firebase("https://temporaryuv.firebaseio.com/");
  
  //This is going to get and log the user status, this could be copied and/or used for the beginning framework to build
  //a functioning profile page
  var status = new Firebase("https://temporaryuv.firebaseio.com/");
  var authData = status.getAuth();
  
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $state.go('unionVillage.dashboard');
  } else {
    console.log("User is logged out");
    $state.go('unionVillage.home');
  }
  
  //This is called when a user clicks the 'Login' button
  $scope.login = function(username, password){
    users.authWithPassword({
      email    : username,
      password : password
    }, function(error) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $state.go('unionVillage.dashboard');
      }
    });
  };
  
  //Logout Functionality
  $scope.logout = function() {
    users.unauth();
    $state.go('unionVillage.home');
  };
  
});



/* Notification Center Controller 
unionVillage.controller("dashboardCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");

    // Get Stored Posts
    var ratesRef = new Firebase('https://temporaryuv.firebaseio.com/notificationCenter');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    // Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };
    
});



/* Calendar Controller */
unionVillage.controller("calendarCtrl", function($scope) {
  $(document).ready(function(){  
						
    var events_array = new Array(
      {
        startDate: new Date(2016, 07, 20),
        endDate: new Date(2016, 0, 20),
        title: "Event 1",
        description: "Description 1",
        allDay: true,
        priority: 1, // 1 = Low, 2 = Medium, 3 = Urgent
        frecuency: 1 // 1 = Daily, 2 = Weekly, 3 = Monthly, 4 = Yearly
      },
      {
        startDate: new Date(2016,07, 20, 19, 50),
        endDate: new Date(2016,07, 20, 21, 00),
        title: "Event 2",
        description: "Description 2",
        priority: 3,
        frecuency:1
      },
      {
        startDate: new Date(2011,07, 20, 18, 0),
        endDate: new Date(2012,00, 20, 21, 30),
        title: "Event 3",
        description: "Description 3",
        priority: 3,
        frecuency:1
      }
    );	
    $("#calendar").dp_calendar({
      format_ampm: true,
      events_array: events_array
    });
    
    
  });
});
/* End of calendar controller */



/* Weather Controller */
unionVillage.controller("weatherCtrl", function($scope) {
  // Docs at http://simpleweatherjs.com
  $(document).ready(function() {
    $.simpleWeather({
      woeid: '2357536', //2357536
      location: 'Henderson, NV',
      unit: 'f',
      success: function(weather) {
        html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
        html += '<li class="currently">'+weather.currently+'</li>';
        html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';
        
        for(var i=0;i<5;i++) {
          html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
        }
    
        $("#weather").html(html);
      },
      error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
      }
    });
  });
});



/* My Neighbors Controllers *
unionVillage.controller("restaurantsCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");

    // Get Stored Posts
    var ratesRef = new Firebase('https://temporaryuv.firebaseio.com/restaurants');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    // Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };
    
});

unionVillage.controller("gamblingCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");

    // Get Stored Posts
    var ratesRef = new Firebase('https://temporaryuv.firebaseio.com/gambling');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    // Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };
    
});

unionVillage.controller("sightsCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");

    // Get Stored Posts
    var ratesRef = new Firebase('https://temporaryuv.firebaseio.com/sights');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    // Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };
    
});*/