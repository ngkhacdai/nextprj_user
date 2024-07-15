const useRouter = jest.spyOn(require("next/router"), "useRouter");

module.exports = {
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    query: {},
  }),
};
