declare module 'humanoid-js' {
  class Humanoid {
    constructor(autoBypass?: boolean, maxRetries?: number);
    rotateUA(): void;
    clearCookies(): void;
    _buildAnswerObject(values: [string, string, string]): {
      jschl_vc: string;
      pass: string;
      jschl_answer: string;
    };
    get(url: string, queryString?: any, headers?: any): Promise<any>;
    post(
      url: string,
      postBody?: any,
      headers?: any,
      dataType?: any,
    ): Promise<any>;
    sendRequest(
      url: string,
      method?: string,
      data?: any,
      headers?: any,
      dataType?: any,
    ): Promise<any>;
    bypassJSChallenge(response: any): Promise<any>;
  }

  export = Humanoid;
}
