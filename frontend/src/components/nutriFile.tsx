import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NutriFormData {
  matricula: string;
  universidad: string;
  especialidad: string;
}

const NutriFile: React.FC = () => {
  const [formData, setFormData] = useState<NutriFormData>({
    matricula: '',
    universidad: '',
    especialidad: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preUserData = localStorage.getItem('preUserData');
    if (!preUserData) {
      alert('Faltan los datos del paso anterior');
      return;
    }

    const baseData = JSON.parse(preUserData);

    const userPayload = {
      nombre: baseData.firstName,
      apellido: baseData.lastName,
      edad: baseData.age,
      email: baseData.email,
      telefono: baseData.phone || null,
      contraseña: baseData.password
    };

    try {
      // 1. Registrar usuario
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });

      const result = await response.json();
      if (!result.success) {
        alert('Error al registrar usuario: ' + result.message);
        return;
      }

      const usuario_id = result.usuario_id;

      // 2. Registrar como nutricionista
      const nutriRes = await fetch('http://localhost:3000/register-nutricionista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id,
          matricula: formData.matricula,
          universidad: formData.universidad,
          especialidad: formData.especialidad
        })
      });

      const nutriResult = await nutriRes.json();
      if (!nutriResult.success) {
        alert('Error al registrar como nutricionista: ' + nutriResult.message);
        return;
      }

      alert('Registro completo');
      localStorage.removeItem('preUserData');
      localStorage.removeItem('userType');
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert('Error en el servidor');
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0 single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex flex-wrap p-4 justify-content-center align-content-center div-img">
              <img
                src="src/assets/forms.jpg"
                alt="Formulario nutricionista"
                className="w-100 rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h2 className="text-center mb-4">NUTRICIONISTA</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Matrícula"
                      name="matricula"
                      value={formData.matricula}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Universidad"
                      name="universidad"
                      value={formData.universidad}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Especialidad"
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleChange}
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

export default NutriFile;
