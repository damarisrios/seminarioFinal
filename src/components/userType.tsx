import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UserTypeSelectionProps {
  onSelectType?: (type: 'user' | 'nutritionist') => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelectType = () => {} }) => {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0  single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex flex-wrap justify-content-center align-content-center">
              <img
                src="src\assets\forms.jpg"
                alt="Heart shaped dish with pomegranate seeds"
                className="img-fluid rounded-start h-75"
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
                    onClick={() => onSelectType('user')}
                  >
                    Usuario →
                  </button>
                  <button 
                    className="btn btn-dark py-2"
                    onClick={() => onSelectType('nutritionist')}
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