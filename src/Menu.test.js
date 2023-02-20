import React from "react";
import { shallow } from "enzyme";
import { Menu } from "./Menu";
import { renderWithProviders } from "./utils/test-utils";
import { createStore } from "redux";

describe("Menu", () => {
	let wrapper;

	beforeEach(() => {});

	test("renders without crashing", async () => {
		const store = createStore();
		renderWithProviders(<Menu />, { store });
	});
});
