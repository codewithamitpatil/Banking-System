
// to avoid using try and catch
// or simpliy exception handling

const asyncHandler = fn => (req,res,next)=>
    Promise.resolve(fn(req,res,next)).catch(next);

module.exports = asyncHandler;