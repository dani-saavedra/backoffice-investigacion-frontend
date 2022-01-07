import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Usuario from "./Usuario";


const ListaUsuarios = () => {

  const USUARIOS = gql`
    query {
        usuarios {
        identificacion
        nombre
        email
        estado
        perfil
      }
    }
`;
  

  const BUSCAR_USUARIOS_NOMBRE = gql`
    query GetUsuarioNombre($nombre: String) {
      getUsuarioNombre(nombre: buscar) {
        identificacion
        nombre
        email
        estado
        perfil
      }
    }
`;
  
  const nombre = useQuery(BUSCAR_USUARIOS_NOMBRE);

  const buscar = async (e) => {
    if (e.target.value === '') {
      //return useQuery(USUARIOS)
    } else {
      return nombre
    }
    const buscar = e.target.value
    console.log(buscar)

  }
  
  
  const { data, loading, error } = useQuery(USUARIOS);

  if (loading) {
    return <div>
      <p>Estoy cargando aún</p>
    </div>
  }

  if (error) {
    return <div>
      <p>Hubo un error</p>
    </div>
  }
  
  return <div> 
    <header className='py-2 bg-info text-white'>
      <div className="container-md">
        <div className="col-md-2">
          <h1>FutureTech </h1>
        </div>
      </div>
    </header>
    <nav className='navbar py-4'>
      <div className="container">
        <div className="col-md-6">
          <label to='#' className="btn btn-info text-white" data-toggle='modal' data-target='#addVenta'>
            Agregar usuarios
          </label>
        </div>
        <div className="col-md-5 ml-auto">
          <div className="col">
            <div class="input-group">
              <input className="form-control" type="text" placeholder="Buscar por" aria-label="Buscar" id="nombre"  onChange={(e) => buscar (e)} />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section>
      <div class=" container-md ">
        <div className="row">
          <div className="col-md-15">
            <div className="card">
              <div className="card-header"><h3>FutureTech: Lista Usuarios</h3></div>
            </div>

            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th class="col-md-2">Identificacion</th>
                  <th class="col-md-2">Nombre </th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
                {data.usuarios.map((usuario) => <Usuario user={usuario} />)}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>

  
}

export default ListaUsuarios