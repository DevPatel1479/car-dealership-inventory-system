import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import RegisterPage from "../../../../src/features/auth/pages/RegisterPage";
import LoginPage from "../../../../src/features/auth/pages/LoginPage";

vi.mock("../../../../src/features/auth/api/auth.api", () => ({
    registerUser: vi.fn().mockResolvedValue({}),
}));

describe("RegisterPage", () => {
    it("should redirect to the login page after successful registration", async () => {
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </MemoryRouter>,
        );

        const user = userEvent.setup();

        await user.type(
            screen.getByLabelText(/name/i),
            "Dev Patel",
        );

        await user.type(
            screen.getByLabelText(/email/i),
            "dev@test.com",
        );

        await user.type(
            screen.getByLabelText(/password/i),
            "password123",
        );

        await user.click(
            screen.getByRole("button", {
                name: /register/i,
            }),
        );

        expect(
            await screen.findByRole("button", {
                name: /login/i,
            }),
        ).toBeInTheDocument();
    });
});