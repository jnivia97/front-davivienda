import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [encuestas, setEncuestas] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:8080/encuesta/findUser?id=${userId}`)
      .then(res => setEncuestas(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2>Mis Encuestas</h2>
      <Link to="/create" className="btn btn-primary mb-3">Crear Nueva Encuesta</Link>
      <ul className="list-group">
        {encuestas.map(e => (
          <li key={e.id} className="list-group-item d-flex justify-content-between">
            {e.titulo}
            <div>
              <Link to={`/survey/${e.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
              <Link to={`/public/${e.id}`} className="btn btn-sm btn-outline-info">Ver Pública</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
