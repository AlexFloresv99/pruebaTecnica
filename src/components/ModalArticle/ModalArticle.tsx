import "./ModalArticle.css";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ARTICULOS_URL } from "../../api/apiConfig";
import { ArticuloExt } from "../../models/articulosExt.ts";
import { Articulo, responseArticulos } from "../../models/articulos.ts";
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModalProveedores from "../ModalProveedores/ModalProveedores.tsx";
import { Proveedor } from "../../models/proveedores.ts";
import LoadingTable from "../LoadingTable/LoadingTable.tsx";

interface ModalArticleProps {
  articuloExt: ArticuloExt | null;
  closeModalArticle: () => void;
}

const ModalArticle: React.FC<ModalArticleProps> = ({
  articuloExt,
  closeModalArticle,
}) => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [openModalProveedores, setOpenModalProveedores] =
    useState<boolean>(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] =
    useState<Proveedor | null>(null);

  // ESTADOS PARA CARGA DE DATOS
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticulos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response: AxiosResponse<responseArticulos> = await axios.post(
          ARTICULOS_URL,
          {
            filterExpression: `x => x.articuloExt_Id = ${articuloExt?.id}`,
            sortingFields: [
              {
                field: "articuloExt_Id",
                sortDir: "Asc",
              },
            ],
            pagingArgs: {
              page: 1,
              pageSize: 100,
            },
          },
          config
        );
        setArticulos(response.data.Items);
      } catch (err) {
        setError("Error fetching articles: " + err);
      } finally {
        setLoading(false);
      }
    };

    loadArticulos();
  }, [articuloExt]);

  const loadArticulosFiltrados = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response: AxiosResponse<responseArticulos> = await axios.post(
        ARTICULOS_URL,
        {
          filterExpression: `x => x.articuloExt_Id = ${articuloExt?.id} && x.proveedor_Id = ${proveedorSeleccionado?.id}`,
          sortingFields: [
            {
              field: "articuloExt_Id",
              sortDir: "Asc",
            },
          ],
          pagingArgs: {
            page: 1,
            pageSize: 100,
          },
        },
        config
      );
      setArticulos(response.data.Items);
    } catch (err) {
      setError("Error fetching articles");
    } finally {
      setLoading(false);
    }
  }, [articuloExt, proveedorSeleccionado]);

  useEffect(() => {
    if (proveedorSeleccionado) {
      loadArticulosFiltrados();
    }
  }, [proveedorSeleccionado, loadArticulosFiltrados]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleOpenModalProveedores = () => {
    setOpenModalProveedores(true);
  };

  const handleCloseModalProveedores = () => {
    setOpenModalProveedores(false);
  };

  const handleProveedorSelected = (proveedor: Proveedor) => {
    setProveedorSeleccionado(proveedor);
  };

  return (
    <div className="modalContainer">
      <div className="modalHeader">
        <h2>ArtículoExt: {articuloExt?.codigo}</h2>
        <IconButton color="error" onClick={closeModalArticle}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="modalFilters">
        <Chip
          icon={<FilterListIcon />}
          label="Proveedores"
          onClick={handleOpenModalProveedores}
        />
        <Chip
          sx={{ marginLeft: "10px" }}
          label={proveedorSeleccionado ? proveedorSeleccionado.nombre : "Todos"}
          color="primary"
        />
      </div>
      <div className="modalBody">
        <Table
          sx={{ minWidth: 650, height: 400, overflowX: "scroll" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Código</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="left">Descripción corta</TableCell>
              <TableCell align="left">Descripción alternativa</TableCell>
              <TableCell align="left">Estado</TableCell>
              <TableCell align="left">ID Art. Ext</TableCell>
              <TableCell align="left">ID Proveedor</TableCell>
              <TableCell align="left">ID Propietario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articulos.map((articulo) => (
              <TableRow
                key={articulo.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{articulo.id}</TableCell>
                <TableCell align="left">{articulo.codigo}</TableCell>
                <TableCell component="th" scope="row">
                  {articulo.descripcion}
                </TableCell>
                <TableCell align="left">{articulo.descripcionCorta}</TableCell>
                <TableCell align="left">
                  {articulo.descripcionAlternativa}
                </TableCell>
                <TableCell align="left">
                  {
                    <Chip
                      label={articulo.act ? "Activo" : "Inactivo"}
                      color={articulo.act ? "success" : "error"}
                    />
                  }
                </TableCell>
                <TableCell align="left">{articulo.articuloExt_Id}</TableCell>
                <TableCell align="left">{articulo.proveedor_Id}</TableCell>
                <TableCell align="left">{articulo.propietario_Id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && <LoadingTable rows={2} columns={9} />}
      </div>
      {openModalProveedores && (
        <ModalProveedores
          openDialog={openModalProveedores}
          handleCloseModalProveedores={handleCloseModalProveedores}
          onProveedorSelected={handleProveedorSelected}
        />
      )}
    </div>
  );
};

export default ModalArticle;
