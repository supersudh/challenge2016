import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import Calendar from './Calendar';
import { pureRender } from '../../utils';
import './style';

const DatePicker = pureRender(wrapPicker(createPicker(RcCalendar)));
const MonthPicker = pureRender(wrapPicker(createPicker(MonthCalendar), 'yyyy-MM'));

DatePicker.Calendar = pureRender(Calendar);
DatePicker.RangePicker = pureRender(wrapPicker(RangePicker, 'yyyy-MM-dd'));
DatePicker.MonthPicker = pureRender(MonthPicker);

export default DatePicker;
