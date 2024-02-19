export const asyncHandler = (reqHandler) => {
  return async (req, res, next) => {
    try {
      await reqHandler(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(err.statuscode || 500).json({
        success: false,
        message: `${err},asynchandler problem`,
      });
    }
  };
};
