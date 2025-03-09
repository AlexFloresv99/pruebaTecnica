export interface Articulo {
  id: number;
  codigo: string;
  articuloExt_Id: number;
  proveedor_Id: number;
  propietario_Id: number;
  descripcion: string;
  descripcionCorta: string;
  descripcionAlternativa: string;
  compactarUbicacion: boolean;
  umd: number;
  observaciones: string;
  act: boolean;
  controlLote: boolean;
  controlCaducidad: boolean;
  fechaAlta: string;
  fechaMod: string;
  usuario_Id_Alta: number;
  usuario_Id_Mod: number;
}

export interface responseArticulos {
    TotalItemsCount: number;
    Page: number;
    PageSize: number;
    Items: Articulo[];
  }