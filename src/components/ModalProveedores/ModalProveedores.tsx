import "./ModalProveedores.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { PROVEEDORES_URL } from "../../api/apiConfig";
import { Proveedor, responseProveedores } from "../../models/proveedores.ts";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProveedoresProps {
  openDialog: boolean;
  handleCloseModalProveedores: () => void;
  onProveedorSelected: (proveedor: Proveedor) => void;
}

const ModalProveedores: React.FC<ModalProveedoresProps> = ({
  openDialog,
  handleCloseModalProveedores,
  onProveedorSelected,
}) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Petición POST inicial para cargar los proveedores
  useEffect(() => {
    const loadProveedores = async () => {
      try {
        const token = localStorage.getItem("token");
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response: AxiosResponse<responseProveedores> = await axios.post(
          PROVEEDORES_URL,
          {
            // "pagingArgs": {
            //   "page": 1,
            //   "pageSize": 5
            // },
          },
          config
        );
        setProveedores(response.data.Items);
      } catch (err) {
        setError("Error fetching proveedores");
      } finally {
        setLoading(false);
      }
    };

    loadProveedores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const onClickProveedor = (prov: Proveedor) => {
    onProveedorSelected(prov);
    handleCloseModalProveedores();
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseModalProveedores}>
      <div className="modalContainerProveedores">
        <div className="modalHeaderProveedores">
          <h2>{"Seleccione un proveedor"}</h2>
          <IconButton color="error" onClick={() => handleCloseModalProveedores()}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modalContentProveedores">
          {proveedores.map((prov: Proveedor) => {
            return (
              <div
                className="containerProveedor"
                key={prov.id}
                onClick={() => onClickProveedor(prov)}
              >
                {prov.nombre}
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalProveedores;
