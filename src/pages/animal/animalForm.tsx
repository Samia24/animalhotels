import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

interface AnimalFormData {
  name: string;
  species: string;
  breed: string;
  age: number;
  tutorId: string;
}

export function AnimalForm() {
  const { register, handleSubmit, setValue } = useForm<AnimalFormData>();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      api.get(`/animals/${id}`).then(res => {
        const a = res.data;
        setValue("name", a.name);
        setValue("species", a.species);
        setValue("breed", a.breed);
        setValue("age", a.age);
        setValue("tutorId", a.tutorId);
      });
    }
  }, [id]);

  const onSubmit = async (data: AnimalFormData) => {
    try {
      if (isEditing) {
        await api.put(`/animals/${id}`, data);
      } else {
        await api.post("/animals", data);
      }

      navigate("/animals");
    } catch (error) {
      alert("Erro ao salvar animal!");
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h2>{isEditing ? "Editar Animal" : "Novo Animal"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <label>Nome</label>
          <input {...register("name")} required />

          <label>Espécie</label>
          <input {...register("species")} required />

          <label>Raça</label>
          <input {...register("breed")} required />

          <label>Idade</label>
          <input {...register("age")} type="number" required />

          <label>ID do Tutor</label>
          <input {...register("tutorId")} required />

          <button type="submit" className="btn-primary">Salvar</button>

          <button 
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/animals")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
