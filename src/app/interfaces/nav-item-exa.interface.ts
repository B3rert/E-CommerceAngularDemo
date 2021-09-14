export interface NavItemProo {
    displayName: string;
    disabled?: boolean;
    iconName?: string;
    route?: string;
    categoria:number;
    categoria_Padre:number;
    nivel: number,
    children?: NavItemProo[];
  }
  