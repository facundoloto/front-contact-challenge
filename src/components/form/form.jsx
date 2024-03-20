// MyForm.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { useAuthStore } from '../../store/authStore';

const FormContact = ({ onSubmit, initialValues }) => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: initialValues || {},
    });

    const userId = useAuthStore((state) => state.idUser);

    const onSubmitHandler = async (data) => {
        const requestData = { ...data, userId };
        await onSubmit(requestData);
    };

    useEffect(() => {
        // Set form values when initialValues change (for update scenario)
        Object.keys(initialValues || {}).forEach((key) => {
            setValue(key, initialValues[key]);
        });
    }, [initialValues, setValue]);

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmitHandler)} >
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
                    <Form.Control type="text" placeholder='phone' rows={3}  {...register("number")} />
                </Form.Group>
                <Button type="submit" >
                    submit
                </Button>
            </Form>
        </>
    );
};

export default FormContact;