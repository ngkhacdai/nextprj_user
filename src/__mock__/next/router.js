const useRouter = jest.fn();
useRouter.mockReturnValue({
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
});

module.exports = {
  useRouter,
};
