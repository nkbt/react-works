describe('extendProps', () => {
  const extendPropsInjector = require('inject!../src/extendProps');
  let extendProps;


  beforeEach(() => extendProps = extendPropsInjector({}));


  it('should be ok', () => {
    expect(extendProps).toBeTruthy();
  });
});
