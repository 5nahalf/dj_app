var app = angular.module("app", []);
app.controller("IndexController", ["$scope", "$http", function($scope, $http){
    $scope.cat = {};
    $scope.cats = [];
    var fetchCats = function(){
        return $http.get("/cats").then(function(response){
            if(response.status !== 200){
                throw new Error("failed to fetch cats from the api");
            }
            $scope.cat = {};
            $scope.cats = response.data;
            return response.data;
        })
    };
    $scope.add = function(cat){
        return $http.post("/add", cat).then(fetchCats);
    };
    $scope.remove = function(cat) {
        return $http.post('/remove', cat).then(fetchCats);
    };
    fetchCats();
}]);

app.controller("DataController", ["$scope", "$http", function($scope, $http){
    $scope.music = {};
    $scope.musics = [];
    var fetchMusic = function(){
        return $http.get("/musicdata").then(function(response){
            if(response.status !== 200){
                throw new Error("failed to fetch muisc from the api");
            }
            $scope.music = {};
            $scope.musics = response.data;
            return response.data;
        })
    };
    $scope.add = function(data){
        return $http.post("/madd", data).then(fetchMusic);
    };
    $scope.remove = function(data) {
        return $http.post('/mremove', data).then(fetchMusic);
    };
    fetchMusic();
}]);


$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');
        $('.tabs ' + currentAttrValue).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
    });
});

//_________

var angularApp = angular.module('TabsApp', []);
angularApp.controller('TabManagerCtrl', ['$scope', function ($scope) {

    var n = $http.get("/musicdata")

    var containsText = function (search) {
        var gotText = false;
        for (var i in n) {
            var re = new RegExp(search, "ig");
            var s = re.test(n[i]);
            if (s) {
                $scope.itemsArr.push(n[i]);
                gotText = true;
            }
        }
        return gotText;
    };
    $scope.searchText = "";
    $scope.itemsSelectedArr = [];
    $scope.itemsArr = [];
    $scope.itemsDisplaPanel = false;
    $scope.searchMe = function (search) {
        $scope.itemsArr = [];
        $scope.itemsDisplaPanel = false;
        if (search.length > 2) {
            var foundText = containsText(search);
            $scope.itemsDisplaPanel = (foundText) ? true : false;
        }
    };

    $scope.itemSelectedData = function (str) {
        $scope.itemsDisplaPanel = false;
        $scope.searchText = "";
        return (str) ? $scope.itemsSelectedArr.push(str) : false;
    };

    $scope.itemSelectedDelet = function (sel) {
        var idx = $scope.itemsSelectedArr.indexOf(sel);
        if (idx !== -1) $scope.itemsSelectedArr.splice(idx, 1);
        $scope.itemsDisplaPanel = false;
    };

}]);

angularApp.directive('ngsearchtext', function () {
    return function (scope, element, attrs) {
        element.bind("keyup", function (event) {
            if (event.which !== 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngsearchtext);
                });

                event.preventDefault();
            }
        });
    };
});