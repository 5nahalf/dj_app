var app = angular.module("app", ['colorpicker.module']);
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
    $scope.mplay = function(data, id){
        var play = {"play": data};
        return $http.put('/' + id, play).then(fetchMusic);
    };
    fetchMusic();


    $scope.style = {};
    $scope.styles = [];
    var fetchStyle = function(){
        return $http.get("/styledata").then(function(response){
            if(response.status !== 200){
                throw new Error("failed to fetch style from the api");
            }
            $scope.style = {};
            $scope.styles = response.data;
            return response.data;
        })
    };
    $scope.sadd = function(data){
        return $http.post("/sadd", data).then(fetchStyle);
    };
    $scope.sremove = function(data) {
        return $http.post('/sremove', data).then(fetchStyle);
    };
    fetchStyle();
}]);
app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
app.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});