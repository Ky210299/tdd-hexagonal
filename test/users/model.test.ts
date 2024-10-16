import User from "../../src/users/model";

describe("Jest should work", () => {
	it("should work", () => {
		expect(1 + 1).toEqual(2);
	});
});

describe("Users functionalities", () => {
	it("Should return an User when you create one", () => {
		const newUser = User.createUser();
		expect(newUser).toBeInstanceOf(User);
	});
});
