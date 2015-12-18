var app = angular.module('todoApp', []);
app.controller('todoCtrl', function ($scope) {
    //所有的todo项
    $scope.allList = [];

    //0:全部，1：活动，2：完成
    $scope.showIndex = 0;

    //文本框按键弹起事件
    $scope.myKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        //弹起的是回车键
        if (keycode == 13) {
            $scope.addTodo($scope.currentTodo);
            $scope.currentTodo = '';
        }
    };

    //添加todo
    $scope.addTodo = function (todoName) {
        var todo = {
            todoName: todoName,
            isCompeleted: false
        };
        $scope.allList.push(todo);
    }

    //删除todo
    $scope.removeTodo = function (todo) {
        for (var i = $scope.allList.length - 1; i >= 0; i--) {
            if ($scope.allList[i] == todo) {
                $scope.allList.splice(i, 1);
                break;
            }
        }
    }

    //活动todo个数
    $scope.activeCount = function () {
        return $scope.allList.filter(function (item) {
            return !item.isCompeleted;
        }).length;
    }

    //是否有完成todo
    $scope.hasCompleted = function () {
        return $scope.allList.some(function (item) {
            return item.isCompeleted;
        });
    }

    //清除已完成的todo
    $scope.ClearCompleted = function () {
        $scope.allList = $scope.allList.filter(function (item) {
            return !item.isCompeleted;
        });
    }

    //全选/全不选
    $scope.toggleCheckAll = function () {
        var isChecked = !$scope.isCheckedAll();
        $scope.allList.forEach(function (value, index, array) {
            value.isCompeleted = isChecked;
        })
    }

    //是否全部完成
    $scope.isCheckedAll = function () {
        return $scope.allList.length == $scope.allList.filter(function (item) {
                return item.isCompeleted;
            }).length;
    }

    //获取显示的todo
    $scope.getShowList = function (todo) {
        switch ($scope.showIndex) {
            //活动todo
            case 1:
                return !todo.isCompeleted;
                break;
            //已完成todo
            case 2:
                return todo.isCompeleted;
                break;
            //所有todo
            default:
                return true;
        }
    }
});