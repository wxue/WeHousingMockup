/* Controllers */

weHousingApp.controller('AptCtrl', function ($scope, $log, AptItem) {
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $scope.aptCount = 0;

  $scope.apt_list = [];
  $scope.apt_list_no_data = true;

  // fetch data
  $scope.get_aptitem_data = function () {
    AptItem.get({
    }, function(data) {
      var temp_data = data.apartments;
      if (temp_data !== null && temp_data !== undefined) {
        $scope.apt_list = temp_data;
        $scope.aptCount = temp_data.length;
        $log.log($scope.apt_list);
        $scope.apt_list_no_data = false;
      }
    }, function(error) {
      $log.error(error);
    });
  }

  // initialize
  $scope.get_aptitem_data();
  $scope.sort_key = 'popularity';
  $scope.reverse = true;

  // toggle sort key
  $scope.sortby = function(sort_key) {
    $scope.reverse = ($scope.sort_key === sort_key) ? !$scope.reverse : false;
    $scope.sort_key = sort_key;
  };

  // synchronize data
  $scope.$watchCollection(
      function () {
        return $scope.apt_list_no_data;
      },
      function (new_value, old_value) {
        if (( new_value !== undefined ) && ( new_value !== old_value )) {
          $scope.sortby('popularity');
        }
      }
  );
});