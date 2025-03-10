import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UserData {
  username: string;
  height: string;
  weight: string;
  goal: string;
}

const EditMeasures: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        username: '',
        height: '',
        weight: '',
        goal: ''
      });
      const [users, setUsers] = useState<string[]>([]);
    
      useEffect(() => {
        //prueba para ver maquetado de la vista
        const fetchUsers = async () => {
          const mockUsers = ['Usuario1', 'Usuario2', 'Usuario3'];
          setUsers(mockUsers);
        };
    
        fetchUsers();
      }, []);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del usuario actualizados:', userData);
      };

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
                            <label htmlFor="username" className="form-label">
                                Nombre de usuario a modificar:
                            </label>
                            <select
                                className="form-select"
                                id="username"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar usuario</option>
                                {users.map((user, index) => (
                                <option key={index} value={user}>{user}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="height" className="form-label">
                                Altura:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="height"
                                name="height"
                                value={userData.height}
                                onChange={handleChange}
                                placeholder="Ingrese altura en cm"
                                required
                            />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="weight" className="form-label">
                                Peso:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="weight"
                                name="weight"
                                value={userData.weight}
                                onChange={handleChange}
                                placeholder="Ingrese peso en kg"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="goal" className="form-label">
                                Objetivo:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="goal"
                                name="goal"
                                value={userData.goal}
                                onChange={handleChange}
                                placeholder="Ingrese su objetivo"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark w-100">
                        Guardar cambios
                        </button>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMeasures;