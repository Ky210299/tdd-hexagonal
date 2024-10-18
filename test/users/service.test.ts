import User from "../../src/users/model";
import UserService from "../../src/users/service";

describe("Follow others users", () => {
		let user1: User;
		let user2: User;
		let user3: User;
		let user4: User;
		beforeEach(() => {
			user1 = User.createUser(exampleUUID, exampleUsername, exampleEmail);
			user2 = User.createUser(
				"123e4567-e89b-12d3-a456-42665544200a",
				"Alfonso",
				"alfonso@email.com",
			);
			user3 = User.createUser("123e4567-e89b-12d3-a456-42665544200b", "Pedro", "pedro@email.com");
			user4 = User.createUser("123e4567-e89b-12d3-a456-42665544200c", "Leo", "leo@email.com");
		});

		it("A new User dont have any follow", () => {
			expect(user1.getTotalFollowers()).toEqual(0);
		});
		it("An new user do not follow to anyone", () => {
			expect(user1.getTotalFolloweds()).toEqual(0);
		});

		it("Should retrive an empty list of followers a new user", () => {
			const followers = user1.getListOfFollowers();
			expect(Array.isArray(followers)).toBeTruthy();
			expect(followers.length).toEqual(0);
		});

		it("Should retrive an empty list of followeds for a new user", () => {
			const followeds = user1.getListOfFollowers();
			expect(Array.isArray(followeds)).toBeTruthy();
			expect(followeds.length).toEqual(0);
		});

		it("Should throw an error if an user try to follow to itself", () => {
			expect(() => user1.followTo(user1)).toThrow();
		});

		it("Should throw an error if an user try to unfollow to itself", () => {
			expect(() => user1.unfollowTo(user1)).toThrow();
		});
