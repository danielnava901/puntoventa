export default interface AuthRepository {
  login: (email: string) => Promise<{token : string}>,

}
