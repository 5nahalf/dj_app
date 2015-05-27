var app = angular.module("app", ['infinite-scroll']);
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
app.controller('search', ['$scope',function($scope){
    $scope.musics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $scope.loadMore = function() {
        var last = $scope.musics[$scope.musics.length - 1];
        for(var i = 1; i <= 10; i++) {
            $scope.musics.push(last + i);
        }
    };
}]);

$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');
        $('.tabs ' + currentAttrValue).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
    });
});