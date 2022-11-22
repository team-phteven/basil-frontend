// Packages
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useUser } from "../../../contexts/UserProvider";
// Custom Components
import Avatar from "../../GlobalComponents/Avatar";
import IconButton from "../../GlobalComponents/IconButton";
// React BS Components
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// Icons
import { MdCheckCircle, MdDelete } from "react-icons/md";
import { FaDice } from "react-icons/fa";

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
    const handleFile = async (file) => {
        // start loading state
        setLoading(true);
        // check for missing file
        if (file === undefined) {
            console.log("file upload failed");
        }
        // if file type excepted make upload
        if (["image/jpeg", "image/png", "image/jpeg"].includes(file.type)) {
            // create a new FormData instance (XMLHttpRequest Standard)
            // this format is required for Cloudinary upload API
            const body = new FormData();
            // add file to form data
            body.append("file", file);
            // add cloud preset to form data
            body.append(
                "upload_preset",
                process.env.REACT_APP_CLOUDINARY_PRESET
            );
            // add cloud name to form data
            body.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
            // make post request
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            const data = await axios
                .post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
                    body,
                    config
                ).catch((error) => {
                    setFileError("File upload failed, check requirements");
                    setFileValidity("Invalid");
                    setLoading(false);
                    return;
                });

            if (!data) {
                setFileError("File upload failed, check requirements");
                setFileValidity("Invalid");
                setLoading(false);
                return;
            }

            setFileValidity("Valid");
            // set the uploaded images url to form field
            setAvatar(data.data.url);
            // end loading state
            setLoading(false);
        } else {
            setFileError("Incorrect file format");
            setFileValidity("Invalid");
            setLoading(false);
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
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // update user
        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/users/update-avatar`,
                { avatar },
                config
            )
            .catch((error) => {
                setError(error.message);
                setValidity("Invalid");
                setLoading(false);
                return;
            });
        // set new user details in local storage
        localStorage.setItem("storedUser", JSON.stringify(data));
        // set user data context
        const userData = JSON.parse(localStorage.getItem("storedUser"));
        setLocalUser(userData);
        setValidity("Valid");
        // Clean Up
        setError("");
        setLoading(false);
    };

    const deleteAvatar = async () => {
        setLoading(true);
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
            ).catch((error) => {
                setError("Could not delete Avatar");
                setValidity("Invalid");
                setLoading(false);
            })
            // set new user data to local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            // Set user context
            const userData = JSON.parse(localStorage.getItem("storedUser"));
            setLocalUser(userData);
            // Clean up
            setLoading(false);
    };

    return (
        <>
            <Heading>Change Avatar</Heading>
            <PreviewRow>
                <AvatarCol>
                    <Avatar
                        url={localUser.avatar}
                        bgc={"black"}
                        size="100px"
                        hideStatus
                    />
                </AvatarCol>
                <ButtonCol>
                    {/* if it's a default avatar use dice icon otherwise trashcan */}
                    {localUser.avatar.match(".svg") ? (
                        <IconButton icon={FaDice} action={deleteAvatar} />
                    ) : (
                        <IconButton icon={MdDelete} action={deleteAvatar} />
                    )}
                </ButtonCol>
            </PreviewRow>
            <FileUploadRow as={Form} onSubmit={handleSubmit} name="avatarForm">
                <Col>
                    <FormGroup
                        as={Row}
                        onChange={(e) => handleFile(e.target.files[0])}
                    >
                        <Form.Control
                            id="password"
                            type="file"
                            accept="image/*"
                            isValid={fileValidity === "Valid" ? true : false}
                            isInvalid={fileValidity === "Invalid" ? true : false}
                        />
                        <Specifications>
                            .jpg .jpeg .png - 10mb max
                        </Specifications>
                        {fileValidity === "Invalid" && (
                            <ErrorText>{fileError}</ErrorText>
                        )}
                    </FormGroup>
                    <Row className="p-0 m-0">
                        {validity === "Invalid" && (
                            <ErrorText>{error}</ErrorText>
                        )}
                        <Col
                            as={Button}
                            xs="auto"
                            variant="primary"
                            type="submit"
                            // disable update button if file is loading or no uploads
                            disabled={loading || fileValidity !== "Valid"}
                        >
                            {loading && (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{" "}
                                </>
                            )}
                            <span>Update Avatar</span>
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
            </FileUploadRow>
        </>
    );
};

const Heading = styled.h3`
    color: white;
`

const Specifications = styled.span`
    color: var(--lightgrey);
    padding: 0;
    margin: 0;
`

const ErrorText = styled.span`
    color: red;
    padding: 0;
    margin: 0;
`;

const PreviewRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 40px;
`
const FileUploadRow = styled(Row)`
    padding: 0;
    margin: 0;
`
const FormGroup = styled(Row)`
    padding: 0;
    margin: 0 0 20px 0;
`

const AvatarCol = styled(Col)`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
`
const ButtonCol = styled(Col)`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
`;