export interface Request {
  id: any;
priority: any;
  requestPriority: number;
  _id: string;
  name: string; // Name of the form requester.
  itemType: ItemType;
  description: string;
  foodType: FoodType;
}

const priorityMap = {
  vegetable: 1,
  grain: 2,
  fruit: 3,
  meat: 4,
  dairy: 5,
};


export type ItemType = 'food' | 'toiletries' | 'other';
export type FoodType = '' | 'dairy' | 'grain' | 'meat' | 'fruit' | 'vegetable';
