import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UserFormData {
  peso: string;
  altura: string;
  objetivo: string;
}

const UserMeasures: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    peso: '',
    altura: '',
    objetivo: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0  single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex flex-wrap p-4 justify-content-center align-content-center div-img">
              <img
                src="src\assets\forms.jpg"
                alt="Heart shaped dish with pomegranate seeds"
                className="w-100 rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h2 className="text-center mb-4">USUARIO</h2>
                <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                            type="number"
                            className="form-control"
                            placeholder="Peso"
                            name="peso"
                            value={formData.peso}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                            type="number"
                            className="form-control"
                            placeholder="Altura"
                            name="altura"
                            value={formData.altura}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Objetivo"
                            name="objetivo"
                            value={formData.objetivo}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark py-2">
                            Registrarme →
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
export default UserMeasures;