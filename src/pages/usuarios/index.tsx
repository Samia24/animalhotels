import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { IUser } from "../../types";

export function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const { user: currentUser } = useAuth(); // Usuário logado
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    // Regra: Não pode apagar seu próprio usuário
    if (id === currentUser?.id) {
      alert("Você não pode excluir seu próprio usuário!");
      return;
    }

    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        await deleteUser(String(id));
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        console.error("Erro ao excluir usuário", error);
        alert("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="page-center">
      <h1>Gerenciar Usuários</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button className="btn btn-gray" onClick={() => navigate("/dashboard")}>
          Voltar
        </button>
        <Link to="/users/new" className="btn btn-green">
          Novo Usuário
        </Link>
      </div>

      <table className="table-default">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {u.nome} {u.id === currentUser?.id && "(Você)"}
              </td>
              <td>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Link
                    to={`/users/edit/${u.id}`}
                    className="btn btn-blue"
                    style={{ padding: "5px 10px", fontSize: "12px" }}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-red"
                    style={{ padding: "5px 10px", fontSize: "12px" }}
                    onClick={() => handleDelete(u.id)}
                    disabled={u.id === currentUser?.id} 
                    title={u.id === currentUser?.id ? "Não pode excluir a si mesmo" : ""}
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
  );
}