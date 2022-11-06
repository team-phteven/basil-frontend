import React, { useRef } from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { Modal, Form, Button } from "react-bootstrap";

const NewContactModal = ({ closeModal }) => {
    const emailRef = useRef();
    const { storedUser } = useContacts();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/users/add-request",
            {
                method: "PUT",
                body: JSON.stringify({ email: emailRef.current.value }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.token}`,
                },
            }
        );

        const json = await response.json();
        console.log(json);
        // requestContact(idRef.current.value, nameRef.current.value);
        closeModal();
    };

    return (
        <>
            <Modal.Header closeButton>Make Contact Request</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" ref={emailRef} required />
                    </Form.Group>
                    <Button className="mt-1" type="submit">
                        Request
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
};

export default NewContactModal;
