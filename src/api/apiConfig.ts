const BASE_URL = "http://localhost:51235/";
const API_BASE_URL = "http://localhost:51235/api/";

// AUTH API
export const LOGIN_URL: string = `${BASE_URL}api/auth/login`;

// SIGLAS API - AUTH
export const ARTICULOSEXT_URL: string = `${API_BASE_URL}siglasauth/articulosext`; // POST articulosext
export const ARTICULOEXT_URL: string = `${API_BASE_URL}siglasauth/articuloext`; // POST articuloext
export const ARTICULOS_URL: string = `${API_BASE_URL}siglasauth/articulos/`; // POST articulos
export const ARTICULO_URL: string = `${API_BASE_URL}siglasauth/articulo`; // POST articulo
export const PROVEEDORES_URL: string = `${API_BASE_URL}siglasauth/proveedores/`; // POST proveedores

// // SIGLAS API - TEST
// export const ARTICULOSEXT_URL: string = `${API_BASE_URL}siglas/articulosext`; // POST articulosext
// export const ARTICULOEXT_URL: string = `${API_BASE_URL}siglas/articuloext`; // POST articuloext
// export const ARTICULOS_URL: string = `${API_BASE_URL}siglas/articulos/`; // POST articulos
// export const ARTICULO_URL: string = `${API_BASE_URL}siglas/articulo`; // POST articulo
// export const PROVEEDORES_URL: string = `${API_BASE_URL}siglas/proveedores/`; // POST proveedores

