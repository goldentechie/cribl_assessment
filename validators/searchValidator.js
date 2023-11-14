const searchValidator = (req, res, next)=>{
  if (req.query.filename == undefined || isNaN(parseInt(req.query.count)) || parseInt(req.query.count) < 0) res.send({message:"invalid query"});
  else next();
}

module.exports = searchValidator;