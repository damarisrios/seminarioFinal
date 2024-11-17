import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-between">
        <section className="col-2">
            <div className="card border-0 ">
                <div className="card-body p-0">
                    <div className="d-flex flex-column gap-2">
                        <button className="btn btn-link text-dark text-decoration-none text-center p-2">
                            MODIFICAR PERFIL
                        </button>
                        <button className="btn btn-link text-dark text-decoration-none text-center p-2">
                            MODIFICAR PACIENTE
                        </button>
                        <button className="btn btn-link text-dark text-decoration-none text-center p-2">
                            CAMBIAR CONTRASEÑA
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section className="gap-4 d-flex flex-row justify-content-center">
            <div className="card border-0  content-box">
                <div className="card-body p-0">
                    <div className="row g-0">
                        <div className="card-header text-center">
                            <h5 className="card-title mb-0">LISTA DE RECETAS</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {recipes.map((recipe) => (
                                <li key={recipe.id} className="list-group-item">
                                    {recipe.title}
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-dark w-100" onClick={addRecipe}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Agregar receta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card border-0  content-box">
                <div className="card-body p-0">
                    <div className="row g-0">
                        <div className="card-header text-center">
                            <h5 className="card-title mb-0">CONSEJOS SALUDABLES</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {tips.map((tip) => (
                                <li key={tip.id} className="list-group-item">
                                    {tip.content}
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-dark w-100" onClick={addTip}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Agregar consejo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div> 
  );
};

export default NutritionistDashboard;