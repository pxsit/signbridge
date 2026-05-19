export type BadgeConditionType =
  | 'signs_learned'
  | 'categories_completed'
  | 'streak'
  | 'stars'
  | 'games_completed'
  | 'category_complete';

export interface BadgeCondition {
  type: BadgeConditionType;
  value: number | string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: BadgeCondition;
}
