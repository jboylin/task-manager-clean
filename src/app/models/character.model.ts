export type StatKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export interface Character {
  id?: string;
  name: string;
  class: string;
  level?: number;
  stats: Record<StatKey, number>;
  hp?: number;
  mana?: number;
}
