const catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(err);
    }
}

module.exports = catchAsync; 