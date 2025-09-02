import React, { useRef, useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Toast from 'bootstrap/js/dist/toast';
import { useNavigate } from 'react-router-dom';

interface PasswordData {
  newUsername: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditUser: React.FC = () => {
  const [formData, setFormData] = useState<PasswordData>({
    newUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const toastRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const userId = localStorage.getItem('userId');
  if (!userId) {
    setError('No se encontró la sesión del usuario. Volvé a iniciar sesión.');
    return;
  }

  // Construir payload dinámico
  const payload: any = {};

  // Si quiere cambiar nombre de usuario
  if (formData.newUsername.trim()) {
    payload.new_username = formData.newUsername.trim();
  }

  // Si quiere cambiar contraseña
  if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
    if (!formData.currentPassword) {
      setError('Ingresá tu contraseña actual');
      return;
    }
    if (formData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    payload.contrasena_actual = formData.currentPassword;
    payload.contrasena_nueva = formData.newPassword;
  }

  if (Object.keys(payload).length === 0) {
    setError('No ingresaste ningún cambio');
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/usuarios/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      setError(data.message || 'No se pudo actualizar el usuario');
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
  } catch (err) {
    console.error(err);
    setError('Error en el servidor / red. Verificá que el backend esté corriendo.');
  }
};


  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0 single-form">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex p-4 flex-wrap justify-content-center align-content-center div-img">
              <img
                src="src/assets/forms.jpg"  /* usar / en vez de \ */
                alt="Heart shaped dish with pomegranate seeds"
                className="w-100 rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex flex-wrap align-content-center">
              <div className="p-4 w-100 div-form">
                <h4 className="text-center mb-4"><strong>CAMBIAR CONTRASEÑA</strong></h4>
                <form autoComplete="no" onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'> Nombre de usuario</label>
                    <input type="text" 
                      className='form-control'
                      id='newUsername'
                      name='newUsername'
                      value={formData.newUsername}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Contraseña actual:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nueva contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar nueva contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <button type="submit" className="btn btn-dark w-100">
                    Guardar cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast igual al de UserMeasures */}
      <div
        className="toast position-fixed bottom-0 end-0 m-3 text-bg-success"
        role="alert"
        ref={toastRef}
        data-bs-delay="1500"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">¡Contraseña actualizada con éxito!</div>
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

export default EditUser;
