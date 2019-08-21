export const hasRole = (role, user) => {
    return user.roles.indexOf(role) !== -1
}