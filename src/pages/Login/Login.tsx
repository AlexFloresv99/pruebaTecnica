import "./Login.css";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { LOGIN_URL } from "../../api/apiConfig.ts";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [dataFormLogin, setDataFormLogin] = useState({
    login: "",
    pass: "",
  });

  const navigate = useNavigate();

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataFormLogin({
      ...dataFormLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const urlLogin = `${LOGIN_URL}?login=${dataFormLogin.login}&pass=${dataFormLogin.pass}`;
      const response = await axios.post(urlLogin);
      console.log("TOKEN:", response.data);

      const responseToken: { userToken: string } = response.data;
      // Almacena el JWT
      localStorage.setItem("token", responseToken.userToken);

      // Devuelve OK y redirigimos a Dashboard
      navigate("/dashboard");
    } catch (error) {
      // Reiniciar el formulario (opcional)
      setDataFormLogin({ login: "", pass: "" });
      console.log(error); // Mostrar el error del backend
    }
  };

  return (
    <>
      <div className="background">
        <div className="container">
          <div className="container__form">
            <form action="#" onSubmit={handleSubmitLogin}>
              <h2>Sign In</h2>

              <div className="input-box">
                <span className="input-icon">
                  <PersonIcon />
                </span>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={dataFormLogin.login}
                  onChange={handleChangeLogin}
                  required
                ></input>
                <label>User</label>
              </div>
              <div className="input-box">
                <span className="input-icon">
                  <LockIcon />
                </span>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  value={dataFormLogin.pass}
                  onChange={handleChangeLogin}
                  required
                ></input>
                <label>Password</label>
              </div>
              <div className="remember-forgot">
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit" className="btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
