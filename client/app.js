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

var expectFriendNames = function(expectedNames, key) {
    element.all(by.repeater(key + ' in musics').column(key + '.name')).then(function(arr) {
        arr.forEach(function(wd, i) {
            expect(wd.getText()).toMatch(expectedNames[i]);
        });
    });
};

it('should search across all fields when filtering with a string', function() {
    var searchText = element(by.model('searchText'));
    searchText.clear();
    searchText.sendKeys('m');
    expectFriendNames([], 'friend');

    searchText.clear();
    searchText.sendKeys('76');
    expectFriendNames([], 'friend');
});

it('should search in specific fields when filtering with a predicate object', function() {
    var searchAny = element(by.model('search.$'));
    searchAny.clear();
    searchAny.sendKeys('i');
    expectFriendNames([], 'friendObj');
});
it('should use a equal comparison when comparator is true', function() {
    var searchName = element(by.model('search.name'));
    var strict = element(by.model('strict'));
    searchName.clear();
    searchName.sendKeys();
    strict.click();
    expectFriendNames([], 'friendObj');
});