const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("Viewing Home") },
    { path: "/posts", view: () => console.log("Viewing Posts") },
    { path: "/setting", view: () => console.log("Viewing Settings") },
  ];
  //   const pageMatches = routes.map((route) => {
  //     return {
  //       route, // route: route
  //       isMatch: route.path === location.pathname,
  //     };
  //   });
  //   console.log(pageMatches());
};

// router();
