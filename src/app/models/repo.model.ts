export class Repo {
  constructor(
    public repoName: string,
    public repoUrl: string,
    public authorName: string,
    public authorUrl: string,
    public authorAviUrl: string,
    public description: string,
    public language: string,
    public stars: number,
    public homepage: string
  ) {}
}
