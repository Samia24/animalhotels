import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { IAnimal } from '../../types';

export function Animais() {
  const [animais, setAnimais] = useState<IAnimal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAnimais();
  }, []);

  async function carregarAnimais() {
    try {
      const response = await api.get('/animals');
      setAnimais(response.data);
    } catch (error) {
      console.error("Erro ao buscar animais", error);
    } finally {
      setLoading(false);
    }
  }

  async function Deletar(id: string) {
    if (confirm("Tem certeza que deseja excluir este animal?")) {
      try {
        await api.delete(`/animals/${id}`);
        carregarAnimais();
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  }

  return (
    <div className="container">
      <div className="flex-between">
        <h1>Gerenciar Animais</h1>

        <button
          className="btn-success"
          onClick={() => navigate('/animals/new')}
        >
          + Novo Animal
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="card">
          <table className="table-default">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Idade</th>
                <th className="col-acoes">Ações</th>
              </tr>
            </thead>

            <tbody>
              {animais.length === 0 && (
                <tr>
                  <td colSpan={5} className="table-empty">
                    Nenhum animal cadastrado.
                  </td>
                </tr>
              )}

              {animais.map(animal => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.age} anos</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-link"
                        onClick={() => navigate(`/animals/edit/${animal.id}`)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn-danger"
                        onClick={() => Deletar(animal.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
