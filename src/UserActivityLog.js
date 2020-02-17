module.exports = (conn, UserActivityLogSchema) => conn.model(
  'UserActivityLog',
  UserActivityLogSchema,
);
