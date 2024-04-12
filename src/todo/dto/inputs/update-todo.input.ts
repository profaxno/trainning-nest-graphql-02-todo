import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, min } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field(()=> Int)
    @IsInt()
    @Min(1, {message: 'El id debe ser mayor a 0'})
    id: number;

    @Field(() => String, {description: 'Description del todo', nullable: true})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20, {message: 'El maximo de caracteres es 20'})
    @IsOptional()
    description?: string;

    @Field(() => Boolean, {description: 'Estado del todo', nullable: true})
    @IsOptional()
    done: boolean;
}