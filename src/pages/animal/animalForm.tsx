import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import type { ITutor, IAnimal } from '../../types';

interface AnimalFormData {
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  tutorId: string;
}

export function AnimalForm() {
  const { register, handleSubmit, setValue } = useForm<AnimalFormData>();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [tutors, setTutors] = useState<ITutor[]>([]);

  useEffect(() => {
    api.get('/tutors')
      .then(res => setTutors(res.data))
      .catch(() => alert("Erro ao carregar lista de tutores."));
  }, []);

  useEffect(() => {
    if (isEditing) {
      api.get<IAnimal>(`/animals/${id}`)
        .then(res => {
          const animal = res.data;
          setValue('nome', animal.name);
          setValue('especie', animal.species);
          setValue('raca', animal.breed);
          setValue('idade', animal.age);
          setValue('tutorId', animal.tutorId);
        })
        .catch(() => alert("Erro ao carregar dados do animal."));
    }
  }, [id, isEditing, setValue]);

  async function onSubmit(data: AnimalFormData) {
    try {
      if (isEditing) {
        await api.put(`/animals/${id}`, data);
        alert("Animal atualizado com sucesso!");
      } else {
        await api.post('/animals', { ...data, idade: Number(data.idade) });
        alert("Animal cadastrado com sucesso!");
      }
      navigate('/animals');
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar animal.");
    }
  }

  return (
    <div className="container">
      <div className="card card-center">
        <h2>{isEditing ? 'Editar Animal' : 'Cadastrar Novo Animal'}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          
          <label>Tutor/Dono</label>
          <select {...register("tutorId")} required>
            <option value="">Selecione um tutor</option>
            {tutors.map(tutor => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>

          <label>Nome do Animal</label>
          <input {...register("nome")} required />

          <label>Espécie</label>
          <select {...register("especie")} required>
            <option value="">Selecione a espécie</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Outro">Outro</option>
          </select>

          <label>Raça</label>
          <input {...register("raca")} placeholder="Ex: Golden Retriever, Siamês" required />

          <label>Idade (em anos)</label>
          <input {...register("idade")} type="number" min="0" required />

          <div className="button-group">
            <button type="submit" className="btn-primary">
              {isEditing ? 'Salvar Edição' : 'Cadastrar Animal'}
            </button>

            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/animals')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
