import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PublicSurvey() {
  const { id } = useParams();
  const [encuesta, setEncuesta] = useState(null);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/encuesta/find?id=${id}`)
      .then(res => setEncuesta(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (idPregunta, idRespuesta, texto) => {
    setRespuestas(prev => ({ ...prev, [idPregunta]: { idRespuesta, texto } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatted = Object.entries(respuestas).map(([idPregunta, val]) => ({
      idPregunta: parseInt(idPregunta),
      idRespuesta: val.idRespuesta,
      texto: val.texto
    }));
    try {
      await axios.post('http://localhost:8080/answer/new', {
        ipUser: '127.0.0.1',
        idEncuesta: id,
        respuestaRequest: formatted
      });
      alert('Respuesta enviada');
    } catch (err) {
      console.error(err);
    }
  };

  if (!encuesta) return <div className="container mt-5">Cargando...</div>;

  return (
    <div className="container mt-5">
      <h2>{encuesta.titulo}</h2>
      <form onSubmit={handleSubmit}>
        {encuesta.preguntas.map((p) => (
          <div key={p.id} className="mb-3">
            <label className="form-label">{p.pregunta}</label>
            {!p.tipoPregunta ? (
              <input className="form-control" onChange={e => handleChange(p.id, p.opciones[0]?.id || 0, e.target.value)} />
            ) : (
              p.opciones.map(o => (
                <div key={o.id} className="form-check">
                  <input className="form-check-input" type="radio" name={`pregunta-${p.id}`}
                    onChange={() => handleChange(p.id, o.id, o.texto)} />
                  <label className="form-check-label">{o.texto}</label>
                </div>
              ))
            )}
          </div>
        ))}
        <button className="btn btn-primary">Enviar Respuestas</button>
      </form>
    </div>
  );
}

export default PublicSurvey;
