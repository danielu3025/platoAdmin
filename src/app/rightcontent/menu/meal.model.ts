import {RawMaterial} from "../stock/stock.model";
export class Grocery{
    name: string;
    cookingTime: number;
    cookingType: string = "frying";
    rawMaterial: Object = {};
    amountInGrocery: string;
    redLineForMeal: string;
    importanceToMeal: boolean = true;
}

export class Dish{
    name: string;
    description: string;
    totalTime: number;
    status: number = 0;
    category: string;
    //image: string
}

export class Meal{
    dairy: boolean = false;
    name: string;
    description: string;
    price: number;
    subMenus: string = 'Starters';
    vegan: boolean = false;
    glotenFree: boolean = false;
}

// export class RawMaterial{
//     name: string;
//     amount: number;
//}