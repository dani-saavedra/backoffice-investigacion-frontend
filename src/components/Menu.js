import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { Button,Card,CardText,CardTitle,} from "reactstrap";


const MenuPrincipal = () => {
  const his = useHistory();
  let token = localStorage.getItem('auth_token')

  const cerrar = () => {
    localStorage.clear()
    his.push("/")
  }
  if (token) {
    return <div>
    <Card
      body
      inverse
      style={{
        backgroundColor: '#333',
        borderColor: '#333'
      }}
    >
      <CardTitle tag="h5">
        MODULO GESTIÓN DE PROYECTOS 
      </CardTitle>
      <CardText>
        En este modulo puede encontrar los diferentes proyectos creados en FutureTech .
      </CardText>
      <Button>
      <a href="/proyecto/listar" class="btn btn-info" role="Ver Proyectos">VER PROYECTOS </a> 
      </Button>
    </Card>
    <Card
      body
      color="primary"
      inverse
    >
      <CardTitle tag="h5">
        MODULO DE CREACIÓN DE PROYECTOS
      </CardTitle>
      <CardText>
        En este modulo podrá crear proyectos de investigación.
      </CardText>
      <Button>
      <a href="/proyecto" class="btn btn-success" role="crear proyecto">CREAR PROYECTO</a>
      </Button>
    </Card>
    <Card
      body
      color="success"
      inverse
  
    >
      <CardTitle tag="h5">
       MODULO DE USUARIOS 
      </CardTitle>
      <CardText>
       En este modulo puede consultar el listado de los usuarios inscristos en la plataforma.
      </CardText>
      <Button>
      <a href="/usuario" class="btn btn-info" role="ver usuarios">VER USUARIOS</a>
      </Button>
    </Card>
    <div>
    <div class="d-grid  gap-2 col-6 mx-auto btn btn-info btn-dark">
  
     <button onClick={cerrar}>Cerrar sesión</button>
</div>

</div>
    
  </div>
  
  } else {

    his.push("/")
    return <div></div>
  }

}

export default MenuPrincipal