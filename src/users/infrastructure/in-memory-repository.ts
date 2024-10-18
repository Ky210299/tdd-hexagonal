import UserRepository from "../domain/repository";

export default class InMemoryUserRepository implements UserRepository {
	private db = {};
}
