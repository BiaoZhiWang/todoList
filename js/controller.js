(function(angular){
    angular.module('todoController',['ngRoute'])
        /*设置路由*/
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/:order?',{
                templateUrl:'viewHTMLTemplate/todolist.html',
                controller:'todoDataController'
            }).otherwise({
                redirectTo:'viewHTMLTemplate/404.html'
            })
        }])
        /*设置控制器*/
        .controller('todoDataController',['$scope','$routeParams','DataService',function($scope,$routeParams,DataService){
                $scope.taskList=DataService.getlocalData();
                console.log($scope.taskList);

            //增加任务
               $scope.addTask=function(newTask){
                   if(!$scope.newTask) return;
                   DataService.addTask($scope.newTask);
                   //将输入内容置空
                   $scope.newTask='';
               }
            //删除任务
            $scope.removeTask=function(id){
                console.log(id);
                DataService.removeTask(id);
            }

            //修改任务
            $scope.editing=function(id){
                //console.log($scope.updateName);
                $scope.taskList.every(function(task,index){
                    if(task.id==id){
                        $scope.updateName=task.name;
                        return false;
                    }else return true;
                });
                $scope.editingId=id;
            };
            $scope.updateTask=function(id,updateName){
                console.log(id,updateName);
                if(updateName){
                    $scope.taskList.every(function(task,index){
                        if(task.id==id){
                            task.name=updateName;
                            return false;
                        }else return true;
                    });
                    DataService.saveLocalData();
                }
                //if(!$scope.taskList[id].name) return;
                $scope.editingId=0;

            };
            //得到未完成的任务数
            $scope.getUnCompletedTasks=function(){
              return  DataService.getUnCompletedTasks();
            }

            //看是否需要显示  清除完成按钮
            $scope.needShow=function(){
                return DataService.needShow();
            }

            //移除已经完成的任务
            $scope.removeCompletedTasks=function(){
                DataService.removeCompletedTasks();
            };

            //点击完成按钮保存状态
            $scope.saveCompleteStatus=function(){
                DataService.saveLocalData();
            };

            //全选按钮

            $scope.isAllCompleted=function(){
                DataService.isAllCompleted($scope.isAllCompletedFlag);
            };
            //自动切换全选状态

            $scope.updateAllfinishStatus=function(){
                if(DataService.checkAllTasksCompleteStatus()){
                    $scope.isAllCompletedFlag=true;
                }else{
                    $scope.isAllCompletedFlag=false;
                }
            };
            $scope.updateAllfinishStatus();
            //路由
            console.log($routeParams);
            switch($routeParams.order){
               case "all":
                   $scope.status=undefined;
                   break;
               case "active":
                   $scope.status=false;
                   break;
               case "Completed":
                   $scope.status=true;
                   break;
           }

        }])
})(angular);