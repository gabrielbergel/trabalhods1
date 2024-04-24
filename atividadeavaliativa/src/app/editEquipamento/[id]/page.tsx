
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

  export default function EditEquipamento() {
    const router = useRouter();
    const params: IEquipamentoParams = useParams();
    const { id } = params;
    const [equipamento, setEquipamento] = useState<IEquipamento>({
        id: 0,
        tipo: "",
        marca: "",
        modelo: "",
        numero_serie: "",
        data_aquisicao: "",
        status: true,
    });
  
    useEffect(() => {
      const fetchEquipamentos = async () => {
        try {
          console.log(id);
          const response = await api.get(`/equipamentos/${id}`);
          const equipamentoData: IEquipamento = response.data;
  
          // Converte a data de nascimento para o formato "YYYY-MM-DD"
          const formattedData_Aquisicao = new Date(equipamentoData.data_aquisicao)
            .toISOString()
            .split("T")[0];
  
          // Atualiza o estado do usuário com a data formatada
          setEquipamento({ ...equipamentoData, data_aquisicao: formattedData_Aquisicao });
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      };
  
      if (id) {
        fetchEquipamentos();
      }
    }, [id]);
  
    const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value, type } = e.target;
  
      if (type === "checkbox") {
        const checked = (e.target as HTMLInputElement).checked;
        setEquipamento((prevEquipamento) => ({
          ...prevEquipamento,
          [name]: checked,
        }));
      } else {
        setEquipamento((prevEquipamento) => ({
          ...prevEquipamento,
          [name]: value,
        }));
      }
    };
  
    const formatData_Aquisicao = (dateString: string): string => {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };
  
    const handleUpdateEquipamento = async () => {
      try {
        const formattedData_Aquisicao = formatData_Aquisicao(equipamento.data_aquisicao);
  
        const response = await api.put(`/equipamentos/${id}`, {
          ...equipamento,
          data_aquisicao: formattedData_Aquisicao,
        });
  
        console.log("Dados atualizados com sucesso!");
        console.log("Resposta:", response.data);
        router.push("/");
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center my-8">
        <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>ID</label>
            <input
              type="number"
              name="id"
              value={equipamento.id}
              onChange={handleChange}
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>TIPO</label>
            <input
              type="text"
              name="tipo"
              value={equipamento.tipo}
              onChange={handleChange}
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>MODELO</label>
            <input
              type="text"
              name="modelo"
              value={equipamento.modelo}
              onChange={handleChange}
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>

          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>MARCA</label>
            <input
              type="string"
              name="marca"
              value={equipamento.marca}
              onChange={handleChange}
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Data de Aquisição</label>
            <input
              type="date"
              name="data_aquisicao"
              value={equipamento.data_aquisicao}
              onChange={handleChange}
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>NUMERO DE SERIE</label>
            <input
              type="string"
              name="numero_serie"
              value={equipamento.numero_serie}
              onChange={handleChange}
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
            <label>Disponível</label>
            <input
              type="checkbox"
              name="status"
              checked={equipamento.status}
              onChange={handleChange}
              className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
            />
          </div>
  
          <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
            <button
              type="button"
              onClick={handleUpdateEquipamento}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Atualizar usuário
            </button>
  
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }