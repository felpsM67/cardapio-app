import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const { values, errors, handleChange, validate } = useForm({
    email: '',
    senha: '',
  });


  
  const navigate = useNavigate();

  const login = async () => {
    const duration = 10000;

    // if (!validate) {
    //   return;
    // }
    // try {
    //   const response = await .post<{
    //     token: string;
    //     refreshToken: string;
    //     message: string;
    //   }>('/login', {
    //     email: values.email,
    //     senha: values.senha,
    //   });

    //   const { token, refreshToken, message } = response.data;

    //   localStorage.setItem('token', token);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   ({
    //     message: message || 'Sucesso ao logar.',
    //     type: 'success',
    //     duration,
    //   });
    //   setTimeout(() => {
    //     navigate('/home');
    //   }, duration);
    // } catch (error: unknown) {
    //   const axiosError = error as {
    //     response?: { data?: { message?: string } };
    //   };
    //   ({
    //     message:
    //       axiosError.response?.data?.message || 'Erro ao realizar login.',
    //     type: 'error',
    //     duration: 10000,
    //   });
    // }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Email"
            value={values.email}
            onChange={handleChange('email')}
            className={`w-full p-2 border rounded ${
              errors.email
                ? 'border-red-500'
                : values.email
                  ? 'border-blue-500'
                  : 'border-gray-300'
            }`}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="w-full mb-4">
          <input
            type="password"
            placeholder="Senha"
            value={values.senha}
            onChange={handleChange('senha')}
            className={`w-full p-2 border rounded ${
              errors.senha
                ? 'border-red-500'
                : values.senha
                  ? 'border-blue-500'
                  : 'border-gray-300'
            }`}
          />
          {errors.senha && <p>{errors.senha}</p>}
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={login}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}