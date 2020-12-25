import { VisuumPage } from './app.po';

describe('visuum App', () => {
  let page: VisuumPage;

  beforeEach(() => {
    page = new VisuumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
