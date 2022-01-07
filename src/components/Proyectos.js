import {
  useQuery,
  gql
} from "@apollo/client";
import { Link } from "react-router-dom";
import { Table} from "reactstrap"

const Proyectos = () => {
  const PROYECTOS = gql`
  query  {
    proyectos {
      lider
      nombre
      presupuesto
      _id
    }
  }
`;

  const { loading, error, data } = useQuery(PROYECTOS, {
    context: {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlc2l0byI6IkVzdHVkaWFudGUiLCJpYXQiOjE2Mzc5MjQ5NDEsImV4cCI6MTYzNzkzMjE0MX0.A8vvtMPG0SDJKoewopdKQduOcQMhQoOsTxS9C_wWzvw'
      }
    }
  })
  if (loading) return "<h1>Cargando</h1>"
  if (error) return "<h1>problemas con el server de graphql</h1>"

  const datosTabla = data.proyectos.map(({ lider, nombre, presupuesto, _id }) => (
    <tr key={nombre}>
      <td>{nombre}</td>
      <td>{lider}</td>
      <td>{presupuesto}</td>
      <td><Link to={`/proyecto/${_id}`}>editar</Link></td>
    </tr>
  ));

  return (<Table >
    <thead>
   
      <tr>
        <th>
          Proyecto 
        </th>
        <th>
          Lider 
        </th>
        <th>
          Presupuesto
        </th>
        <th>
          Acciones 
        </th>
        </tr>
       
    </thead>
    <tbody>
    </tbody>
    {datosTabla}
  </Table>)
}



export default Proyectos