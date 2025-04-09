export type StatKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export interface Character {
  id?: string;
  name: string;
  class: string;
  stats: Record<StatKey, number>;
}
