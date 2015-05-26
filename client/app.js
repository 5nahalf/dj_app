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

$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');

        // Show/Hide Tabs
        $('.tabs ' + currentAttrValue).show().siblings().hide();

        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
});