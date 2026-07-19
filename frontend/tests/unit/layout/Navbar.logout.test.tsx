import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "../../../src/components/layout/Navbar";

const removeToken = vi.fn();

vi.mock(
    "../../../src/features/auth/services/auth.storage",
    () => ({
        removeToken,
    }),
);

describe("Navbar", () => {
    it("should logout the current user", async () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        const user = userEvent.setup();

        await user.click(
            screen.getByRole("button", {
                name: /logout/i,
            }),
        );

        expect(removeToken).toHaveBeenCalled();
    });
});