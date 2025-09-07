import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/password-btn.css'

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        contraseña: formData.password
      })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('rol', data.rol);


      if (data.rol === 'nutricionista') {
        navigate('/dashboardN');
      } else if (data.rol === 'paciente') {
        navigate('/dashboardU'); 
      } else {
        alert('No se pudo determinar el tipo de usuario');
      }

    } else {
      alert(data.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión a la base de datos');
  }
};


  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0  single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex flex-wrap p-4 justify-content-center align-content-center div-img">
              <img
                src="src\assets\forms.jpg"
                alt="Heart shaped dish with pomegranate seeds"
                className="w-100 rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h2 className="text-center mb-4">INICIAR SESIÓN</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Dirección de email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex position-relative input-with-icon">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Contraseña"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className='pass-visibility'
                      onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? (
                        <span className="material-symbols-outlined">visibility_off</span>
                      ) : (
                        <span className="material-symbols-outlined">visibility</span>
                      )}
                    </button>
                  </div>
                  <button type="button" className="btn btn-dark w-100 py-2 mb-3"
                      onClick={handleSubmit}>
                      Iniciar sesión
                    </button>
                  <p className="text-center">
                    ¿No tienes una cuenta?{' '}
                    <button type="button" className="btn btn-link mt-1 p-0"
                      onClick={() => navigate('/register')}>
                      Regístrate
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;