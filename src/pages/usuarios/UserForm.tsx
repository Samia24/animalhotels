import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../../services/api";

export function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    senha: "",
  });

  useEffect(() => {
    if (id) {
      getUserById(id).then((res) => {
        setFormData({
          nome: res.data.nome,
          senha: res.data.senha, 
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, formData);
      } else {
        await createUser(formData);
      }
      navigate("/users");
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
      alert("Erro ao salvar.");
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h2>{id ? "Editar Usuário" : "Novo Usuário"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label>Senha</label>
          <input
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <div className="btn-group-vertical">
            <button className="btn btn-primary" type="submit">
              {id ? "Atualizar" : "Cadastrar"}
            </button>
            <button
              type="button"
              className="btn btn-gray"
              onClick={() => navigate("/users")}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}