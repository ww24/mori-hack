
var ENDPOINT = "https://oas7b.cybozu.com/k/v1/records.json";
var TOKEN = "gobsSVsH99PaCw1bmKO6rjZttWb8loTDTDgod4jd";

// service
angular
.module("app.service", [])
.factory("woodList", function ($http) {
  var woodList = {
    get: function () {
      return $http({
        method: "GET",
        url: ENDPOINT,
        headers: {
          "X-Cybozu-API-Token": TOKEN
        },
        params: {
          app: 3
        }
      }).then(function (res) {
        var data = res.data.records;
        data.sort(function (a, b) {
          return a.$id.value - b.$id.value;
        });
        data = data.map(function (item, index) {
          item.set = function () {
            localStorage.setItem("woodIndex", index.toString());
          };
          return item;
        });
        var json_str = JSON.stringify(data);
        localStorage.setItem("woodList", json_str);
        return data;
      }).catch(function (err) {
        console.error(err);
      });
    }
  };

  return woodList;
})
.factory("woodListCache", function () {
  var woodList = JSON.parse(localStorage.getItem("woodList") || "[]");
  woodList = woodList.map(function (item, index) {
    item.set = function () {
      localStorage.setItem("woodIndex", index.toString());
    };
    return item;
  });
  return woodList;
})
.factory("productList", function () {
  var productList = [{
    date: {
      value: "2016/02/28"
    },
    thumbnailURL: {
      value: "img/product_s.png"
    },
    imageURL: {
      value: "img/product_l.png"
    },
    name: {
      value: "椅子"
    },
    shop: {
      value: "イオン熊本店"
    },
    woodIndex: 4
  }];

  productList = productList.map(function (item, index) {
    item.set = function () {
      localStorage.setItem("productIndex", index.toString());
    };
    return item;
  });

  return productList;
})
.factory("timeline", function ($http, woodListCache, $q) {
  var index = Number(localStorage.getItem("woodIndex") || 0);
  var wood = woodListCache[index];
  var id = Number(wood.$id.value || 0);
  console.log("index:", id);

  var timeline = {
    get: function () {
      var deferred = $q.defer();
      deferred.resolve([
        {
          name: "オーナー",
          state: "owner",
          date: "2016/02/15",
          owner: "井上 まこと"
        },
        {
          name: "人吉製材所",
          state: "seizai",
          date: "2016/02/20"
        },
        {
          name: "人吉木工",
          state: "mokkou",
          date: "2016/03/01"
        },
        {
          name: "イオン熊本店",
          state: "kouri",
          date: "2016/03/21"
        },
        {
          name: "購入",
          state: "product",
          date: "2016/04/01"
        }
      ]);
      return deferred.promise;
    }
  };

  return timeline;
});
