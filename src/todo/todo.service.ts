import { Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from "./dto/inputs";
import { StatusArgs } from "./dto/args/status.args";

@Injectable()
export class TodoService {

    private todos: Todo [] = [
        { id: 1, description: "Todo 1 description", done: false },
        { id: 2, description: "Todo 2 description", done: true },
        { id: 3, description: "Todo 3 description", done: false },
        { id: 4, description: "Todo 4 description", done: false },
        { id: 5, description: "Todo 5 description", done: false },
    ]

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter( todo => todo.done === true ).length;
    }

    get pendingTodos() {
        return this.todos.filter( todo => todo.done === false ).length;
    }


    findAll(statusArgs: StatusArgs): Todo[] {
        const { status } = statusArgs;

        if(status !== undefined) 
            return this.todos.filter( todo => todo.done === status );

        return this.todos;
    }

    findById(id: number): Todo {
        const todo = this.todos.find( todo => todo.id === id );
        
        if(!todo) throw new NotFoundException("Todo not found");

        return todo;

    }

    create (createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();
        todo.id = Math.max(...this.todos.map(todo => todo.id)) + 1;
        todo.description = createTodoInput.description;
        todo.done = false;

        this.todos.push(todo);

        return todo;
    }

    update (updateTodoInput: UpdateTodoInput): Todo {

        const {id, description, done} = updateTodoInput;

        const todo = this.findById(id);

        if(description) todo.description = description;
        if(done !== undefined) todo.done = done;

        this.todos = this.todos.map( todoDB => {
            if(todoDB.id === id) {
                todoDB = {...todoDB, ...todo};
            }
            return todoDB;
        })

        return todo;
    }

    remove (id: number): Boolean {
        this.findById(id);
        this.todos = this.todos.filter( todo => todo.id !== id );
        return true;
    }

}