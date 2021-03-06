import { h } from 'preact';
import { shallow } from 'enzyme';
import { viewFunction as LayoutView } from '../layout';
import { MonthDateTableCell } from '../cell';

jest.mock('../../../base/date_table/layout', () => ({
  ...require.requireActual('../../../base/date_table/layout'),
  DateTableLayoutBase: (props) => <div {...props} />,
}));

describe('MonthDateTableLayout', () => {
  describe('Render', () => {
    const viewData = {
      groupedData: [{
        dateTable: [
          [{ startDate: new Date(2020, 6, 9, 0), endDate: new Date(2020, 6, 9, 0, 30), groups: 1 }],
          [{ startDate: new Date(2020, 6, 9, 0, 30), endDate: new Date(2020, 6, 9, 1), groups: 2 }],
        ],
      }],
    };

    const render = (viewModel) => shallow(LayoutView({
      ...viewModel,
      props: { viewData, ...viewModel.props },
    } as any) as any);

    it('should spread restAttributes', () => {
      const layout = render({ restAttributes: { customAttribute: 'customAttribute' } });

      expect(layout.prop('customAttribute'))
        .toBe('customAttribute');
    });

    it('should pass correct props to base layout', () => {
      const layout = render({});

      expect(layout.props())
        .toMatchObject({
          viewData,
          cellTemplate: MonthDateTableCell,
        });
    });
  });
});
