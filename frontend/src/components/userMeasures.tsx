import React, { useRef, useState, FormEvent, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Toast from 'bootstrap/js/dist/toast';
import { useNavigate } from 'react-router-dom';


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

  const [modoEdicion, setModoEdicion] = useState(false);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem('preUserData') && userId) {
      setModoEdicion(true);
      fetch(`http://localhost:3000/paciente/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setFormData({
              peso: data.paciente.peso.toString(),
              altura: data.paciente.altura.toString(),
              objetivo: data.paciente.objetivo || ''
            });
          }
        })
        .catch(err => console.error('Error al obtener datos del paciente:', err));
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const altura = parseFloat(formData.altura);
    const peso = parseFloat(formData.peso);

    if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
      alert("Altura y peso deben ser mayores a cero");
      return;
    }

    const imc = peso / Math.pow(altura / 100, 2);

    try {
      if (modoEdicion && userId) {
        // MODIFICAR PERFIL
        const response = await fetch(`http://localhost:3000/paciente/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ altura, peso, imc, objetivo: formData.objetivo })
        });

        const result = await response.json();

        if (!result.success) {
          alert('Error al actualizar perfil: ' + result.message);
          return;
        }

        const toastEl = toastRef.current;
        if (toastEl) {
          const toast = new Toast(toastEl);
          toast.show();

          setTimeout(() => {
            navigate('/dashboardU');
          }, 2000);
        }
      } else {
        // REGISTRO NUEVO
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

        // Registrar usuario
        const res = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userPayload)
        });

        const regData = await res.json();
        if (!regData.success) {
          alert('Error al registrar usuario: ' + regData.message);
          return;
        }

        const usuario_id = regData.usuario_id;

        // Registrar como paciente
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

        const pacienteData = await pacienteRes.json();
        if (!pacienteData.success) {
          alert('Error al registrar como paciente: ' + pacienteData.message);
          return;
        }

        alert('Registro completo');
        localStorage.removeItem('preUserData');
        localStorage.removeItem('userType');
        window.location.href = "/login";
      }
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
                <h2 className="text-center mb-4">{modoEdicion ? 'MODIFICAR PERFIL' : 'USUARIO'}</h2>
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
                      {modoEdicion ? 'Guardar cambios' : 'Registrarme →'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="toast position-fixed bottom-0 end-0 m-3 text-bg-success"
      role="alert"
      ref={toastRef}
      data-bs-delay="1500"
      aria-live="assertive"
      aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">¡Cambios guardados con éxito!</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default UserMeasures;
