const userRole = ['getUsers', 'getHabits', 'manageHabits'];
const adminRole = [...userRole, 'manageUsers'];

const allRoles = {
  user: userRole,
  admin: adminRole,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
