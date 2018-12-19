import React from 'react';

import {
  shallow
} from 'enzyme';

import PropertiesContainer from '../PropertiesContainer';

/* global sinon */


describe('<PropertiesContainer>', function() {

  describe('resizing', function() {

    afterEach(sinon.restore);

    it('should throttle resizing by dragging', function() {

      // given
      const FAKE_HEIGHT = 100;

      const { instance } = createPropertiesContainer({
        expanded: true
      });

      const changeLayoutSpy = sinon.spy(instance, 'changeLayout');

      const resizeFunction = instance.handleResize(FAKE_HEIGHT);


      // when
      const dragStartEvent = new DragEvent('dragstart');

      const dragEvent = new CustomEvent('drag');
      dragEvent.x = 10;

      const dragEvent2 = new CustomEvent('drag');
      dragEvent2.x = 20;

      resizeFunction(dragStartEvent);

      document.dispatchEvent(dragEvent);
      document.dispatchEvent(dragEvent2);

      // then
      expect(changeLayoutSpy).to.have.been.calledOnce;

      document.dispatchEvent(new DragEvent('dragend'));
    });

  });

});


// helpers /////////////////////////////////////

function createPropertiesContainer(options = {}, mountFn = shallow) {

  if (typeof options === 'function') {
    mountFn = options;
    options = {};
  }

  const tree = mountFn(
    <PropertiesContainer
      layout={ options.layout || {} }
      { ...options }
    />
  );

  const instance = tree.find('PropertiesContainerWrapped')
    .first()
    .shallow()
    .instance();

  return {
    tree,
    instance
  };

}