export enum Words {
    ENGLISH = "English",
    ARMENIAN = "Armenian"
}

export enum IResult {
    FALSE = 0,
    TRUE = 1,
    NEUTRAL = 2
}

export interface IWord {
    id:number;
    english:string;
    translate:string;
    sentences:string[];
}

export interface IAnswersHistory {
    id:number;
    score:number;
    answers:IAnswer[];
}

export interface IAnswer {
    id:number;
    answer:string;
    rightAnswer:string;
    result:boolean;
}