var todoModule = angular.module("todoModule", [])

todoModule.controller("todoController", todoController)

function todoController() {
    this.todos = [
        {val:'Learn Angular 1'}, 
        {val:'Visit JavaBrains site'}, 
        {val:'Learn more Angular'}
    ]
    this.editable = true;
    
    this.addATodo = function() {
        this.todos.push({val:this.newTodo});
        this.newTodo = ''
    }
    
    this.delete = function(index) {
        this.todos.splice(index, 1)
    }
    
    this.flipIt = function() {
        this.editable = !this.editable
    }
}