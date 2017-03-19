(function(angular){
    angular.module('dataDealService',[])
        .service('DataService',['$window',function($window){

            //�洢/��ȡ��localStorage
            var taskList=[];
            this.getlocalData=function(){
              taskList=JSON.parse($window.localStorage.getItem('todoList'));
              return taskList;
            };
            this.saveLocalData=function(){
                $window.localStorage.setItem('todoList',JSON.stringify(taskList))
            };

            //��������
            this.addTask=function(newTask){
                var id=taskList.length?taskList[taskList.length-1].id+1:1;
                taskList.push({
                    id:id,
                    name:newTask,
                    isCompleted:false
                });
                this.saveLocalData();
            };
            //ɾ������
            this.removeTask=function(id){
                taskList.every(function(task,index){
                    if(task.id==id){
                        taskList.splice(index,1);
                        return false;
                    }else return true;
                });
                this.saveLocalData();
            };
            //�޸�����

            this.updataTask=function(){};

            //�õ�δ��ɵ�����
            this.getUnCompletedTasks=function(){
                var count=0;
                for(var i=0;i<taskList.length;i++){
                    if(!taskList[i].isCompleted){
                        count++;
                    }
                }
                return count;
            }

            //��ʾ �����ť
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

            //�Ƴ�����ɵ�����
            this.removeCompletedTasks=function(){
                for(var i=taskList.length-1;i>=0;i--){
                    if(taskList[i].isCompleted){
                        taskList.splice(i,1);
                    }
                }
                this.saveLocalData();
            }

            //ȫѡ��ť
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
            //���ȫѡ״̬
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