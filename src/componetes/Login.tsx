import React from "react";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import "../estilos/Login.css";
import ValidatedInput from "./ValidetInput";
import Container from "./Container";
import Button from "./Button";
import api from "../http/api";
import Snackbar from "./Snackbar";

interface SnackbarState {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration: number;
}

export default function Login() {
  const { values, errors, handleChange, validate } = useForm({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    message: "",
    type: "success",
    duration: 0,
  });

  const navigate = useNavigate();

  const login = async () => {
    const duration = 10000;

    if (!validate) {
      return;
    }
    try {
      const response = await api.post<{
        token: string;
        refreshToken: string;
        message: string;
      }>("/login", {
        email: values.email,
        senha: values.password,
      });

      const { token, refreshToken, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setSnackbar({
        message: message || "Sucesso ao logar.",
        type: "success",
        duration,
      });
      setTimeout(() => {
        navigate("/home");
      }, duration);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      setSnackbar({
        message:
          axiosError.response?.data?.message || "Erro ao realizar login.",
        type: "error",
        duration: 10000,
      });
    }
  };

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <ValidatedInput
        value={values.email}
        errorMessage={errors.email}
        onChange={handleChange("email")}
        type="email"
        placeholder="Email"
      />
      <ValidatedInput
        value={values.password}
        errorMessage={errors.password}
        onChange={handleChange("password")}
        type="password"
        placeholder="Senha"
      />
      <Button
        type="button"
        className="bg-blue-500 text-white hover:bg-blue-600"
        onClick={login}
      >
        Entrar
      </Button>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        duration={snackbar.duration}
        onClose={() => {
          setSnackbar({ message: "", type: "success", duration: 0 });
        }}
      />
    </Container>
  );
}