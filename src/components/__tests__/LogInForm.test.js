import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import LogInForm from "../Auth/LogInForm";
import { BrowserRouter as Router } from "react-router-dom";

// load LogInForm wrapped in Router
beforeEach(() => {
    render(
        <Router>
            <LogInForm />
        </Router>
    );
});

// note FloatingLabels are considered placeholders on load
test("should render inputs with placeholders", () => {
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
});

test("should render a submit button", () => {
    const submit = screen.getByText('Submit');
    expect(submit).toBeInTheDocument();
})

test("email value should change on input", () => {
    const email = screen.getByPlaceholderText("Email");
    const testEmail = "bob@test.com";

    fireEvent.change(email, { target: { value: testEmail } });
    expect(email.value).toBe(testEmail);
});

test("password value should change on input", () => {
    const password = screen.getByPlaceholderText("Password");
    const testPassword = "password123";

    fireEvent.change(password, { target: { value: testPassword } });
    expect(password.value).toBe(testPassword);
});

test("submit button should be disabled when loading otherwise it should be enabled", () => {
    const submit = screen.getByText("Submit");
    expect(submit).not.toBeDisabled();
    fireEvent.click(submit);
    expect(submit).toBeDisabled();
})