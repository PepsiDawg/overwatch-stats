import { OverwatchStatsTrackerPage } from './app.po';

describe('overwatch-stats-tracker App', () => {
  let page: OverwatchStatsTrackerPage;

  beforeEach(() => {
    page = new OverwatchStatsTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
