module.exports = () =>  {
  const rewrites = () => {
    return [
      {
        source: "/",
        destination: "https://shop-products-o20x2vsou-smithaeregowda.vercel.app/",
      },
    ];
  };
  return {
    env: {
      SERVER: process.env.SERVER,
    },
    rewrites,
  };
}
