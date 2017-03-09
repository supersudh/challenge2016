/**
  * Created by Zhengfeng Yao on 16/8/24.
  */
import 'whatwg-fetch';

export default self.fetch.bind(self);
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;
