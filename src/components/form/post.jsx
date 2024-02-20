import { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useDataContext } from "../../provider/DataProvider";
import Loader from "../Loader/Loader";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormContact from "./form";

export default function Post({ show, handleClose, initialValues }) {
  const { addData, updateData } = useDataContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      if (initialValues) {
        await updateData(data)
      } else {
        await addData(data);
      }
      setLoading(false);
      handleClose();
    } catch (error) {
      throw new Error(error);
    }
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
            <FormContact onSubmit={handleSubmit} initialValues={initialValues} />
          </Modal.Body>
        </Modal>
      </div>

    </>
  );
}