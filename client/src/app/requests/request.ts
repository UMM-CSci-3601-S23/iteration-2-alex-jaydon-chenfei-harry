export interface Request {
  _id: string;
  name: string; // Name of the form requester.
  itemType: ItemType;
  description: string;
  foodType: FoodType;
}

export type ItemType = 'food' | 'toiletries' | 'other';
export type FoodType = '' | 'dairy' | 'grain' | 'meat' | 'fruit' | 'vegetable';
