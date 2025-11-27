import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  tutorId: string;
}

export function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    api.get("/animals").then(res => setAnimals(res.data));
  }, []);

  const deleteAnimal = async (id: string) => {
    if (!confirm("Deseja excluir?")) return;
    await api.delete(`/animals/${id}`);
    setAnimals(animals.filter(a => a.id !== id));
  };

  return (
    <div className="container">
      <h2>Animais</h2>

      <Link to="/animals/new" className="btn-primary">Novo Animal</Link>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {animals.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.species}</td>
              <td>{a.breed}</td>
              <td>{a.age}</td>

              <td>
                <Link to={`/animals/edit/${a.id}`} className="btn-edit">Editar</Link>
                <button className="btn-delete" onClick={() => deleteAnimal(a.id)}>
                  Excluir
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

