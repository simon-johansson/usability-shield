
export default (req, res, next) => {
  const {customText} = req.params;
  res.redirect(`https://img.shields.io/badge/${customText}-FF41A2.svg`);
};
