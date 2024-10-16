export default class User {
	public static createUser(username: string, email: string) {
		if (!username || !email) throw 1;
		return new User();
	}
	
	public getName(){
		
	}
	public getEmail(){
		
	}
	
}