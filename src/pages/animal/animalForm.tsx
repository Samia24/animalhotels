import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api, getTutores } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import type { ITutor } from '../../types';

export function AnimalForm() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth(); // usuario logado
  
  const [tutors, setTutors] = useState<ITutor[]>([]);
  const [isNewTutor, setIsNewTutor] = useState(false);

  useEffect(() => {
    getTutores().then(res => setTutors(res.data));

    if (id) {
      api.get(`/animais/${id}`).then(res => {
        const a = res.data;
        setValue("nome", a.nome);
        setValue("especie", a.especie);
        setValue("raca", a.raca);
        if (a.tutor) {
            setValue("tutorId", a.tutor.id);
        }
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    try {
      let finalTutorId = data.tutorId;

      if (isNewTutor) {
        const newTutorPayload = {
            nome: data.tutorNome,
            telefone: data.tutorTelefone,
            endereco: data.tutorEndereco,
            sexo: data.tutorSexo,
            nascimento: "2000-01-01", 
            // Vincula o novo tutor ao usuário logado
            usuarioCadastroId: user?.id 
        };
        const resTutor = await api.post('/tutores', newTutorPayload);
        finalTutorId = resTutor.data.id;
      }

      const animalPayload = {
        nome: data.nome,
        especie: data.especie,
        raca: data.raca,
        tutorId: finalTutorId,
        // Vincula o novo animal ao usuário logado
        usuarioCadastroId: user?.id 
      };

      if (id) {
        await api.put(`/animais/${id}`, animalPayload);
      } else {
        await api.post("/animais", animalPayload);
      }

      navigate("/animals/list");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar animal/tutor!");
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h2>{id ? "Editar Animal" : "Novo Animal"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <label>Nome do Animal</label>
          <input {...register("nome")} required />

          <label>Espécie</label>
          <input {...register("especie")} placeholder="Ex: Cachorro" required />

          <label>Raça</label>
          <input {...register("raca")} required />

          <hr style={{width: '100%', borderColor: '#444'}}/>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
            <input 
                type="checkbox" 
                checked={isNewTutor} 
                onChange={(e) => setIsNewTutor(e.target.checked)} 
            />
            <label style={{margin: 0, color: 'var(--primary)'}}>Cadastrar novo Tutor?</label>
          </div>

          {!isNewTutor ? (
            <>
                <label>Selecionar Tutor Existente</label>
                <select {...register("tutorId")}>
                    <option value="">Selecione...</option>
                    {tutors.map(t => (
                        <option key={t.id} value={t.id}>{t.nome}</option>
                    ))}
                </select>
            </>
          ) : (
            <div style={{background: 'var(--bg-input)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--border-color)'}}>
                <h4 style={{marginTop: 0, marginBottom: '10px', color: 'var(--text-muted)'}}>Dados do Novo Tutor</h4>
                
                <label>Nome do Tutor</label>
                <input {...register("tutorNome")} required={isNewTutor} />

                <label>Telefone</label>
                <input {...register("tutorTelefone")} required={isNewTutor} />

                <label>Endereço</label>
                <input {...register("tutorEndereco")} required={isNewTutor} />

                <label>Sexo</label>
                <select {...register("tutorSexo")}>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
            </div>
          )}

          <div className="btn-group-vertical">
            <button type="submit" className="btn btn-primary">Salvar Tudo</button>
            <button type="button" className="btn btn-gray" onClick={() => navigate("/animals/list")}>
                Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}