export const asyncHandler = (reqHandler) => {
  return async (req, res, next) => {
    try {
      await reqHandler(req, res, next);
    } catch (err) {
      res.status(err.code || 500).json({
        success: false,
        message: `${err},asynchandler problem`,
      });
    }
  };
};
