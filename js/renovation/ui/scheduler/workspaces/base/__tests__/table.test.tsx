import { h } from 'preact';
import { shallow } from 'enzyme';
import { viewFunction as TableView } from '../table';

describe('LayoutBase', () => {
  describe('Render', () => {
    const render = (viewModel) => shallow(TableView({
      ...viewModel,
      props: {
        ...viewModel.props,
      },
    } as any) as any);

    it('should spread restAttributes', () => {
      const layout = render({ restAttributes: { customAttribute: 'customAttribute' } });

      expect(layout.prop('customAttribute'))
        .toBe('customAttribute');
    });

    it('render should be correct', () => {
      const layout = render({
        props: {
          className: 'some-class',
        },
      });

      const table = layout.find('table');
      expect(table.exists())
        .toBe(true);
      expect(table.hasClass('some-class'))
        .toBe(true);

      const tbody = layout.find('tbody');
      expect(tbody.exists())
        .toBe(true);
    });

    it('should render content', () => {
      const layout = render({
        props: { children: <div className="some-class" /> },
      });

      const content = layout.find('.some-class');
      expect(content.exists())
        .toBe(true);
    });
  });
});
