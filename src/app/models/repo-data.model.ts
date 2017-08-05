export class RepoData {
  constructor(
    public createdBy: string,
    public userURL: string,
    public creatorAviURL: string,
    public repoName: string,
    public repoURL: string,
    public cloneURL: string,
    public description: string,
    public homepage: string,
    public forks: number,
    public commitsNumber: number,
    public commits: any[],
    public stars: number,
    public fileSize: number,
    public watchers: number,
    public language: string,
    public createdAt: string,
    public lastUpdatedAt: string,
    public contributors: any[]
  ) {}
}
