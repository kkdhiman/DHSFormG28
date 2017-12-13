import { AppPage } from './app.po';

describe('ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('DHS Form G-28 Prototype');
  });
});
