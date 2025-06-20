import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SurveyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [encuesta, setEncuesta] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/encuesta/find?id=${id}`)
            .then(res => setEncuesta(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const eliminar = async () => {
        try {
            await axios.get(`http://localhost:8080/encuesta/delete?id=${id}`);
            alert('Encuesta eliminada');
            navigate('/home');
        } catch (err) {
            console.error(err);
        }
    };

    if (!encuesta) return <div className="container mt-5">Cargando...</div>;

    return (
        <div className="container mt-5">
            <h2>{encuesta.titulo}</h2>
            <p>{encuesta.descripcion}</p>
            <h5>Preguntas</h5>
            <ul className="list-group">
                {encuesta.preguntaResponses.map((p) => (
                    <li key={p.id} className="list-group-item">
                        {p.titulo}
                    </li>
                ))}
            </ul>
            <button className="btn btn-danger mt-3" onClick={eliminar}>
                Eliminar Encuesta
            </button>
        </div>

    );
}

export default SurveyDetail;
