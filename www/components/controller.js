
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

  $scope.openProductList = function () {
    $state.go("product_list");
  };

  var statuses = ["幼齢", "若齢", "成熟", "老齢", "立ち枯れ", "製品化"];

  woodList.get().then(function (list) {
    list = list.map(function (item) {
      item.openProduct = function () {
        if (item.status.value === "製品化") {
          item.set();
          $state.go("product_detail");
        }
      };
      item.openMap = function () {
        event.preventDefault();
        item.set();
        $state.go("map");
      };

      item.openDetail = function (event) {
        var cls = event.target.getAttribute("class");
        console.log(cls);
        if (cls.indexOf("status_5") < 0 && cls.indexOf("map") < 0) {
          item.set();
          $state.go("detail");
        }
      };

      item.statusToClass = function () {
        var index = statuses.indexOf(item.status.value);
        if (index < 0) {
          console.log(item.status.value);
        }
        return "status_" + index;
      };
      item.statusToMap = function () {
        var index = statuses.indexOf(item.status.value);
        if (index < 4) {
          return "map-enable";
        }
      };

      return item;
    });
    $scope.woodList = list;
    // $scope.$apply();
  });
})
.controller("detailCtrl", function (woodListCache, $scope) {
  var index = Number(localStorage.getItem("woodIndex") || 0);
  var wood = woodListCache[index];
  console.log(wood);
  $scope.wood = wood;
})
.controller("productListCtrl", function (woodListCache, productList, $scope, $state) {
  var products = woodListCache.filter(function (wood) {
    return wood.status.value === "製品化";
  });

  productList = productList.map(function (item) {
    item.openDetail = function () {
      item.set();
      $state.go("product_detail");
    };
    return item;
  });

  $scope.productList = productList;
})
.controller("productDetailCtrl", function (productList, woodListCache, $scope, $state) {
  var index = Number(localStorage.getItem("productIndex") || 0);
  var product = productList[index];
  console.log(product);
  $scope.product = product;
  $scope.wood = woodListCache[product.woodIndex];
  $scope.openTimeline = function () {
    $scope.wood.set();
    $state.go("timeline");
  };
})
.controller("timelineCtrl", function (woodListCache, timeline, $scope) {
  var index = Number(localStorage.getItem("woodIndex") || 0);
  var wood = woodListCache[index];
  console.log(wood);
  $scope.wood = wood;
  $scope.list = [];

  timeline.get().then(function (events) {
    console.log(events);
    $scope.list = events;
    // $scope.$apply();
  });
})
.controller("mapCtrl", function (woodListCache, $scope) {
  var index = Number(localStorage.getItem("woodIndex") || 0);
  var wood = woodListCache[index];
  console.log(wood);
  $scope.wood = wood;

  // Google Map API
  var myLatLng = {lat: Number(wood.lat.value), lng: Number(wood.lng.value)};
  var map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 16
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  });
});
