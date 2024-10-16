import User from "../../src/users/model";

describe("Jest should work", () => {
	it("should work", () => {
		expect(1 + 1).toEqual(2);
	});
});

describe("Users functionalities", () => {
	describe("Create an user", () => {
		it("User model should have an method for create a user called createUser", () => {
			expect(typeof User.createUser).toEqual("function");
		});

		it("createUser method must receive by parameters username and email", () => {
			expect(User.createUser.length).toEqual(2);
		});

		it("Should throw an error if not username or email is passed", () => {
			expect(() => User.createUser(null, null)).toThrow;
		});

		it("Should return an user instance", () => {
			const newUser = User.createUser("Robert", "email");
			expect(newUser instanceof User).toBeTruthy();
		});

		it("The user instance should have a method called getName and getEmail", () => {
			const newUser = User.createUser("Robert", "email");

			expect(typeof newUser.getName).toEqual("function");
			expect(typeof newUser.getEmail).toEqual("function");
		});
		
		it("The instanciated user should have the passed username and email", ()=> {
			const username = "Robert";
			const email = "email";
			const newUser = User.createUser(username, email);
			expect(newUser.getEmail() === email).toBeTruthy();
			expect(newUser.getName() === username).toBeTruthy();
		})
	});
});
