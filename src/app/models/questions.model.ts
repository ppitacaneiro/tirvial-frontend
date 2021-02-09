import { Answer } from './answer.models';

export class Question {
    
    id:number;
    title:string;
    answers : Answer[];
    
}