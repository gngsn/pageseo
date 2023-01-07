module.exports = { 
    secretKey: 'SeCrEtKeY4HaShInG!',
    options : {
        algorithm: 'HS256',
        expiresIn: '2h',
        issuer: 'our-sopt'
    },
    refreshOptions : {
        algorithm: 'HS256',
        expiresIn: '14d',
        issuer: 'our-sopt'
    }
}