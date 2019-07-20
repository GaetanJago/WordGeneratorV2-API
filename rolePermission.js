const allPermissions = [
    'read:messages',
    'insert:language',
    'update:language',
    'delete:language'
]

const adminPermissions = [
    'read:messages',
    'insert:language',
    'update:language',
    'delete:language'
]

const permissions = {
    'all': allPermissions,
    'admin': adminPermissions
}

module.exports = function (user, requested){
    const roleUser = user["https://wordgeneratorv2/role"];
    return permissions[roleUser].includes(requested);
}