import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../css/password-btn.css';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  confirmEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    confirmEmail: '',
    age: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert('Los correos electrónicos no coinciden');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    localStorage.setItem('preUserData', JSON.stringify(formData));
    navigate('/userType');
  };

  return (
    <div className="container min-vh-100 my-3 d-flex align-items-center justify-content-center">
      <div className="card border-0 single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex p-4 flex-wrap justify-content-center align-content-center div-img">
              <img
                src="src/assets/forms.jpg"
                alt="Heart shaped dish with pomegranate seeds"
                className="w-100 rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h2 className="text-center mb-4">REGISTRO</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="d-flex flex-row gap-2">
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                  </div>

                  <div className="mb-3">
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

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Confirmar email"
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleChange}
                      required
                    />
                    {formData.email !== formData.confirmEmail && (
                      <small style={{ color: 'red' }}>Los correos electrónicos no coinciden</small>
                    )}
                  </div>

                  <div className="mb-3">
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

                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Teléfono"
                      name="phone"
                      value={formData.phone}
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
                      className="pass-visibility"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>

                  <div className="d-flex position-relative input-with-icon">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Confirmar contraseña"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="pass-visibility"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                    >
                      <span className="material-symbols-outlined">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>

                  {formData.password !== formData.confirmPassword && (
                    <small style={{ color: 'red' }}>Las contraseñas no coinciden</small>
                  )}

                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-dark w-100 py-2"
                      onClick={handleContinue}
                    >
                      Continuar
                    </button>
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
