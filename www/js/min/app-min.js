var unionVillage=angular.module("unionVillage",["ui.router","unionVillage.controllers","unionVillage.services","unionVillage.directives","firebase"]);unionVillage.config(function(e,l){e.state("unionVillage",{"abstract":!0,views:{header:{templateUrl:"templates/header.html"},footer:{templateUrl:"templates/footer.html"}}}).state("unionVillage.home",{url:"/",views:{"content@":{templateUrl:"templates/index.html"}}}).state("unionVillage.dashboard",{url:"/dashboard",views:{"content@":{templateUrl:"templates/dashboard.html"}}}).state("unionVillage.medicalPortal",{url:"/medicalPortal",views:{"content@":{templateUrl:"templates/medicalPortal.html"}}}),l.otherwise("/")});