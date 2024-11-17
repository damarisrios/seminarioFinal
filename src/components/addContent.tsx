import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
  type: string;
  username: string;
  title: string;
  content: string;
}

const AddContent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    type: '',
    username: '',
    title: '',
    content: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

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
              NUTRICIONISTA
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select 
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required>
                    <option value="">Elija receta o consejo</option>
                    <option value="receta">Receta</option>
                    <option value="consejo">Consejo</option>
                  </select>
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
                    type="text"
                    className="form-control"
                    placeholder="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label mb-2">REDACTAR</label>
                  <textarea
                    className="form-control"
                    rows={5}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-dark w-100">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddContent;