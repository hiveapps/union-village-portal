var unionVillage = angular.module('unionVillage.controllers', []);

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPonQNzJOgFx-Qg1QT0nuBck3XUch-WAU",
    authDomain: "unionvillage.firebaseapp.com",
    databaseURL: "https://unionvillage.firebaseio.com",
    storageBucket: "project-8228738253020726929.appspot.com",
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
unionVillage.controller("LoginCtrl", function($scope, $state){
  
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
  
  /*Logout Functionality */
  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
    $state.go('unionVillage.home');
  };
  
});



/*Thread Page Controller */
unionVillage.controller("threadCtrl", function($scope, $firebaseArray, $timeout) {

    
    /*var ratesRef = firebase.database().ref('posts');
    ratesRef.on('value', function(snapshot) {
      //$scope.todos = snapshot.val().todos;
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    function update (snapshot) {
      //$scope.todos = $firebaseArray(ratesRef);
      //$scope.todos = firebase.database().ratesRef;
      $scope.todos = snapshot.val().todos;
    };*/

    /* Get Stored Posts */
    var ratesRef = firebase.database().ref('posts');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
      //$scope.todos = firebase.database().ratesRef;
    };
    
    /* Add posts */
    $scope.addItem = function writeUserData(userId, name, email) {
      var timestamp = new Date().valueOf()
      
      firebase.database().ref('posts').push({
        id: timestamp,
        description: $scope.postDescription,
        liked: false
      });
      
      $scope.postDescription = "";
    };
    
});