import {RawMaterial} from '../stock/stock.model';
export class Grocery {
    name: string;
    cookingTime: number;
    cookingType: string = 'frying';
    rawMaterial: RawMaterial[];
    // amountInGrocery: string;
    // redLineForMeal: string;
    // importanceToMeal: boolean = true;
}

export class Dish {
    name: string;
    description: string;
    totalTime: number;
    status: number = 0;
    category: string = 'Drinks';
}

export class Meal {
    dairy: boolean = false;
    name: string;
    description: string;
    price: number;
    subMenus: string = 'Starters';
    vegan: boolean = false;
    glotenFree: boolean = false;
    mealType: string = 'meat';
}
