"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";

// Definição da interface IUserParams para tipagem dos parâmetros da rota
interface IEquipamentoParams extends Params {
  id: string;
}

// Definição da interface IUser para tipagem dos dados do usuário
interface IEquipamento {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    data_aquisicao: string;
    status: boolean;
  }

export default function DetalhesEquipamento() {
  const router = useRouter();
  // Captura dos parâmetros da rota
  const params: IEquipamentoParams = useParams();
  const { id } = params;
  // Estado para armazenar os dados do usuário
  const [equipamento, setEquipamentos] = useState<IEquipamento | null>(null);

  // Efeito para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        // Requisição para obter os dados do usuário com o ID fornecido
        const response = await api.get(`/equipamentos/${id}`);
        setEquipamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar equipamento:", error);
      }
    };

    // Verifica se o ID está definido e chama a função fetchUser
    if (id) {
        fetchEquipamentos();
    }
  }, [id]);

  // Função para voltar para a página anterior
  const handleGoBack = () => {
    router.back();
  };

  // Renderização condicional dos detalhes do usuário ou mensagem de carregamento
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Detalhes do Equipamento
      </h1>
      {equipamento ? (
        // Renderização dos detalhes do usuário se os dados estiverem disponíveis
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
          <h2 className="font-bold text-xl text-black text-center uppercase mb-2">
            ID do Equipamento: {equipamento.id}
          </h2>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Tipo:</strong> {equipamento.tipo}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Marca:</strong> {equipamento.marca}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Modelo:</strong> {equipamento.modelo}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Numero de Serie:</strong> {equipamento.numero_serie}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Data de Nascimento:</strong> {equipamento.data_aquisicao}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Status:</strong> {equipamento.status ? "Disponivel" : "Em uso"}
          </p>
        </div>
      ) : (
        // Mensagem de carregamento enquanto os dados do usuário estão sendo buscados
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            Carregando...
          </p>
        </div>
      )}
      {/* Botão para voltar para a página anterior */}
      <div className="flex justify-center">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}