import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

interface Recipe {
  id: number;
  title: string;
}

interface Tip {
  id: number;
  content: string;
}

const NutritionistDashboard: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [tips, setTips] = useState<Tip[]>([]);
  
    const addRecipe = () => {
      const newRecipe: Recipe = {
        id: Date.now(),
        title: `Receta ${recipes.length + 1}`,
      };
      setRecipes([...recipes, newRecipe]);
    };
  
    const addTip = () => {
      const newTip: Tip = {
        id: Date.now(),
        content: `Consejo ${tips.length + 1}`,
      };
      setTips([...tips, newTip]);
    };

    
    const navigate = useNavigate();
    const userName = localStorage.getItem('username') || 'Usuario';

    const handleModifyProfile = () => {
    navigate('/userMeasures');
    };

    const handleModifyPass = () => {
    navigate('/editProfile');
    };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center px-5 position-relative z-1">
    <div className="text-center mb-5">
        <span className="material-symbols-outlined fs-1 text-secondary">account_circle</span>
        <h2 className="mt-2">¡Hola, {userName}!</h2>
        <p className="text-muted">Bienvenido a tu panel de salud</p>
    </div>

    <div className="row g-4">
        <div className="col-md-3">
        <div className="card shadow-sm glass-card">
            <div className="card-body d-flex flex-column gap-3">
            <button
                className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={handleModifyProfile}
            >
                <span className="material-symbols-outlined">table_edit</span>
                Modificar paciente
            </button>
            <button
                className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={handleModifyPass}
            >
                <span className="material-symbols-outlined">person_edit</span>
                Editar perfil
            </button>
            </div>
        </div>
        </div>
        <div className="col-md-9 d-flex flex-column gap-4">
        {/* Lista de recetas */}
        <div className="card shadow-sm glass-card">
            <div className="card-header bg-light bg-opacity-50 d-flex align-items-center justify-content-between">
            <h5 className="card-title mb-0 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined">restaurant_menu</span>
                Lista de Recetas
            </h5>
            <button className="btn btn-dark btn-sm d-flex align-items-center gap-2" onClick={addRecipe}>
                <span className="material-symbols-outlined">library_add</span>
                Agregar
            </button>
            </div>
            <div className="card-body">
            {recipes.length > 0 ? (
                <ul className="list-group list-group-flush">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="list-group-item bg-transparent">
                    <strong>{recipe.title}</strong>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-center text-muted">No hay recetas registradas.</p>
            )}
            </div>
        </div>
        <div className="card shadow-sm glass-card">
            <div className="card-header bg-light bg-opacity-50 d-flex align-items-center justify-content-between">
            <h5 className="card-title mb-0 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined">favorite</span>
                Consejos Saludables
            </h5>
            <button className="btn btn-dark btn-sm d-flex align-items-center gap-2" onClick={addTip}>
                <span className="material-symbols-outlined">library_add</span>
                Agregar
            </button>
            </div>
            <div className="card-body">
            {tips.length > 0 ? (
                <ul className="list-group list-group-flush">
                {tips.map((tip) => (
                    <li key={tip.id} className="list-group-item bg-transparent">{tip.content}</li>
                ))}
                </ul>
            ) : (
                <p className="text-center text-muted">No hay consejos registrados.</p>
            )}
            </div>
        </div>
        </div>
    </div>
    </div>
    
  );
};

export default NutritionistDashboard;