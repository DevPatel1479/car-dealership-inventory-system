import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VehiclesPage from "../../../../src/features/vehicles/pages/VehiclesPage";

describe("VehiclesPage", () => {
    it("should render the vehicle dashboard", () => {
        render(<VehiclesPage />);

        expect(
            screen.getByRole("heading", {
                name: /vehicle inventory/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(
                /search by make/i,
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /add vehicle/i,
            }),
        ).toBeInTheDocument();
    });
});