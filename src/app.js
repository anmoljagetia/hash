var jcrypt = require('./jcrypt')

function JPasswordManager($scope) {
  $scope.hashText = ''
  $scope.publicKey = ''
  $scope.privateKey = ''
  $scope.iterations = 1

  $scope.doHash = function () {
    if ($scope.publicKey && $scope.privateKey) {
      $scope.hashText = jcrypt($scope.privateKey, $scope.publicKey, $scope.iterations)
    } else {
      $scope.hashText = ''
    }
  }

  $scope.clearHash = function () {
    $scope.hashText = ''
  }

  $scope.$watch('publicKey', $scope.doHash)
  $scope.$watch('privateKey', $scope.doHash)
  $scope.$watch('iterations', $scope.doHash)
}

window.JPasswordManager = JPasswordManager
