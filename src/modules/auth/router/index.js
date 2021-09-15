export default {
  name: "auth",
  component: () =>
    import(
      /* webpackChunkName: "auth-layout" */ "@/modules/auth/layouts/AuthLayout"
    ),
  children: [
    {
      path: "",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/modules/auth/views/Login"),
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(
          /* webpackChunkName: "register" */ "@/modules/auth/views/Register"
        ),
    },
  ],
}
