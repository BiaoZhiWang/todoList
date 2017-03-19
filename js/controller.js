(function(angular){
    angular.module('todoController',['ngRoute'])
        /*����·��*/
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/:order?',{
                templateUrl:'viewHTMLTemplate/todolist.html',
                controller:'todoDataController'
            }).otherwise({
                redirectTo:'viewHTMLTemplate/404.html'
            })
        }])
        /*���ÿ�����*/
        .controller('todoDataController',['$scope','$routeParams','DataService',function($scope,$routeParams,DataService){
                $scope.taskList=DataService.getlocalData();
                console.log($scope.taskList);

            //��������
               $scope.addTask=function(newTask){
                   if(!$scope.newTask) return;
                   DataService.addTask($scope.newTask);
                   //�����������ÿ�
                   $scope.newTask='';
               }
            //ɾ������
            $scope.removeTask=function(id){
                console.log(id);
                DataService.removeTask(id);
            }

            //�޸�����
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
            //�õ�δ��ɵ�������
            $scope.getUnCompletedTasks=function(){
              return  DataService.getUnCompletedTasks();
            }

            //���Ƿ���Ҫ��ʾ  �����ɰ�ť
            $scope.needShow=function(){
                return DataService.needShow();
            }

            //�Ƴ��Ѿ���ɵ�����
            $scope.removeCompletedTasks=function(){
                DataService.removeCompletedTasks();
            };

            //�����ɰ�ť����״̬
            $scope.saveCompleteStatus=function(){
                DataService.saveLocalData();
            };

            //ȫѡ��ť

            $scope.isAllCompleted=function(){
                DataService.isAllCompleted($scope.isAllCompletedFlag);
            };
            //�Զ��л�ȫѡ״̬

            $scope.updateAllfinishStatus=function(){
                if(DataService.checkAllTasksCompleteStatus()){
                    $scope.isAllCompletedFlag=true;
                }else{
                    $scope.isAllCompletedFlag=false;
                }
            };
            $scope.updateAllfinishStatus();
            //·��
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