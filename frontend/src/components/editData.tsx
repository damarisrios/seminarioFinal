import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProfileFormData {
    username: string
    email: string
    confirmEmail: string
}

const EditData: React.FC = () => {
    const [formData, setFormData] = useState<ProfileFormData>({
        username: '',
        email: '',
        confirmEmail: ''
      })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

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
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h2 className="text-center mb-4">MODIFICAR PERFIL</h2>
                <form onSubmit={handleSubmit}>
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
                        type="email"
                        className="form-control"
                        placeholder="Dirección de email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Confirme email"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-dark py-2">
                        Guardar cambios →
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

export default EditData;