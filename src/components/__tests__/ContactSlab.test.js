import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ContactSlab from "../GlobalComponents/ContactSlab";


beforeEach(() => {
    const contact = {
            firstName: "Bob",
            lastName: "Tester",
            avatar: "https://avatar.jpg",
        }
    render(<ContactSlab contact={contact} />);
});

test("should show user's full name in contact slab", () => {
    const fullName = screen.getByText(/Bob Tester/i);
    expect(fullName).toBeInTheDocument();
});

test("should have an avatar image with user's avatar src", () => {
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveStyle("background-image: url('https://avatar.jpg')");
});