import { useEffect, useState } from "react";
import { getTutores, deleteTutor } from "../../services/api";
import { Link } from "react-router-dom";

interface Tutor {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export function Tutors() {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este tutor?")) {
      try {
        await deleteTutor(id);
        setTutores(tutores.filter(t => t.id !== id));
      } catch (error) {
        console.error("Erro ao excluir tutor", error);
      }
    }
  };

  useEffect(() => {
    fetchTutores();
  }, []);

  if (loading) return <p>Carregando tutores...</p>;

  return (
    <div className="page-center">
      <h1>Lista de Tutores</h1>
      <Link to="/tutors/new" className="btn btn-green">Novo Tutor</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tutores.map(tutor => (
            <tr key={tutor.id}>
              <td>{tutor.name}</td>
              <td>{tutor.email}</td>
              <td>{tutor.phone || "-"}</td>
              <td>
                <Link to={`/tutors/edit/${tutor.id}`} className="btn btn-blue">Editar</Link>
                <button className="btn btn-red" onClick={() => handleDelete(tutor.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
