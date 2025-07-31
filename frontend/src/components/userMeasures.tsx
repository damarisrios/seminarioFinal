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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      // 1. Registrar el usuario
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

      // 2. Validar altura y peso antes de calcular IMC
      const altura = parseFloat(formData.altura);
      const peso = parseFloat(formData.peso);

      if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
        alert("Altura y peso deben ser mayores a cero");
        return;
      }

      const imc = peso / Math.pow(altura / 100, 2);

      // 3. Registrar como paciente
      const pacienteRes = await fetch('http://localhost:3000/register-paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id,
          altura,
          peso,
          imc,
          rol: 'paciente'
        })
      });

      const pacienteResult = await pacienteRes.json();
      if (!pacienteResult.success) {
        alert('Error al registrar como paciente: ' + pacienteResult.message);
        return;
      }

      alert('Registro completo');
      localStorage.removeItem('preUserData');
      localStorage.removeItem('userType');

      // Redirigir al login (o donde quieras)
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
                alt="Formulario medidas usuario"
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
                      placeholder="Peso en kg"
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
                      placeholder="Altura en cm"
                      name="altura"
                      value={formData.altura}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-select"
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un objetivo</option>
                      <option value="Bajar de peso">Bajar de peso</option>
                      <option value="Subir de peso">Subir de peso</option>
                      <option value="Alimentación saludable">Alimentación saludable</option>
                    </select>
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
