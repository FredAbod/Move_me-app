const Admin = require('../models/admin.models');


exports.adminService = {
    find: () => User.find({}),
  
    findAdminByEmail: (id) => Admin.findOne(id),
  
    signUp: async (data) => {
      const admin = new Admin({ ...data });
      await admin.save();
      if (!admin) {
        return res.status(400).json({
          message: 'Admin not found',
        });
      }
      return admin;
    },
  
  };