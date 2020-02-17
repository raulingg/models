module.exports = (conn) => {
  const UserActivityLogSchema = new conn.Schema({
    uid: {
      type: conn.Schema.Types.String,
      required: true,
      index: true,
    },
    timestamp: {
      type: conn.Schema.Types.Date,
      required: true,
      default: Date.now,
      index: true,
    },
    activity: {
      type: conn.Schema.Types.String,
      enum: [
        'USER_ACTIVITY_LOG_IN',
        'USER_ACTIVITY_REGISTER',
        'USER_ACTIVITY_DEFAULT_LOG',
      ],
      default: 'USER_ACTIVITY_DEFAULT_LOG',
    },
  });
  UserActivityLogSchema.index({ uid: 1, activity: 1 });

  return UserActivityLogSchema;
};
