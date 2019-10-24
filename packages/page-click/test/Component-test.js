const babel = require('@babel/register');

babel({
  babelrc: false,
  plugins: [
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-class-properties')
  ],
  presets: [
    require.resolve('@babel/preset-react'),
    [require.resolve('@babel/preset-env'), {
      targets: {
        node: '10'
      },
      modules: 'commonjs',
      loose: true
    }]
  ],
  retainLines: true,
  comments: false
});

const test = require('tape');
const {ReactPageClick} = require('../src/Component');

test(`${require('../package.json').name}`, t => {
  t.ok(ReactPageClick instanceof Function, 'should be function');
  t.end();
});


/* eslint no-warning-comments: 0 */
/*
TODO: Convert to Tape tests

describe('ReactPageClick', () => {
  it('should be ok', () => {
    expect(ReactPageClick).toBeTruthy();
  });


  it('should require the only child to be present', () => {
    expect(() => TestUtils.renderIntoDocument(<ReactPageClick notify={() => {}} />))
      .toThrow();
  });


  describe('Subscribe to document clicks', () => {
    beforeEach(() => {
      spyOn(global.window, 'addEventListener');
      spyOn(global.window, 'removeEventListener');
    });


    it('should subscribe to mousedown on render', () => {
      TestUtils.renderIntoDocument(
        <ReactPageClick notify={() => {}}><span>Test</span></ReactPageClick>);

      expect(global.window.addEventListener).toHaveBeenCalled();
      expect(global.window.addEventListener.calls.mostRecent().args[0]).toEqual('mousedown');
    });


    it('should unsubscribe on destroy', () => {
      const div = document.createElement('div');

      React.render(<ReactPageClick notify={() => {}}><span>Test</span></ReactPageClick>, div);

      const onMouseDown = global.window.addEventListener.calls.mostRecent().args[1];

      React.unmountComponentAtNode(div);

      expect(global.window.removeEventListener).toHaveBeenCalled();
      expect(global.window.removeEventListener.calls.mostRecent().args[0]).toEqual('mousedown');
      expect(global.window.removeEventListener.calls.mostRecent().args[1])
        .toEqual(onMouseDown);
    });
  });


  describe('Notification on clicks', () => {
    let pageClick, notify, onMouseDown;

    beforeEach(() => {
      spyOn(global.window, 'addEventListener');
      notify = jasmine.createSpy('notify');
      pageClick = TestUtils.renderIntoDocument(
        <ReactPageClick notify={notify}><span>Test</span></ReactPageClick>);
      onMouseDown = global.window.addEventListener.calls.mostRecent().args[1];
    });


    it('should notify on clicks outside of the element', () => {
      onMouseDown();

      expect(notify).toHaveBeenCalled();
    });


    it('should not notify on clicks inside the element', () => {
      const span = React.findDOMNode(pageClick);

      TestUtils.Simulate.mouseDown(span);
      onMouseDown();

      expect(notify).not.toHaveBeenCalled();
    });


    it('should set insideClick flag on mouseDown inside', () => {
      const span = React.findDOMNode(pageClick);

      TestUtils.Simulate.mouseDown(span);

      expect(pageClick.insideClick).toBeTruthy();
    });


    it('should reset insideClick flag on mouseUp', () => {
      const span = React.findDOMNode(pageClick);

      TestUtils.Simulate.mouseDown(span);
      TestUtils.Simulate.mouseUp(span);

      expect(pageClick.insideClick).toBeFalsy();
    });


    it('should pass-through click event and other arguments', () => {
      onMouseDown(1, 2, 3);

      expect(notify).toHaveBeenCalledWith(1, 2, 3);
    });
  });


  describe('Notification on clicks including clicks inside', () => {
    let pageClick, notify, onMouseDown;

    beforeEach(() => {
      spyOn(global.window, 'addEventListener');
      notify = jasmine.createSpy('notify');
      pageClick = TestUtils.renderIntoDocument(
        <ReactPageClick notify={notify} outsideOnly={false}><span>Test</span></ReactPageClick>);
      onMouseDown = global.window.addEventListener.calls.mostRecent().args[1];
    });


    it('should notify on clicks inside the element', () => {
      const span = React.findDOMNode(pageClick);

      TestUtils.Simulate.mouseDown(span);
      onMouseDown();

      expect(notify).toHaveBeenCalled();
    });
  });
});
*/
