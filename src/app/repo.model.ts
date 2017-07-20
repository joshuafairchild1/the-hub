export class Repo {
  constructor(
    public repoName: string,
    public repoURL: string,
    public language: string,
    public stars: number,
    public homepage: string
  ) {}
}
