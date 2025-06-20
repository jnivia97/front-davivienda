import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/user/v1/newUser', form);
      alert('Usuario registrado');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error al registrar');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" className="form-control mb-2" placeholder="Nombre" onChange={handleChange} />
        <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" className="form-control mb-2" placeholder="Contraseña" onChange={handleChange} />
        <button className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
