(function(angular){
    angular.module('dataDealService',[])
        .service('DataService',['$window',function($window){

            //存储/读取到localStorage
            var taskList=[];
            this.getlocalData=function(){
              taskList=JSON.parse($window.localStorage.getItem('todoList'));
              return taskList;
            };
            this.saveLocalData=function(){
                $window.localStorage.setItem('todoList',JSON.stringify(taskList))
            };

            //增加任务
            this.addTask=function(newTask){
                var id=taskList.length?taskList[taskList.length-1].id+1:1;
                taskList.push({
                    id:id,
                    name:newTask,
                    isCompleted:false
                });
                this.saveLocalData();
            };
            //删除任务
            this.removeTask=function(id){
                taskList.every(function(task,index){
                    if(task.id==id){
                        taskList.splice(index,1);
                        return false;
                    }else return true;
                });
                this.saveLocalData();
            };
            //修改任务

            this.updataTask=function(){};

            //得到未完成的任务
            this.getUnCompletedTasks=function(){
                var count=0;
                for(var i=0;i<taskList.length;i++){
                    if(!taskList[i].isCompleted){
                        count++;
                    }
                }
                return count;
            }

            //显示 清除按钮
            this.needShow=function(){
                var flag=false;
                taskList.every(function(task,index){
                    if(task.isCompleted){
                        flag=true;
                        return false;
                    }else return true;
                });

                return flag;
            }

            //移除已完成的任务
            this.removeCompletedTasks=function(){
                for(var i=taskList.length-1;i>=0;i--){
                    if(taskList[i].isCompleted){
                        taskList.splice(i,1);
                    }
                }
                this.saveLocalData();
            }

            //全选按钮
            this.isAllCompleted=function(flag){
                if(flag){
                    taskList.forEach(function(task){
                        task.isCompleted=true;
                    });
                }else{
                    taskList.forEach(function(task){
                        task.isCompleted=false;
                    });
                }
                this.saveLocalData();
            };
            //检查全选状态
            this.checkAllTasksCompleteStatus=function(){
                var completedTasksNum=0;
                taskList.forEach(function(task){
                    if(task.isCompleted){
                        completedTasksNum++;
                    }
                });
               if(completedTasksNum===taskList.length){
                   return true;
               }else{
                   return false;
               }
            }
        }])
})(angular);