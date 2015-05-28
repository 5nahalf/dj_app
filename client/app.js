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
    $scope.addSong = function(id, art){
        var newSong = {"name":id + ": " + art};
        return $http.post("/add", newSong).then(fetchCats);
    };
    fetchCats();


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
    $scope.madd = function(data){
        return $http.post("/madd", data).then(fetchMusic);
    };
    $scope.mremove = function(data) {
        return $http.post('/mremove', data).then(fetchMusic);
    };
    fetchMusic();


}]);




//$(document).ready(function() {
//    $('.tabs .tab-links a').on('click', function(e)  {
//        var currentAttrValue = $(this).attr('href');
//        $('.tabs ' + currentAttrValue).show().siblings().hide();
//        $(this).parent('li').addClass('active').siblings().removeClass('active');
//        e.preventDefault();
//    });
//
//});
