var unionVillage=angular.module("unionVillage",["ui.router","unionVillage.controllers","unionVillage.services","unionVillage.directives","firebase"]);unionVillage.config(function(e,t){e.state("unionVillage",{"abstract":!0,views:{header:{templateUrl:"templates/header.html"},footer:{templateUrl:"templates/footer.html"}}}).state("unionVillage.home",{url:"/",views:{"content@":{templateUrl:"templates/home.html"}}}).state("unionVillage.dashboard",{url:"/dashboard",views:{"content@":{templateUrl:"templates/dashboard.html"}}}).state("unionVillage.medicalPortal",{url:"/medicalPortal",views:{"content@":{templateUrl:"templates/medicalPortal.html"}}}).state("unionVillage.community",{url:"/community",views:{"content@":{templateUrl:"templates/community.html"}}}).state("unionVillage.nearby",{url:"/nearby",views:{"content@":{templateUrl:"templates/nearby.html"}}}).state("unionVillage.myCommunity",{url:"/myCommunity",views:{"content@":{templateUrl:"templates/myCommunity.html"}}}).state("unionVillage.myHome",{url:"/myHome",views:{"content@":{templateUrl:"templates/myHome.html"}}}).state("unionVillage.success",{url:"/success",views:{"content@":{templateUrl:"templates/success.html"}}}),t.otherwise("/")});