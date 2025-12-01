import { useEffect, useState } from "react";
import { getTutores, deleteTutor, getAnimais } from "../../services/api"; 
import { Link, useNavigate } from "react-router-dom";
import type { IAnimal } from "../../types";

interface Tutor {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
}

export function Tutors() {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTutores = async () => {
    try {
      const response = await getTutores();
      setTutores(response.data);
    } catch (error) {
      console.error("Erro ao buscar tutores", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    // 1. Busca todos os animais para verificar vínculo
    try {
      const { data: animais } = await getAnimais();
      
      // O backend retorna o objeto tutor dentro do animal
      const temAnimalVinculado = animais.some((a: IAnimal) => a.tutor?.id === id);

      if (temAnimalVinculado) {
        alert("Não é possível excluir este tutor pois ele possui animais cadastrados!");
        return;
      }

      if (window.confirm("Deseja realmente excluir este tutor?")) {
        await deleteTutor(String(id));
        setTutores(tutores.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Erro ao verificar ou excluir tutor", error);
      alert("Ocorreu um erro ao tentar excluir.");
    }
  };

  useEffect(() => {
    fetchTutores();
  }, []);

  if (loading) return <p>Carregando tutores...</p>;

  return (
    <div className="page-center">
      <h1>Lista de Tutores</h1>
      
      <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
        <button className="btn btn-gray" onClick={() => navigate('/dashboard')}>
          Voltar
        </button>
        <Link to="/tutors/new" className="btn btn-green">Novo Tutor</Link>
      </div>
      
      <table className="table-default">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tutores.map(tutor => (
            <tr key={tutor.id}>
              <td>{tutor.nome}</td>
              <td>{tutor.endereco || "-"}</td>
              <td>{tutor.telefone || "-"}</td>
              <td>
                <div style={{display: 'flex', gap: '5px'}}>
                  <Link to={`/tutors/edit/${tutor.id}`} className="btn btn-blue" style={{padding: '5px 10px', fontSize: '12px'}}>Editar</Link>
                  <button className="btn btn-red" style={{padding: '5px 10px', fontSize: '12px'}} onClick={() => handleDelete(tutor.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}