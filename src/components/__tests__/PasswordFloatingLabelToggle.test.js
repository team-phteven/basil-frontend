import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import PasswordFloatingLabelToggle from "../Auth/PasswordFloatingLabelToggle";

// load LogInForm wrapped in Router
beforeEach(() => {
    render(
        <PasswordFloatingLabelToggle />
    );
});

// note FloatingLabels are considered placeholders on load
test("should render input with placeholder", () => {
    const input = screen.getByPlaceholderText("Password");
    expect(input).toBeInTheDocument();
});

test("should render show password button", () => {
    const button = screen.getByTestId("show");
    expect(button).toBeInTheDocument();
});

// Tetsing for the show/hide functionality of password field
test("should have input type: password by default and type: text after button click", () => {
    const input = screen.getByPlaceholderText("Password");
    const button = screen.getByTestId("show");
    expect(input.type).toBe("password");
    fireEvent.click(button);
    expect(input.type).toBe("text");
});