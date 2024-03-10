module.exports.aboutUs = (req, res, next) => {
    res.render('info/about-us', { title: 'About Us' })
}

module.exports.help = (req, res, next) => {
    res.render('info/help', { title: 'Irontickets Help Center' })
}