import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { ITutor } from '../../types';

export function Tutors() {
  const [tutors, setTutors] = useState<ITutor[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados assim que a tela carrega
  useEffect(() => {
    loadTutors();
  }, []);

  async function loadTutors() {
    try {
      const response = await api.get('/tutors'); 
      setTutors(response.data);
    } catch (error) {
      console.error("Erro ao buscar tutores:", error);
      alert("Erro ao carregar lista. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }

  async function Deletar(id: string) {
    if (confirm("Tem certeza que deseja excluir este tutor?")) {
      try {
        await api.delete(`/tutors/${id}`);
        loadTutors(); // Recarrega a lista para sumir com o item excluído
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  }

  return (
    <div className="container">
      <div className="flex-between">
        <h1>Gerenciar Tutores</h1>
        <button 
          className="btn-success"
          onClick={() => alert("Próximo passo: Tela de Cadastro!")}
        >
          + Novo Tutor
        </button>
      </div>

      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th style={{ width: '100px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tutors.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    Nenhum tutor encontrado. Cadastre o primeiro!
                  </td>
                </tr>
              )}

              {tutors.map(tutor => (
                <tr key={tutor.id}>
                  <td>{tutor.name}</td>
                  <td>{tutor.email}</td>
                  <td>{tutor.phone}</td>
                  <td>
                    <button 
                      className="btn-danger"
                      onClick={() => Deletar(tutor.id)}
                    >
                      Excluir
                    </button>
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