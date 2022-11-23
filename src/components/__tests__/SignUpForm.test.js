import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import SignUpForm from "../Auth/SignUpForm";
import { BrowserRouter as Router } from "react-router-dom";

// load LogInForm wrapped in Router
beforeEach(() => {
    render(
        <Router>
            <SignUpForm />
        </Router>
    );
});

// note FloatingLabels are considered placeholders on load
test("should render inputs with placeholders", () => {
    const firstName = screen.getByPlaceholderText("First Name");
    const lastName = screen.getByPlaceholderText("Last Name");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getAllByPlaceholderText("Password");

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    // should be two password fields
    expect(password).toHaveLength(2);
});

test("should render a submit button", () => {
    const submit = screen.getByText("Submit");
    expect(submit).toBeInTheDocument();
});

test("email value should change on input", () => {
    const email = screen.getByPlaceholderText("Email");
    const testEmail = "bob@test.com";

    fireEvent.change(email, { target: { value: testEmail } });
    expect(email.value).toBe(testEmail);
});

test("password value should change on input", () => {
    const passwords = screen.getAllByPlaceholderText("Password");
    const password = passwords[0];
    const testPassword = "password123";

    fireEvent.change(password, { target: { value: testPassword } });
    expect(password.value).toBe(testPassword);
});

test("Confirm password value should change on input", () => {
    const passwords = screen.getAllByPlaceholderText("Password");
    const confirmPassword = passwords[1];
    const testPassword = "password123";

    fireEvent.change(confirmPassword, { target: { value: testPassword } });
    expect(confirmPassword.value).toBe(testPassword);
});

test("submit button should be disabled when full form is submitted", () => {
    const firstName = screen.getByPlaceholderText("First Name");
    const lastName = screen.getByPlaceholderText("Last Name");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getAllByPlaceholderText("Password");
    const form = screen.getByTestId("form");
    const submit = screen.getByText("Submit");

    fireEvent.change(firstName, { target: { value: "Bob" } });
    fireEvent.change(lastName, { target: { value: "Tester" } });
    fireEvent.change(email, { target: { value: "bob@test.com" } });
    fireEvent.change(password[0], { target: { value: "password123" } });
    fireEvent.change(password[1], { target: { value: "password123" } });

    fireEvent.submit(form);
    expect(submit).toBeDisabled();
});
