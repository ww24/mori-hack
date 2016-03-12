
// controller
angular
.module("app.controller", ["app.service", "ui.router"])
.controller("header", function ($scope) {
  $scope.back = function () {
    history.back();
  };
})
.controller("listCtrl", function (woodList, $scope, $state) {
  $scope.woodList = [];

  // zero padding
  $scope.pad = function (num, count) {
    count = count || 2;
    return (Array(count).join("0") + num).slice(-count);
  };

  woodList.get().then(function (list) {
    list = list.map(function (item) {
      item.openDetail = function () {
        item.set();
        $state.go("detail");
      };
      item.openTimeline = function () {
        item.set();
        $state.go("timeline");
      };
      return item;
    });
    $scope.woodList = list;
  });
})
.controller("detailCtrl", function (wood, $scope) {
  console.log(wood);
  $scope.wood = wood;
})
.controller("productCtrl", function (wood, $scope) {
  console.log(wood);
  $scope.wood = wood;

  // product.get(wood.$id.value)
})
.controller("timelineCtrl", function (wood, timeline, $scope) {
  $scope.wood = wood;
  $scope.list = [];

  timeline.get().then(function (events) {
    events = events.reverse();
    console.log(events);
    $scope.list = events;
    $scope.$apply();
  });
});
