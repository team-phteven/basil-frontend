import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import TrailingMessage from "../ChatColumn/TrailingMessage";

// load LogInForm wrapped in Router
beforeEach(() => {
    const createdAt = new Date();
    const ISO = createdAt.toISOString();
    const message = {
        createdAt: ISO,
        sender: {
            firstName: "Bob",
            lastName: "Tester",
            avatar: "https://avatar.jpg",
        },
        content: "Hello World",
    };

    render(<TrailingMessage message={message} />);
});

// NOTE: Trailling messages should not show the same information as regular messages.

test("should NOT show user's name above message", () => {
    const fullName = screen.queryByText('Bob Tester');
    expect(fullName).toBeNull();
});

test("should NOT show the sent date", () => {
    const date = screen.queryByText(/Today/i);
    expect(date).toBeNull();
});

test("should have an avatar image with user's avatar src", () => {
    const avatar = screen.queryByTestId("avatar");
    expect(avatar).toBeNull();
});

test("should render a message body", () => {
    const body = screen.getByText("Hello World");
    expect(body).toBeInTheDocument();
});
