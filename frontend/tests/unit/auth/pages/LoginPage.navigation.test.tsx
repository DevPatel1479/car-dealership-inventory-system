import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../../../../src/features/auth/pages/LoginPage";

vi.mock("../../../../src/features/auth/api/auth.api", () => ({
    login: vi.fn().mockResolvedValue({
        token: "jwt-token",
    }),
}));

describe("LoginPage", () => {
    it("should redirect to the vehicles dashboard after a successful login", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/vehicles"
                        element={<h1>Vehicle Inventory</h1>}
                    />
                </Routes>
            </MemoryRouter>,
        );

        await user.type(
            screen.getByLabelText(/email/i),
            "admin@test.com",
        );

        await user.type(
            screen.getByLabelText(/password/i),
            "password123",
        );

        await user.click(
            screen.getByRole("button", {
                name: /login/i,
            }),
        );

        expect(
            await screen.findByText(/vehicle inventory/i),
        ).toBeInTheDocument();
    });
});