// Packages
import { useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { useUser } from "../../../contexts/UserProvider";
// Custom Components
import Avatar from "../../GlobalComponents/Avatar";
// React BS Components
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// Icons
import { MdCheckCircle, MdDelete } from "react-icons/md";

export const AvatarForm = () => {
    // Local User Context
    const { localUser, setLocalUser } = useUser();

    // validity state of form
    const [validity, setValidity] = useState("untouched");

    // file upload form validity
    const [fileValidity, setFileValidity] = useState("untouched");

    // Error state of form
    const [error, setError] = useState("");

    // Error state of form
    const [fileError, setFileError] = useState("");

    // loading state of form
    const [loading, setLoading] = useState(false);

    // Avatar URL state
    const [avatar, setAvatar] = useState(localUser.avatar);

    // This handles the uploading to Cloudinary
    const handleFile = (file) => {
        setLoading(true);
        //  file upload error
        if (file === undefined) {
            setError("File upload failed.");
            setFileValidity("Invalid");
            setLoading(false);
        }
        //  Check supported file type
        if (["image/jpeg", "image/png", "image/jpeg"].includes(file.type)) {
            // Create XMLHttp FormData
            const data = new FormData();
            // Add uploaded file
            data.append("file", file);
            //  attach the Cloudinary preset
            data.append(
                "upload_preset",
                process.env.REACT_APP_CLOUDINARY_PRESET
            );
            //  attach cloud name
            data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
            //  make post request to cloudinary upload API
            fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
                {
                    method: "post",
                    body: data,
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    //  setting avatar URL
                    // note, this just save it to forms state
                    // user still needs to press update
                    setAvatar(data.url.toString());

                    //  Clean Up
                    setFileValidity("Valid");
                    setFileError("");
                    setLoading(false);
                })
                .catch((error) => {
                    setFileError("File upload failed, check requirements.");
                    setLoading(false);
                    setFileValidity("Invalid");
                });
        } else {
            setFileError("Wrong file format");
            setLoading(false);
            setFileValidity("Invalid");
        }
    };

    const handleSubmit = async (e) => {
        // prevent page refresh
        e.preventDefault();
        setLoading(true);
        // check if avatar uploaded
        if (!avatar) {
            setValidity("Invalid");
            setError("Upload an Avatar");
            setLoading(false);
            return;
        }

        // try to set users new av avatar
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localUser.token}`,
                },
            };

            // update user
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/users/update-avatar`,
                { avatar },
                config
            );

            // set new user details in local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            // set user data context
            const userData = JSON.parse(localStorage.getItem("storedUser"));
            setLocalUser(userData);

            // Clean Up
            setError("");
            setValidity("Valid");
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setValidity("Invalid");
            setLoading(false);
        }
    };

    const deleteAvatar = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localUser.token}`,
                },
            };

            // update user
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/users/delete-avatar`,
                {},
                config
            );

            // set new user data to local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            // Set user context
            const userData = JSON.parse(localStorage.getItem("storedUser"));
            setLocalUser(userData);

            // Clean up
            setLoading(false);
        } catch (error) {
            setError("Could not delete Avatar");
            setValidity("Invalid");
            setLoading(false);
            return;
        }
    };

    return (
        <>
            <h3 className="text-white">Change Avatar</h3>
            <Row className="d-flex flex-row justify-content-center p-4">
                <Col className="p-0 m-0 d-flex flex-column justify-content-end align-items-end">
                    <Avatar
                        url={localUser.avatar}
                        bgc={"black"}
                        size="100px"
                        hideStatus
                    />
                </Col>
                <Col className="p-0 m-0 d-flex flex-column justify-content-end">
                    <StyledIcon
                        className="p-0"
                        size="30px"
                        color="white"
                        onClick={deleteAvatar}
                    />
                </Col>
            </Row>
            <Row
                as={Form}
                onSubmit={handleSubmit}
                name="avatarForm"
                className="p-0 mb-5"
            >
                <Col>
                    <Form.Group
                        as={Col}
                        className="p-0 mb-4"
                        onChange={(e) => handleFile(e.target.files[0])}
                    >
                        <Form.Control
                            id="password"
                            type="file"
                            accept="image/*"
                            isValid={fileValidity === "Valid" ? true : null}
                            isInvalid={fileValidity === "Invalid" ? true : null}
                        />
                        <span className="m-0 p-0 text-white">
                            .jpg .jpeg .png - 10mb max
                        </span>
                        {fileValidity === "Invalid" && (
                            <p className="m-0 p-0 mb-2 text-danger">
                                {fileError}
                            </p>
                        )}
                    </Form.Group>
                    <Row className="p-0 m-0">
                        {validity === "Invalid" && (
                            <span className="m-0 p-0 mb-2 text-danger">
                                {error}
                            </span>
                        )}
                        <Col
                            as={Button}
                            xs="auto"
                            variant="primary"
                            type="submit"
                            className="text-white"
                            disabled={loading}
                        >
                            {loading && (
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )}
                            <span className="ms-2">Update Avatar</span>
                        </Col>
                        <Col className="d-flex flex-column justify-content-end">
                            {validity === "Valid" && (
                                <MdCheckCircle
                                    size="20px"
                                    color="var(--green)"
                                />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};


const StyledIcon = styled(MdDelete)`
    &:hover {
        cursor: pointer;
    }
`;