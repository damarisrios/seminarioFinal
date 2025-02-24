import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  confirmEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    confirmEmail: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container min-vh-100 my-3 d-flex align-items-center justify-content-center">
      <div className="card border-0  single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex p-4 flex-wrap justify-content-center align-content-center div-img">
              <img
                src="src\assets\forms.jpg"
                alt="Heart shaped dish with pomegranate seeds"
                className="w-100 rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h2 className="text-center mb-4">REGISTRO</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de usuario"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
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
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Confirmar email"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input 
                        className="form-control"
                        type="number"
                        placeholder="Edad"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirmar contraseña"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-dark w-100 py-2">
                        Continuar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;