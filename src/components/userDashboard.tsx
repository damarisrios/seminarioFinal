import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Recipe {
  id: number;
  title: string;
  description: string;
}

interface Tip {
  id: number;
  title: string;
  content: string;
}

interface HealthDashboardProps {
  assignedRecipes?: Recipe[];
  assignedTips?: Tip[];
}

const UserDashboard: React.FC<HealthDashboardProps> = ({ 
    assignedRecipes = [], 
    assignedTips = [] 
  }) => {
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
                        <div className="card-header text-center bg-light">
                            <h5 className="card-title mb-0">LISTA DE RECETAS</h5>
                        </div>
                        <div className="card-body">
                            {assignedRecipes.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                {assignedRecipes.map((recipe) => (
                                    <li key={recipe.id} className="list-group-item">
                                    <h6>{recipe.title}</h6>
                                    {recipe.description && <p className="mb-0 text-muted">{recipe.description}</p>}
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p className="text-center text-muted">No hay recetas asignadas.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card border-0  content-box">
                <div className="card-body p-0">
                    <div className="row g-0">
                        <div className="card-header text-center bg-light">
                            <h5 className="card-title mb-0">CONSEJOS SALUDABLES</h5>
                        </div>
                        <div className="card-body">
                            {assignedTips.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                {assignedTips.map((tip) => (
                                    <li key={tip.id} className="list-group-item">
                                    {tip.content}
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p className="text-center text-muted">No hay consejos asignados.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div> 
  );
};

export default UserDashboard;