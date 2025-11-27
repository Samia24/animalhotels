import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

interface TutorFormData {
  nome: string;
  email: string;
  telefone: string;
}

export function TutorForm() {
  const { register, handleSubmit, setValue } = useForm<TutorFormData>();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      api.get(`/tutors/${id}`).then(res => {
        setValue('nome', res.data.nome);
        setValue('email', res.data.email);
        setValue('telefone', res.data.telefone);
      });
    }
  }, [id]);

  const onSubmit = async (data: TutorFormData) => {
    try {
      if (isEditing) {
        await api.put(`/tutors/${id}`, data);
      } else {
        await api.post('/tutors', data);
      }
      navigate('/tutors');
    } catch (error) {
      alert("Erro ao salvar");
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h2>{isEditing ? 'Editar Tutor' : 'Novo Tutor'}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="form-default">
          <label>Nome</label>
          <input {...register("nome")} required />

          <label>Email</label>
          <input {...register("email")} type="email" required />

          <label>Telefone</label>
          <input {...register("telefone")} required />

          <button type="submit" className="btn-primary">Salvar</button>

          <button 
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/tutors')}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
