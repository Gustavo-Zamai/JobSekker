export const catchAsyncError = (func) => {
    return (req, resp, next) => {
        Promise.resolve(func(req, resp, next)).catch(next);
    }
}