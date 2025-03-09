import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { ARTICULOSEXT_URL } from "../../api/apiConfig";
import { Button, Modal } from "@mui/material";
import {
  ArticuloExt,
  responseArticulosExt,
} from "../../models/articulosExt.ts";
import ModalArticle from "../../components/ModalArticle/ModalArticle.tsx";

const Dashboard: React.FC = () => {
  // ESTADOS PARA CARGA DE DATOS
  const [articles, setArticles] = useState<ArticuloExt[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticuloExt | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("tokeeeeeen:", token);
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response: AxiosResponse<responseArticulosExt> = await axios.post(
          ARTICULOSEXT_URL,
          {
            // "pagingArgs": {
            //   "page": 1,
            //   "pageSize": 5
            // },
          },
          config
        );

        console.log(response.data);
        setArticles(response.data.Items);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };

    loadArticles();
  }, []);

  const handleOpenModalArticle = (article: ArticuloExt) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  const handleCloseModalArticle = () => {
    setOpenModal(false);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>List Entities</h1>
        <Button
          size="medium"
          variant="contained"
          color="error"
          sx={{ borderWidth: 2 }}
          onClick={Logout}
        >
          Logout
        </Button>
      </div>
      <div className="list__cards">
        {articles.map((artExt: ArticuloExt) => {
          return (
            <div
              className="card"
              key={artExt.id}
              onClick={() => handleOpenModalArticle(artExt)}
            >
              <div className="card__header">
                <h2>{artExt.codigo}</h2>
                <p className="state">{artExt.activo ? "Activo" : "Inactivo"}</p>
              </div>
              <p className="description">
                <strong>{artExt.descripcion}</strong>
              </p>
              <p className="short_description">
                {/* <strong>Short description: </strong> */}
                {artExt.descripcionCorta}
              </p>
              <p className="alternative_description">
                {/* <strong>Alternative description: </strong> */}
                {artExt.descripcionAlternativa}
              </p>
            </div>
          );
        })}
        <Modal open={openModal} onClose={handleCloseModalArticle}>
          <div className="modalArticle">
            <ModalArticle
              articuloExt={selectedArticle}
              closeModalArticle={() => {
                setOpenModal(false);
              }}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
