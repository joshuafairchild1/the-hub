export class UserData {
  constructor(
    public username: string,
    public fullName: string,
    public ghLink: string,
    public aviURL: string,
    public bio: string,
    public location: string,
    public userSince: string,
    public lastActive: string,
    public repoCount: number,
    public repos: any[],
    public followerCount: number,
    public followingCount: number,
    public starredRepos: any[]
  ) {}
}
