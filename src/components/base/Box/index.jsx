import { Element, createElement } from '@tiger-ui/react';

const Box = createElement('div')({
  extendedProps: [
    Element.Sizing.props,
    Element.Display.props,
    Element.Flexbox.props,
    Element.Color.props,
    Element.Spacing.props,
    Element.Typography.props,
    Element.Cursor.props,
    Element.Opacity.props,
  ],
});

export default Box;
