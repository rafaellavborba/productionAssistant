import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AcessoApi = () => {
  const [codEmpresa, setCodEmpresa] = useState('');
  const [url, setUrl] = useState('https://prod.sistemaborelli.com.br/sgr'); // servidor receita
  const [uri, setUri] = useState('');
  const [apii, setApii] = useState(null);
  const [dadosEnvioApi, setDadosEnvioApi] = useState([]);
  const [idinstalacao, setIdInstalacao] = useState('');

  useEffect(() => {
    const fetchEmpresa = async () => {
      const empresa = await AsyncStorage.getItem('empresa');
      if (empresa !== null) {
        setCodEmpresa(JSON.parse(empresa).cod);
      }
    };
    fetchEmpresa();
  }, []);

  const conectar = async () => {
    if (url !== '') {
      setApii(
        axios.create({
          baseURL: url,
          headers: { codempresa: codEmpresa },
        })
      );
    }
  };

  const listagem = async () => {
    await conectar();
    if (url !== '' && apii) {
      try {
        const response = await apii.get(uri, {
          headers: {
            'Content-Type': 'application/json',
            idinstalacao: idinstalacao,
            codempresa: codEmpresa,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao fazer listagem:', error);
      }
    }
  };

  const gravacao = async () => {
    await conectar();
    if (url !== '' && apii) {
      try {
        const response = await apii.post(uri, dadosEnvioApi, {
          headers: {
            'Content-Type': 'application/json',
            idinstalacao: idinstalacao,
            codempresa: codEmpresa,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao gravar:', error);
      }
    }
  };

  const atualizar = async () => {
    await conectar();
    if (url !== '' && apii) {
      try {
        const response = await apii.put(uri, dadosEnvioApi, {
          headers: {
            'Content-Type': 'application/json',
            idinstalacao: idinstalacao,
            codempresa: codEmpresa,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar:', error);
      }
    }
  };

  return {
    listagem,
    gravacao,
    atualizar,
    setUri,
    setDadosEnvioApi,
    setIdInstalacao,
  };
};

export default AcessoApi;
