export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  categoria:number;
  categoria_Padre:number;
  nivel: number,
  children?: NavItem[];
  }
  