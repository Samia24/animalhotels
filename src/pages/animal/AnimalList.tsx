import { useEffect, useState } from "react";
import { getAnimais, deleteAnimal } from "../../services/api";
import { Link, useNavigate } from "react-router-dom"; 
import type { IAnimal } from "../../types";

export function AnimalList() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    getAnimais().then(res => setAnimals(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja excluir?")) return;
    await deleteAnimal(String(id));
    setAnimals(animals.filter(a => a.id !== id));
  };

  return (
    <div className="page-center">
      <h1>Animais</h1>

      {/* Botões de Ação no Topo */}
      <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
        <button className="btn btn-gray" onClick={() => navigate('/dashboard')}>
          Voltar
        </button>
        <Link to="/animals/new" className="btn btn-green">Novo Animal</Link>
      </div>

      <table className="table-default">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Tutor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {animals.map(a => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.especie}</td>
              <td>{a.raca}</td>
              <td>{a.tutor?.nome || "Sem tutor"}</td>

              <td>
                <div style={{display: 'flex', gap: '5px'}}>
                    <Link to={`/animals/edit/${a.id}`} className="btn btn-blue" style={{padding: '5px 10px', fontSize: '12px'}}>Editar</Link>
                    <button className="btn btn-red" style={{padding: '5px 10px', fontSize: '12px'}} onClick={() => handleDelete(a.id)}>
                    Excluir
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}