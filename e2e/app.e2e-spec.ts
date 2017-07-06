import { GenericAdapterPage } from './app.po';

describe('generic-adapter App', () => {
  let page: GenericAdapterPage;

  beforeEach(() => {
    page = new GenericAdapterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
