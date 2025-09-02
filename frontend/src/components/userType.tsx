import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserMeasures from './UserMeasures';
import NutriFile from './NutriFile';

const UserTypeSelection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'user' | 'nutritionist' | null>(null);

  const handleSelectType = (type: 'user' | 'nutritionist') => {
    localStorage.setItem('userType', type);
    setSelectedType(type);
  };

  if (selectedType === 'user') return <UserMeasures />;
  if (selectedType === 'nutritionist') return <NutriFile />;

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0 single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex flex-wrap p-4 justify-content-center align-content-center div-img">
              <img
                src="src/assets/forms.jpg"
                alt="Heart shaped dish with pomegranate seeds"
                className="w-100 rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h2 className="text-center mb-4">ELIGE TU TIPO DE USUARIO</h2>
                <div className="text-center mb-4">
                  <p className="text-muted mb-0">
                    Si deseas aprender hábitos saludables y adquirir nuevas recetas haz click en "Usuario".
                  </p>
                  <p className="text-muted">
                    Si eres nutricionista haz click en "Nutricionista".
                  </p>
                </div>
                <div className="d-grid gap-3">
                  <button
                    className="btn btn-dark py-2"
                    onClick={() => handleSelectType('user')}
                  >
                    Usuario →
                  </button>
                  <button
                    className="btn btn-dark py-2"
                    onClick={() => handleSelectType('nutritionist')}
                  >
                    Nutricionista →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
