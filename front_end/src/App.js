import React, { useState, useEffect } from 'react';
import './App.css';
import CursosList from './components/CursoList/CursosList';

function App() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cursos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCursos(data))
      .catch(error => console.error('Erro ao buscar cursos:', error.message));
  }, []);

  return (
    <div className="App">
      <CursosList cursos={cursos} />
    </div>
  );
}

export default App;

