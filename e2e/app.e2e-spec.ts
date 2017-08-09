import { Vikaf2Page } from './app.po';

describe('vikaf2 App', () => {
  let page: Vikaf2Page;

  beforeEach(() => {
    page = new Vikaf2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
