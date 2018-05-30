import {RawMaterial} from '../stock/stock.model';

export class Grocery {
  name: string;
  cookingTime: number;
  cookingType = 'frying';
  rawMaterial: RawMaterial[];
  // amountInGrocery: string;
  // redLineForMeal: string;
  // importanceToMeal: boolean = true;
}

export class Dish {
  name: string;
  description: string;
  totalTime: number;
  status = 0;
  category = 'Drinks';
}

export class Meal {
  dairy = false;
  name: string;
  description: string;
  pic = '';
  price: number;
  subMenus = 'Starters';
  vegan = false;
  glotenFree = false;
  mealType = 'meat';
  displayed = true;
}
