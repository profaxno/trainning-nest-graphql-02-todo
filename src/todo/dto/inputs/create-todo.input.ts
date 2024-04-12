import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {

    @Field(() => String, {description: 'Description del todo'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20, {message: 'El maximo de caracteres es 20'})
    description: string;
}