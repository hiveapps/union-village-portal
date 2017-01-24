var unionVillage = angular.module('unionVillage.controllers', []);

/* !!!FIREBASE 3.0!!! Initialize Firebase */
// Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEQLgoUIz4JcggXiURBVPylAq0pJYrgi0",
    authDomain: "temporaryuv.firebaseapp.com",
    databaseURL: "https://temporaryuv.firebaseio.com",
    storageBucket: "temporaryuv.appspot.com",
    messagingSenderId: "1020616732436"
  };
  firebase.initializeApp(config);

unionVillage.controller("headerCtrl", function($scope, $location) {
  var user = firebase.auth().currentUser;

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
    document.getElementById('displayName').textContent = "Welcome " + user.displayName + "!";
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
    var user = firebase.auth().currentUser;

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


    // Weather - Docs at http://simpleweatherjs.com
    $(document).ready(function() {
      $.simpleWeather({
        woeid: '2357536', //2357536
        location: 'Henderson, NV',
        unit: 'f',
        success: function(weather) {
          html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
          html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
          html += '<li class="currently">'+weather.currently+'</li>';
          html += '<li>'+weather.alt.temp+'&deg;C</li>';
          html += '<li><p style="float: left; margin-right: 10px;">Today&#39;s High/Low:</p>'+weather.high+'&deg / '+weather.low+'&deg</li></ul>';
          
          for(var i=1;i<4;i++) {
            html += '<p>'+weather.forecast[i].day+' H/L: '+weather.forecast[i].high+ '/' +weather.forecast[i].low+'</p>';
          }
      
          $("#weather").html(html);
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });
    });


    // Calendar$(document).ready(function(){  		
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
        startDate: new Date(2016,09, 31),
        endDate: new Date(2016,09, 31),
        title: "Henderson Hospital Opens!",
        description: "After years of development Henderson Hospital is open for business and Union Village officially kicks off!",
        allDay: true,
        priority: 3,
        frecuency:1
      }
    );	
    $("#calendar").dp_calendar({
      format_ampm: true,
      events_array: events_array
    });
    
});



unionVillage.controller("mapCtrl", function() {
  /*$('#mapsvg').mapSvg({
    source: '/maps/sitemap.svg',
    colors: {
      base: "rgba(0,0,0,0.5)",
      background: "#fff",
      hover: 'rgba(255,0,0,0.5)',
      selected: 'rgba(0,0,0,0.5)'
    },
    tooltips: {mode: "id"},
    popovers: {mode: function(region){
        return '<b>' + region.id + '</b>' + region.title }
    },
    zoom: {
      on: true,
      buttons: {position: "right"},
      limit: [0,10]
    },
    scroll: {on: true},
    responsive: true,
    loadingText: 'Loading map...',

  });*/

  var mymap = L.map('mapid').setView([36.039524, -114.981720], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/atans2468/ciwfpyoxm00692ppadp2ppmdo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXRhbnMyNDY4IiwiYSI6ImNpd2ZwaTR5MDAwcWoydWtpcjBoZDZlN3MifQ.eG1J9lZ6Wi-7vIfSKm-7Jg', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'ciwfpyoxm00692ppadp2ppmdo',
      accessToken: 'pk.eyJ1IjoiYXRhbnMyNDY4IiwiYSI6ImNpd2ZwaTR5MDAwcWoydWtpcjBoZDZlN3MifQ.eG1J9lZ6Wi-7vIfSKm-7Jg'
  }).addTo(mymap);

  var marker = L.marker([36.071123, -115.030247]).addTo(mymap);

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

});


/* reservations controller */
unionVillage.controller("reservationsCtrl", function() {
    var user = firebase.auth().currentUser;

    $( "#datepicker" ).datepicker();

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
    
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child('mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('images/mountains.jpg');

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name            // true
    mountainsRef.fullPath === mountainImagesRef.fullPath    // false
    
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


/* End of calendar controller */


/* App Controller */
unionVillage.controller("appCtrl", function($scope, $state) {
  $scope.$state = $state;
});