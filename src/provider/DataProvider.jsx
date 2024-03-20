import { createContext, useContext, useState, useEffect } from 'react';
import { createContact, getAllContactsByUser, deleteContact, updateContact } from '../api/routes';
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import mapDtoToViewModel from '../components/StripedColumns/tableDto';

const DataContext = createContext();

export const useDataContext = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const idUser = useAuthStore((state) => state.idUser);

    const fetchDataAllContact = async () => {
        const response = await getAllContactsByUser(idUser);
        setData(response.map(mapDtoToViewModel));
    };

    const updateData = async (data) => {
        const res = await updateContact(data);
        if (res.status === 200) {
            await fetchDataAllContact();
        }
    };

    const deleteData = async (id) => {

        Swal.fire({
            title: 'Do you want logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(
            async (result) => {
                if (result.isConfirmed) {
                    const response = await deleteContact(id);
                    try {
                        if (response.status === 200) {
                            const updatedData = data.filter(data => data.id !== id);
                            setData(updatedData);
                        }
                    } catch (error) {
                        new Error('It could not delete contact');
                    }
            }
        });
    }

    const addData = async (data) => {
        const res = await createContact(data);
        if (res.status === 200) {
            await fetchDataAllContact();
        }
    };
    useEffect(() => {
        fetchDataAllContact();
    }, []);
    const contextValue = {
        data,
        fetchDataAllContact,
        addData,
        updateData,
        deleteData
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};