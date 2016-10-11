(function () {
  'use strict';

  angular.module('ml.todo', [])
    .factory('TodoService', ['localStorageService', '$rootScope', '$filter', TodoService])
    .directive('mlTodoWidget', ['TodoService', TodoWidget])
    .directive('mlTodoFocus', TodoFocus);

  function TodoService(localStorageService, $rootScope, $filter) {
    function Todo ($scope) {
      var self = this;
      this.$scope = $scope;
      this.todoFilter = {};
      this.activeTodo = {};
      this.activeFilter = 0;
      this.$scope.timerRunning = false;
      this.$scope.startTimer = function (){
          self.$scope.$broadcast('timer-start');
          self.$scope.timerRunning = true;
      };

      this.$scope.stopTimer = function (){
          self.$scope.$broadcast('timer-stop');
          self.$scope.timerRunning = false;
      };

      // this.filters = [
      //   {
      //     'title': 'All',
      //     'method': 'all'
      //   },
      //   {
      //     'title': 'Active',
      //     'method': 'active'
      //   },
      //   {
      //     'title': 'Completed',
      //     'method': 'completed'
      //   }
      // ];

      this.newTodoDescription ={
        "todayDescription" :"",
        "nextDescription" :"",
        "laterDescription" :"",
        "editing" :false
      }

      this.newTodo = {
          // "Id": 3,
          "ForUserId": 1000,
          "AddedByUserId": 1000,
          "JobId": null,
          "Description": "",
          "PublicNote": " ",
          "PrivateNote": " ",
          "Created": "",
          "ForDate": null,
          "PosNo": 1,
          "UnitMins": 25,
          "RestMins": 5,
          "UnitsEst": null,
          "UnitsAct": null,
          "HourlyRate": null,
          "DayMoveCount": null,
          "SplitOfTaskId": null,
          "Updated": null,
          "DayAllocation": 0,
          "Done": false,
          "Intervals": [],
          "TotalTime": null
      };

      if ( !localStorageService.get('todos') ) {
        var todos = [
                      {
                        "Id": 3,
                        "ForUserId": 1000,
                        "AddedByUserId": 1000,
                        "JobId": null,
                        "Description": "Task Test3",
                        "PublicNote": " ",
                        "PrivateNote": " ",
                        "Created": "2016-10-01T02:30:00+10:00",
                        "ForDate": null,
                        "PosNo": 1,
                        "UnitMins": 25,
                        "RestMins": 5,
                        "UnitsEst": null,
                        "UnitsAct": null,
                        "HourlyRate": null,
                        "DayMoveCount": null,
                        "SplitOfTaskId": null,
                        "Updated": "2016-10-01T02:30:00+10:00",
                        "DayAllocation": 0,
                        "Done": false,
                        "Intervals": [],
                        "TotalTime": null
                      },
                      {
                        "Id": 4,
                        "ForUserId": 1000,
                        "AddedByUserId": 1000,
                        "JobId": null,
                        "Description": "Task Test 4",
                        "PublicNote": " ",
                        "PrivateNote": " ",
                        "Created": "2016-10-01T02:30:00+10:00",
                        "ForDate": null,
                        "PosNo": 1,
                        "UnitMins": 25,
                        "RestMins": 5,
                        "UnitsEst": null,
                        "UnitsAct": null,
                        "HourlyRate": null,
                        "DayMoveCount": null,
                        "SplitOfTaskId": null,
                        "Updated": "2016-10-01T02:30:00+10:00",
                        "DayAllocation": 0,
                        "Done": false,
                        "Intervals": [
                          {
                            "Id": 1,
                            "UserId": 1000,
                            "TaskId": 4,
                            "Started": "2016-10-05T10:30:00+10:00",
                            "Ended": null
                          },
                          {
                            "Id": 2,
                            "UserId": 1000,
                            "TaskId": 4,
                            "Started": "2016-10-05T10:30:00+10:00",
                            "Ended": "2016-10-05T10:35:00+10:00"
                          }
                        ],
                        "TotalTime": "00:00:00"
                      },
                      {
                        "Id": 5,
                        "ForUserId": 1000,
                        "AddedByUserId": 1000,
                        "JobId": null,
                        "Description": "Task Test5",
                        "PublicNote": " ",
                        "PrivateNote": " ",
                        "Created": "2016-10-01T02:30:00+10:00",
                        "ForDate": null,
                        "PosNo": 1,
                        "UnitMins": 25,
                        "RestMins": 5,
                        "UnitsEst": null,
                        "UnitsAct": null,
                        "HourlyRate": null,
                        "DayMoveCount": null,
                        "SplitOfTaskId": null,
                        "Updated": "2016-10-01T02:30:00+10:00",
                        "DayAllocation": 1,
                        "Done": false,
                        "Intervals": [],
                        "TotalTime": null
                      },
                      {
                        "Id": 6,
                        "ForUserId": 1000,
                        "AddedByUserId": 1000,
                        "JobId": null,
                        "Description": "Task Test6",
                        "PublicNote": " ",
                        "PrivateNote": " ",
                        "Created": "2016-10-01T02:30:00+10:00",
                        "ForDate": null,
                        "PosNo": 1,
                        "UnitMins": 25,
                        "RestMins": 5,
                        "UnitsEst": null,
                        "UnitsAct": null,
                        "HourlyRate": null,
                        "DayMoveCount": null,
                        "SplitOfTaskId": null,
                        "Updated": "2016-10-01T02:30:00+10:00",
                        "DayAllocation": 1,
                        "Done": false,
                        "Intervals": [],
                        "TotalTime": null
                      },
                      {
                        "Id": 7,
                        "ForUserId": 1000,
                        "AddedByUserId": 1000,
                        "JobId": null,
                        "Description": "Task Test7",
                        "PublicNote": " ",
                        "PrivateNote": " ",
                        "Created": "2016-10-01T02:30:00+10:00",
                        "ForDate": null,
                        "PosNo": 1,
                        "UnitMins": 25,
                        "RestMins": 5,
                        "UnitsEst": null,
                        "UnitsAct": null,
                        "HourlyRate": null,
                        "DayMoveCount": null,
                        "SplitOfTaskId": null,
                        "Updated": "2016-10-01T02:30:00+10:00",
                        "DayAllocation": 2,
                        "Done": false,
                        "Intervals": [],
                        "TotalTime": null
                      }
                    ];

        localStorageService.set('todos', todos);
      }
      localStorageService.bind(this.$scope, 'todos');
      
      
      this.$scope.sprintSortOptions = {

        //restrict move across backlogs. move only within backlog.
        // accept: function (sourceItemHandleScope, destSortableScope, destItemScope) {
        //   return sourceItemHandleScope.itemScope.sortableScope.$parent.$parent.backlog.$$hashKey === destSortableScope.$parent.$parent.backlog.$$hashKey;
        // },
        itemMoved: function (event) {
          var destIndex = event.dest.index;
          var destModelName = event.dest.sortableScope.element[0].attributes['data-ng-model'].value;
          var changedTodo;
          if (destModelName == 'todayTodos'){
            $scope.todayTodos[destIndex].DayAllocation = 0;
            changedTodo = $scope.todayTodos[destIndex];
          }
          else if (destModelName == 'nextdayTodos'){
            $scope.nextdayTodos[destIndex].DayAllocation = 1;
            changedTodo = $scope.nextdayTodos[destIndex]
          }
          else if (destModelName == 'laterTodos'){
            $scope.laterTodos[destIndex].DayAllocation = 2;
            changedTodo = $scope.laterTodos[destIndex]
            
          }
          self.restore();
        },
        orderChanged: function (event) {
          console.log("orderChanged");
          console.log(event);
          self.restore();
        },
        containment: '#todos_container'
      };

      this.completedTodos = function(dayAllocation) {
        if (dayAllocation === 0){
          return $filter('filter')(this.$scope.todayTodos, { Done: !true });
        }
        else if (dayAllocation == 1){
          return $filter('filter')(this.$scope.nextdayTodos, { Done: !true });
        }
        else if (dayAllocation == 2){
          return $filter('filter')(this.$scope.laterTodos, { Done: !true });
        }
        
      };
      this._getTodosbyDayAllocation = function(dayAllocation){
        return $filter('filter')(this.$scope.todos, { DayAllocation: dayAllocation});
      }
      this.getTodosbyDayAllocation = function(){
        this.$scope.todayTodos = this._getTodosbyDayAllocation(0);
        this.$scope.nextdayTodos = this._getTodosbyDayAllocation(1);
        this.$scope.laterTodos = this._getTodosbyDayAllocation(2);
      }

      this.getOpenedTodoCounts = function(){
        this.$scope.openedTodayTodosCount = this.count(0);
        this.$scope.openedNextTodosCount = this.count(1);
        this.$scope.openedLaterTodosCount = this.count(2);
      }

      this.setActiveTodo = function(){
        if (this.activeTodo.Id != this.$scope.todayTodos[0].Id){
          this.activeTodo = this.$scope.todayTodos[0];
          this.$scope.stopTimer();
          // this.$scope.startTimer();
        }
        // return this.$scope.activeTodo;
      }
      this.getTodosbyDayAllocation();
      this.restore();

      this.addTodo = function() {
        if (this.todo.Description !== '' && this.todo.Description !== undefined) {
          console.log(this.todo);
          this.$scope.todos.push(this.todo);
          // $rootScope.$broadcast('todos:count', this.count());
          this.getTodosbyDayAllocation();
          this.restore();
        }
      };

      this.updateTodo = function() {
        this.getTodosbyDayAllocation();
        this.restore();
      };
    }

    /*
    * Param: dayAllocation: 0: today, 1: nextday, 2: later
    */
    Todo.prototype.saveTodo = function(dayAllocation) {
      if (dayAllocation === 0){
        this.todo.Description = this.todoDescription.todayDescription
      }
      else if (dayAllocation == 1){
        this.todo.Description = this.todoDescription.nextDescription
      }
      else if (dayAllocation == 2){
        this.todo.Description = this.todoDescription.laterDescription
      }
      
      if ( this.todoDescription.editing ) {
        this.updateTodo();
      } else {
        this.todo.DayAllocation = dayAllocation;
        this.addTodo();

        this.focusTodoInput(dayAllocation);
      }
    };

    Todo.prototype.editTodo = function(todo, dayAllocation) {
      console.log(todo);
      this.todo = todo;
      if (dayAllocation === 0){
        this.todoDescription.todayDescription = this.todo.Description;
      }
      else if (dayAllocation == 1){
        this.todoDescription.nextDescription = this.todo.Description;
      }
      else if (dayAllocation == 2){
        this.todoDescription.laterDescription = this.todo.Description;
      }
      
      this.todoDescription.editing = true;

      this.focusTodoInput(dayAllocation);
    };

    Todo.prototype.focusTodoInput = function(dayAllocation){
      if (dayAllocation === 0){
        this.$scope.$broadcast('focusTodayTodoInput');
      }
      else if (dayAllocation == 1){
        this.$scope.$broadcast('focusNextTodoInput');
      }
      else if (dayAllocation == 2){
        this.$scope.$broadcast('focusLaterTodoInput');
      }
    }

    Todo.prototype.toggleDone = function(todo) {
      todo.Done = !todo.Done;
      this.getOpenedTodoCounts();
      
    };

    Todo.prototype.showTimer = function(index, todo){
      var orginTodo = {},
          changedTodo = {};
      if (todo.DayAllocation === 0){
        this.$scope.todayTodos.splice(index, 1);
      }
      else if (todo.DayAllocation == 1){
        this.$scope.nextdayTodos.splice(index, 1);
      }
      else if (todo.DayAllocation == 2){
        this.$scope.laterTodos.splice(index, 1);
      }
      todo.DayAllocation = 0;
      this.$scope.todayTodos.unshift(todo);
      this.getOpenedTodoCounts();
      this.setActiveTodo();
    }

    Todo.prototype.clearCompleted = function() {
      this.$scope.todos = this.completedTodos();
      this.restore();
    };

    Todo.prototype.count = function(dayAllocation) {
      return this.completedTodos(dayAllocation).length;
    };

    Todo.prototype.restore = function() {
      // this.getTodosbyDayAllocation();
      this.getOpenedTodoCounts();
      this.setActiveTodo();
      this.todo = angular.copy(this.newTodo);
      this.todoDescription = angular.copy(this.newTodoDescription);
    };

    Todo.prototype.filter = function(filter) {
      if ( filter === 'active' ) {
        this.activeFilter = 1;
        this.todoFilter = { Done: false };
      } else if ( filter === 'completed' ) {
        this.activeFilter = 2;
        this.todoFilter = { Done: true };
      } else {
        this.activeFilter = 0;
        this.todoFilter = {};
      }
    };

    return Todo;
  }

  function TodoWidget(TodoService) {
    return {
      restrict: 'EA',
      templateUrl: 'tpl/partials/todo-widget.html',
      replace: true,
      link: link
    };

    function link($scope, $element) {
      $scope.todoService = new TodoService($scope);
    }
  }

  function TodoFocus() {
    return function(scope, elem, attr) {
      scope.$on(attr.mlTodoFocus, function(e) {
        elem[0].focus();
      });
    };
  }

}());
