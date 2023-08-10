

export const listen_port = (() => {
  if (process.env.NODE_ENV === "local") {
    return 18652;
  };
  return 28652;
})();