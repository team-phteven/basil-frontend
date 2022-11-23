import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Message from "../ChatColumn/Message";

// load LogInForm wrapped in Router
beforeEach(() => {
    const createdAt = new Date;
    const ISO = createdAt.toISOString();
    const message = {
        createdAt: ISO,
        sender: {
            firstName: "Bob",
            lastName: "Tester",
            avatar: "https://avatar.jpg"
        },
        content: "Hello World"
    }

    render(
        <Message message={message}/>
    );
});

test("should show user's full name above message", () => {
    const fullName = screen.getByText(/Bob Tester/i);
    expect(fullName).toBeInTheDocument();
});

test("should show the sent date (ISO) in a human readable format", () => {
    const date = screen.getByText(/Today/i);
});

test("should have an avatar image with user's avatar src", () => {
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveStyle("background-image: url('https://avatar.jpg')")
});

test("should render a message body", () => {
    const body = screen.getByText("Hello World");
    expect(body).toBeInTheDocument();
});
