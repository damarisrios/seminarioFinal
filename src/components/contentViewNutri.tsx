import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PenSquare } from 'lucide-react';

interface Item {
  id: number;
  title: string;
  description: string;
  type: 'recipe' | 'tip';
}

interface RecipeOrTipViewProps {
  item: Item;
  onEdit: (id: number, type: 'recipe' | 'tip') => void;
}

const ContentViewN: React.FC<RecipeOrTipViewProps> = ({ 
  item = {
    id: 1,
    title: 'SORRENTINOS DE RICOTA, ESPINACA Y NUEZ',
    description: 'Para comenzar a armar este plato de sorrentinos de espinacas, primero debes preparar la masa para los sorrentinos de espinacas. En una mesada limpia realiza una corona con la harina. En el centro, vuelca los huevos, margarina o aceite. Mezcla hasta unir hasta que la pasta madre te permita amasar sin dificultad, en ese caso ten en cuenta que la perderás sabor. También puedes reemplazar el 100% de la harina por harina integral o puedes hacer la masa sólo con harina blanca 000.',
    type: 'recipe'
  }, 
  onEdit 
}) => {
    return (
        <div className="container min-vh-100 d-flex align-items-center">
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
          <section className="col-10 col-3 d-flex align-items-center justify-content-center">
            <div className="card border-0  single-form justify-content-center">
              <div className="card-body p-0 content-view">
                <div className="row g-0">
                  <h2 className="card-title text-center mb-4">
                    {item.title}
                  </h2>
                  <p className="card-text">
                    {item.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className="badge bg-dark">
                      {item.type === 'recipe' ? 'Receta' : 'Consejo'}
                    </span>
                    <button 
                      className="btn btn-dark"
                      onClick={() => onEdit(item.id, item.type)}
                      >
                      <PenSquare className="me-2" size={18} />
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    };
    
    export default ContentViewN;