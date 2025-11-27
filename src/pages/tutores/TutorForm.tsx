import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTutor, getTutorById, updateTutor } from "../../services/api";

interface Tutor {
  name: string;
  email: string;
  phone?: string;
}

export function TutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState<Tutor>({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (id) {
      // Carregar tutor para edição
      getTutorById(id).then(res => setTutor(res.data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTutor({ ...tutor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTutor(id, tutor);
      } else {
        await createTutor(tutor);
      }
      navigate("/tutors");
    } catch (error) {
      console.error("Erro ao salvar tutor", error);
    }
  };

  return (
    <div className="page-center card">
      <h1>{id ? "Editar Tutor" : "Novo Tutor"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input name="name" value={tutor.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" type="email" value={tutor.email} onChange={handleChange} required />
        </label>
        <label>
          Telefone:
          <input name="phone" value={tutor.phone} onChange={handleChange} />
        </label>
        <button className="btn btn-green" type="submit">
          {id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

