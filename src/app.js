/**
 * Created by Zhengfeng Yao on 16/8/27.
 */
import React from 'react';
import cc from './common.less';

export default function App({children}) {
  return (
    <div className={cc.main}>
      {
        children
      }
    </div>
  );
}
