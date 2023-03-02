async function routeProtection(req, res, next) {
    if (!res.locals.isLogin) {
        return res.redirect("/auth/login");
    }

    next();
}

async function routeAdminProtection(req, res, next) {
    if (!res.locals.isLogin) {
        console.log("Not login");
        return res.redirect("/auth/login");
    }

    if (!res.locals.user.isAdmin) {
        console.log("Not admin");
        return res.redirect("/auth/login");
    }

    next();
}

async function routeUnAuthProtection(req, res, next) {
    if (res.locals.isLogin) {
        return res.redirect("/");
    }

    next();
}

module.exports = { routeProtection, routeAdminProtection, routeUnAuthProtection };
