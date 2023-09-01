// factory design pattern
// it returns a middleware function
export default (controller) => (async (req, res, next) => {
    try {
        await controller(req, res, next);
    }
    catch (err) {
        next(err);
    }
});
