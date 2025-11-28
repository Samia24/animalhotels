import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTutor, getTutorById, updateTutor } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

export function TutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // usuário logado

  const [tutor, setTutor] = useState({
    nome: "",
    sexo: "M",
    nascimento: "",
    telefone: "",
    endereco: ""
  });

  useEffect(() => {
    if (id) {
      getTutorById(id).then(res => {
        const t = res.data;
        setTutor({
            nome: t.nome,
            sexo: t.sexo,
            nascimento: t.nascimento ? t.nascimento.split('T')[0] : '',
            telefone: t.telefone,
            endereco: t.endereco
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTutor({ ...tutor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTutor(id, tutor);
      } else {
        // Envia o id do usuário logado ao criar
        await createTutor({ 
          ...tutor, 
          usuarioCadastroId: user?.id 
        });
      }
      navigate("/tutors");
    } catch (error) {
      console.error("Erro ao salvar tutor", error);
      alert("Erro ao salvar.");
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h2>{id ? "Editar Tutor" : "Novo Tutor"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input name="nome" value={tutor.nome} onChange={handleChange} required />
          
          <label>Sexo:</label>
          <select name="sexo" value={tutor.sexo} onChange={handleChange}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>

          <label>Nascimento:</label>
          <input name="nascimento" type="date" value={tutor.nascimento} onChange={handleChange} />

          <label>Telefone:</label>
          <input name="telefone" value={tutor.telefone} onChange={handleChange} required />

          <label>Endereço:</label>
          <input name="endereco" value={tutor.endereco} onChange={handleChange} required />

          <div className="btn-group-vertical">
            <button className="btn btn-primary" type="submit">
              {id ? "Atualizar" : "Cadastrar"}
            </button>
            <button type="button" className="btn btn-gray" onClick={() => navigate('/tutors')}>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}