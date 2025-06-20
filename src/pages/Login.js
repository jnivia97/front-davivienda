import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/user/v1/login', form);
      localStorage.setItem('userId', res.data.idUser);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Login inválido');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="name" className="form-control mb-2 " placeholder="Email" value={null}/>
        <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" className="form-control mb-2" placeholder="Contraseña" onChange={handleChange} />
        <button className="btn btn-success">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
