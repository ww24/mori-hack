/**
 * ぼくらの森プロジェクト
 */

// app
var app = angular
.module("app", ["ui.router", "app.controller", "app.service"]);
app.run(function ($state) {
  console.log("v1.0.0");
  $state.go("top");
}).config(function ($stateProvider) {
  $stateProvider
  .state("top", {
    url: "/",
    templateUrl: "templates/top.html",
    controller: "listCtrl"
  })
  .state("detail", {
    url: "/detail",
    templateUrl: "templates/detail.html",
    controller: "detailCtrl"
  })
  .state("timeline", {
    url: "/timeline",
    templateUrl: "templates/timeline.html",
    controller: "timelineCtrl"
  });
});
