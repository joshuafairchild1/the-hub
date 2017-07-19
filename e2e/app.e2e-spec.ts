import { TheHubPage } from './app.po';

describe('the-hub App', () => {
  let page: TheHubPage;

  beforeEach(() => {
    page = new TheHubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
