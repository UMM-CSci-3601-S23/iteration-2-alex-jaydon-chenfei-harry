export interface Request {
  id: any;
  //priority: number;
  requestPriority: number;
  _id: string;
  name: string; // Name of the form requester.
  itemType: ItemType;
  description: string;
  foodType: FoodType;
  priority: number;
}

export type ItemType = 'food' | 'toiletries' | 'other';
export type FoodType = '' | 'dairy' | 'grain' | 'meat' | 'fruit' | 'vegetable';
