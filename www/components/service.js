
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
.factory("wood", function () {
  var index = Number(localStorage.getItem("woodIndex") || 0);
  var woodList = JSON.parse(localStorage.getItem("woodList") || "[]");
  return woodList[index];
})
.factory("timeline", function ($http, wood) {
  var id = Number(wood.$id.value || 0);
  console.log("index:", id);

  var timeline = {
    get: function () {
      return Promise.resolve([
        {
          name: "オーナー",
          status: "伐採",
          time: "2016/02/03"
        },
        {
          name: "人吉製材所",
          status: "製材",
          time: "2016/02/05"
        },
        {
          name: "人吉木工",
          status: "製造",
          time: "2016/02/12"
        },
        {
          name: "そごうXXX店",
          status: "納品",
          time: "2016/02/28"
        },
        {
          name: "購入",
          status: "購入",
          time: "2016/03/10"
        }
      ]);
    }
  };

  return timeline;
});
