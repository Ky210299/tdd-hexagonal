import UserRepository from "../domain/repository";
import UserService from "../domain/service";
import InMemoryUserRepository from "./in-memory-repository";

const inMemoryUserRepository = new InMemoryUserRepository();
export const userService = new UserService(inMemoryUserRepository);
