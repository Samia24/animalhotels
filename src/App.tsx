import logoCachorro from './assets/cachorro2.png'
import logoGato from './assets/gato2.png'
import './App.css'

function App() {
  
  return (
    <>
      <div>
        <a target="_blank">
          <img src={logoGato} className="logo gato" alt="Logo gato" />
        </a>
        <a target="_blank">
          <img src={logoCachorro} className="logo cachorro" alt="Logo cachorro" />
        </a>
      </div>
      <h1>Animal Hotels</h1>
      <div className="card">
        <div className="equipe">
          <h2>Equipe: </h2>
                
          <li>Ana Cláudia</li>
          <li>Roniel Dias</li>
          <li>Sâmia Braga</li>
        </div>

      </div>
      <p className="read-the-docs">
        Projeto da disciplina de Programação para Internet II <br />
        Prof. Me. Rogério Silva
      </p>
    </>
  )
}

export default App
