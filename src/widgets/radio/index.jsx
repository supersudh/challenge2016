import Radio from './radio';
import Group from './group';
import Button from './radioButton';
import Link from './radioLink';
import { pureRender } from '../../utils';
import './style';

Radio.Button = pureRender(Button);
Radio.Group = pureRender(Group);
Radio.Link = pureRender(Link);
export default Radio;
