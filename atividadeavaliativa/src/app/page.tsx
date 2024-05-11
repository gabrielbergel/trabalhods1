"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";

interface IEquipamento {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  data_aquisicao: Date;
  status: boolean;
}


async function fetchEquipamentos(): Promise<any> { // tipar o retorno!
  const result = await api.get("/equipamentos");
  console.log(result);
  return result.data;
}


export default function Home() {
  // Estados para armazenar os usuários, o estado de carregamento e os usuários filtrados
  const [equipamentos, setEquipamentos] = useState<IEquipamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredEquipamentos, setFilteredEquipamentos] = useState<IEquipamento[]>([]);
  // Estado para armazenar o termo de busca do filtro por nome
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Efeito para carregar os usuários quando o componente é montado
  useEffect(() => {
    const getUsers = async () => {
      const equipamentosData = await fetchEquipamentos();
      // Atualiza os estados de usuários e usuários filtrados
      setEquipamentos(equipamentosData);
      setFilteredEquipamentos(equipamentosData);
      setLoading(false);
    };
    getUsers();
  }, []);

  // Função para lidar com a exclusão de um usuário
  const handleDeleteUser = async (equipamentoID: number) => {
    try {
      await api.delete(`/equipamentos/${equipamentoID}`);
      // Atualiza a lista de usuários após a exclusão
      setEquipamentos(equipamentos.filter((equipamento) => equipamento.id !== equipamentoID));
      setFilteredEquipamentos(filteredEquipamentos.filter((equipamento) => equipamento.id !== equipamentoID));
    } catch (error) {
      console.error("Erro ao excluir equipamento:", error);
    }
  };

  // Função para filtrar os usuários por id
  const handleSearch = () => {
    const filtered = equipamentos.filter((equipamento) =>
      equipamento.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquipamentos(filtered);
  };

  // Renderização condicional enquanto os usuários estão sendo carregados
  if (loading) {
    return (
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
      </main>
    );
  }

  // Renderização da página de usuários
  return (
    <main className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Equipamentos</h1>
      {/* Formulário de filtro por nome */}
      <div className="flex mb-8 mt-8 justify-center items-center">
        <input
          type="text"
          placeholder="Filtrar por modelo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filtrar
        </button>
      </div>
      {/* Lista de usuários renderizada */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Verificação se existem usuários a serem exibidos */}
        {filteredEquipamentos.length > 0 ? (
          // Mapeamento e renderização dos usuários filtrados
          filteredEquipamentos.map((equipamento: IEquipamento) => {
            return (
              <div
                key={equipamento.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
              >
                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Nome do usuário */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    {equipamento.tipo}
                  </h2>
                </div>

                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Nome do usuário */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    {equipamento.modelo}
                  </h2>
                </div>

                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* Informações adicionais do usuário */}
                  <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ID: {equipamento.id}
                  </span>
                  <span className="inline-block w-[40%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-">
                    {equipamento.status ? "DISPONIVEL" : "EM USO"}
                  </span>
                </div>
                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* Botões de ação para exclusão, edição e detalhes */}
                  <button
                    onClick={() => handleDeleteUser(equipamento.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Excluir
                  </button>
                  <Link href={`/editEquipamento/${equipamento.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                      Editar
                    </button>
                  </Link>
                  <Link href={`/detalhes/${equipamento.id}`}>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                      Detalhes
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          // Mensagem de nenhum usuário encontrado
          <h1>Nenhum equipamento encontrado!</h1>
        )}
      </section>
    </main>
  );
}