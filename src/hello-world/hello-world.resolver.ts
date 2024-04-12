import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, {name: 'hello', description: 'Hola mundo es lo que retorna'})
    helloWorld() {
        return 'Hello World!';
    }

    @Query(() => String, {name: 'bye', description: 'Adios mundo es lo que retorna'})
    byeWorld() {
        return 'Bye World!';
    }

    @Query(() => Float, {name: 'randomNumber'})
    getRandomNumber() {
        return Math.random() * 100;
    }

    @Query(() => Int, {name: 'randomNumberFromZeroTo'})
    getRandomNumber2(@Args('to', {type: () => Int, nullable: true}) to: number = 5) {
        return Math.floor(Math.random() * to);
    }

}
