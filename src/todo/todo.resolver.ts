import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './dto/types/aggregations.type';

@Resolver()
export class TodoResolver {

    constructor(
        private readonly todoService : TodoService
    ){}

    @Query(() => [Todo], {name: 'todos'})
    findAll(@Args() status: StatusArgs){
        return this.todoService.findAll(status);
    }

    @Query(() => Todo, {name: 'todo'})
    findOne(@Args('id', {type: () => Int}) id: number){
        return this.todoService.findById(id);
    }

    @Mutation(() => Todo, {name: 'createTodo'})
    createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput){

        console.log({createTodoInput});
        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, {name: 'updateTodo'})  //@Args('id', {type: () => Int}) id: number, @Args('title', {type: () => String}) title: string
    updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput){
        return this.todoService.update(updateTodoInput);
    }

    @Mutation(() => Boolean, {name: 'removeTodo'})  //@Args('id', {type: () => Int}) id: number, @Args('title', {type: () => String}) title: string
    removeTodo(@Args('id', {type: ()=> Int}) id: number){
        return this.todoService.remove(id);
    }

    @Query(() => Int, {name: 'todosCount'} )
    countTodos(){
        return this.todoService.totalTodos;
    }

    @Query(() => Int, {name: 'todosCompletedCount'})
    countCompletedTodos(){
        return this.todoService.completedTodos;
    }

    @Query(() => Int, {name: 'todosPendingCount'})
    countPendingTodos(){
        return this.todoService.pendingTodos;
    }

    @Query(() => AggregationsType)
    aggregations(): AggregationsType{
        return {
            completed: this.countCompletedTodos(),
            pending: this.countPendingTodos(),
            total: this.countTodos()
        }
    }

}
