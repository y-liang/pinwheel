const mockAuthAPICall = {
   isAuthenticated: false,
   signin(callback) {
      mockAuthAPICall.isAuthenticated = true;
      // setTimeout(callback, 100); //  async
      return new Promise((resolve) => {
         setTimeout(() => resolve('0987654321'), 300);
      });
   },
   signout(callback) {
      mockAuthAPICall.isAuthenticated = false;
      // setTimeout(callback, 100);
      new Promise((resolve) => {
         setTimeout(() => resolve(true), 300);
      });
   },
};

export { mockAuthAPICall };

