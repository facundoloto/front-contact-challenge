import { lazy, useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Home.module.css';

const Post = lazy(() => import("./../form/post"));
const NavBar = lazy(() => import("./../NavBar/NavBar/"));
const Table = lazy(() => import("./../StripedColumns/StripedColumns"));

const Home = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <div className={styles.NavBar}>
                <NavBar />
            </div>
            <div className={styles.centeredContainer}>
                <div className={styles.content}>
                    <h1>Welcome</h1>
                    <p>This is an app to save yours contacts.</p>
                    <Button variant="success" onClick={openModal}>Create</Button>
                    <Table />

                </div>
                <Post show={showModal} handleClose={closeModal} />
            </div>

        </>
    );
};

export default Home;