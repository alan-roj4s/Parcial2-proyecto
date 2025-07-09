export const requireAdminAuth = (req, res, next) => {
    if (!req.session.isAdmin){
        return res.redirect('/admin')
    }
    next();
}