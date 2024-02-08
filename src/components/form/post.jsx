import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../store/authStore';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDataContext } from "../../provider/DataProvider";
import Loader from "../Loader/Loader";
import stylePost from "./form.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Post({ show, handleClose }) {
  const { register, handleSubmit } = useForm();
  const { addData } = useDataContext();
  const idUser = useAuthStore((state) => state.idUser);
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", idUser);
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("number", data.phone);

    await addData(formData);
    setLoading(false);
    handleClose();
  };


  return (
    <>
      <div className='modal' >
        <Modal show={show} onHide={handleClose}>
          {loading ? <Loader isLoading={true} /> : null}

          <Modal.Header closeButton>
            <Modal.Title>Form</Modal.Title>
          </Modal.Header>

          <Modal.Body >
            <Form onSubmit={handleSubmit(onSubmit)} >
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder='name' {...register("name")} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>LastName</Form.Label>
                <Form.Control type="text" placeholder='lastName' {...register("lastName")} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder='email' rows={3}  {...register("email")} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder='phone' rows={3}  {...register("phone")} />
              </Form.Group>
              <Button type="submit" >
                Create
              </Button>
            </Form>
          </Modal.Body>

        </Modal>


      </div>

    </>
  );
}
