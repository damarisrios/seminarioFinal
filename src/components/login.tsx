import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LoginData {
  email: string;
  password: string;
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  confirmEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
}

const LoginRegistrationForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    confirmEmail: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login submitted:', loginData);
  };

  const handleRegistrationSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registration submitted:', registrationData);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
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
                <h2 className="text-center mb-4">{isLogin ? 'INICIAR SESIÓN' : 'REGISTRO'}</h2>
                {isLogin ? (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Dirección de email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-dark w-100 py-2 mb-3">
                      Iniciar sesión
                    </button>
                    <p className="text-center">
                      ¿No tienes una cuenta?{' '}
                      <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(false)}>
                        Regístrate
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegistrationSubmit}>
                    <div className="row g-3">
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre"
                          name="firstName"
                          value={registrationData.firstName}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apellido"
                          name="lastName"
                          value={registrationData.lastName}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre de usuario"
                          name="username"
                          value={registrationData.username}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Dirección de email"
                          name="email"
                          value={registrationData.email}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Confirmar email"
                          name="confirmEmail"
                          value={registrationData.confirmEmail}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <select 
                          className="form-select"
                          name="age"
                          value={registrationData.age}
                          onChange={handleRegistrationChange}
                          required
                        >
                          <option value="">Edad</option>
                          {Array.from({ length: 83 }, (_, i) => i + 18).map(age => (
                            <option key={age} value={age}>{age}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                          name="password"
                          value={registrationData.password}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirmar contraseña"
                          name="confirmPassword"
                          value={registrationData.confirmPassword}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-dark w-100 py-2">
                          Registrarse
                        </button>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      ¿Ya tienes una cuenta?{' '}
                      <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(true)}>
                        Inicia sesión
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistrationForm;