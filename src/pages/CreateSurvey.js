import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateSurvey() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const agregarPregunta = () => {
    setPreguntas([...preguntas, {
      pregunta: '',
      tipoPregunta: false,
      opcionPreguntaRequest: [{ textoOpcion: '' }]
    }]);
  };

  const handlePreguntaChange = (index, field, value) => {
    const nuevas = [...preguntas];
    nuevas[index][field] = value;
    setPreguntas(nuevas);
  };

  const handleOpcionChange = (pIndex, oIndex, value) => {
    const nuevas = [...preguntas];
    nuevas[pIndex].opcionPreguntaRequest[oIndex].textoOpcion = value;
    setPreguntas(nuevas);
  };

  const agregarOpcion = (pIndex) => {
    const nuevas = [...preguntas];
    nuevas[pIndex].opcionPreguntaRequest.push({ textoOpcion: '' });
    setPreguntas(nuevas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/encuesta/new', {
        idUser: userId,
        titulo,
        descripcion,
        pregunta: preguntas
      });
      alert('Encuesta creada');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error al crear encuesta');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Encuesta</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <button type="button" className="btn btn-secondary mb-3" onClick={agregarPregunta}>Agregar Pregunta</button>
        {preguntas.map((p, i) => (
          <div key={i} className="border p-3 mb-2">
            <input className="form-control mb-2" placeholder="Pregunta" value={p.pregunta} onChange={e => handlePreguntaChange(i, 'pregunta', e.target.value)} />
            <select className="form-control mb-2" value={p.tipoPregunta} onChange={e => handlePreguntaChange(i, 'tipoPregunta', e.target.value === 'true')}>
              <option value="false">Abierta</option>
              <option value="true">Cerrada</option>
            </select>
            {p.tipoPregunta && p.opcionPreguntaRequest.map((o, j) => (
              <input key={j} className="form-control mb-1" placeholder="Opción" value={o.textoOpcion} onChange={e => handleOpcionChange(i, j, e.target.value)} />
            ))}
            {p.tipoPregunta && <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => agregarOpcion(i)}>+ Opción</button>}
          </div>
        ))}
        <button className="btn btn-success">Guardar Encuesta</button>
      </form>
    </div>
  );
}

export default CreateSurvey;
