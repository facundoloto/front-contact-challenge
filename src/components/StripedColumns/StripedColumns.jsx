import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import style from './StripedColumn.module.css';
import { useDataContext } from '../../provider/DataProvider';

function StripedColumns() {
  const { data, fetchDataAllContact, deleteData } = useDataContext();

  useEffect(() => {
    fetchDataAllContact();
  }, []);

  const handleDelete = async (id) => {
    deleteData(id);
  };

  return (
    <div className={style.tableResponsive}>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(data => {
              return (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email != null ? data.email : "not email"}</td>
                  <td>{data.phone != null ? data.phone : "not phone"}</td>
                  <td><Button variant="danger" onClick={() => handleDelete(data.id)}>Delete</Button></td>
                  <td> <Button variant="warning">Edit</Button></td>
                </tr>
              )
            })
          }

        </tbody>
      </Table>
    </div>
  );
}

export default StripedColumns;