import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Heart, Apple, Utensils } from 'lucide-react';
import "../css/homePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0  card-home">
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
              <div className="p-4 w-100 div-form d-flex flex-column align-items-center">
                <h1 className="text-center mb-1">Bienvenido a <span className="first-title">Vellura</span></h1>
                <hr className="m-3" />
                    <div className="d-flex flex-column m-3">
                        <span className="d-flex flex-row align-items-center">
                            <Utensils className="icon m-2 ms-0" size={30} />
                            <h5 className="m-0">Recetas Personalizadas</h5>
                        </span>
                        <span className="d-flex flex-row align-items-center">
                            <Heart className="icon m-2 ms-0" size={30} />
                            <h5 className="m-0">Consejos de Expertos</h5>
                        </span>
                        <span className="d-flex flex-row align-items-center mb-3">
                            <Apple className="icon m-2 ms-0" size={30} />
                            <h5 className="m-0">Seguimiento de Progreso</h5>
                        </span>
                    </div>
                    <div className="text-center d-flex flex-row align-items-center my-2">
                        <button className="btn-home btn-lg me-3 mb-3">Iniciar Sesión</button>
                        <button className="btn-home btn-lg mb-3">Registrarse</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;