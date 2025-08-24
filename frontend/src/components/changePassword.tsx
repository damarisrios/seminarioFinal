import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PasswordData {
  password: string;
  confirmPassword: string;
}

const PasswordChange: React.FC = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.password !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0  single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex p-4 flex-wrap justify-content-center align-content-center div-img">
              <img
                src="src\assets\forms.jpg"
                alt="Heart shaped dish with pomegranate seeds"
                className="w-100 rounded"
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                  <h4 className="text-center mb-4"><strong>CAMBIAR CONTRASEÑA</strong></h4>
                  <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                              Contraseña actual:
                          </label>
                          <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={passwordData.password}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                              Nueva contraseña:
                          </label>
                          <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={passwordData.newPassword}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="confirmPassword" className="form-label">
                              Confirmar contraseña:
                          </label>
                          <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      {error && (
                      <div className="alert alert-danger" role="alert">
                          {error}
                      </div>
                      )}
                      <button type="submit" className="btn btn-dark w-100">
                          Guardar cambios
                      </button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;