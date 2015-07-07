describe('ReactSwap', () => {
  const ReactSwapInjector = require('inject!../src/ReactSwap');
  let extendProps, ReactSwap;


  beforeEach(() => {
    extendProps = jasmine.createSpyObj('extendProps', ['']);
  });


  beforeEach(() => ReactSwap = ReactSwapInjector({
    './extendProps': extendProps
  }));


  it('should be ok', () => {
    expect(ReactSwap).toBeTruthy();
  });
});
