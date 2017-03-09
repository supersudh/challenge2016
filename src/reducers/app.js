/**
 * Created by Zhengfeng Yao on 16/8/27.
 */
import { APP } from '../actionTypes';
const { INIT } = APP;
const INIT_STATE = {};

export default function reducer(state=INIT_STATE, {type, payload}) {
  switch(type) {
    case INIT:
    default:
      return state;
  }
}
