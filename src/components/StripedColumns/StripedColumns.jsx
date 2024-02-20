import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import style from './StripedColumn.module.css';
import { useDataContext } from '../../provider/DataProvider';
import Post from '../form/post';
import isTokenExists from '../../provider/CheckToken';

function StripedColumns() {
  const { data, fetchDataAllContact, deleteData } = useDataContext();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    deleteData(id);
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTokenExists()) {
        clearInterval(intervalId); // Stop the interval
        fetchDataAllContact();
      }
    }, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


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
                  <td>{data.number != null ? data.number : "not phone"}</td>
                  <td><Button variant="danger" onClick={() => handleDelete(data.id)}>Delete</Button></td>
                  <td> <Button variant="warning" onClick={() => handleEdit(data)}>Edit</Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <Post show={showModal} handleClose={() => {
        setShowModal(false);
        setEditingItem(null);
      }}
        initialValues={editingItem}
      />
    </div>
  );
}

export default StripedColumns;