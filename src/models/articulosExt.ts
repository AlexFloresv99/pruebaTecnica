export interface ArticuloExt {
  id: number;
  codigo: string;
  descripcion: string;
  descripcionCorta: string;
  descripcionAlternativa: String;
  umd: number;
  activo: boolean;
  observaciones: string;
  controlLote: boolean;
  controlCaducidad: boolean;
  fechaAlta: string;
  fechaMod: string;
  usuario_Id_Alta: number;
  usuario_Id_Mod: number;
}

export interface responseArticulosExt {
  TotalItemsCount: number;
  Page: number;
  PageSize: number;
  Items: ArticuloExt[];
}