import React from 'react';
import '../../assets/css/profile.css';

const ChangePassword = () => {
  return (
    <div className="tab-pane fade" id="account-change-password">
      <div className="card-body pb-2">
        <div className="form-group">
          <label className="form-label">Current password</label>
          <input type="password" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">New password</label>
          <input type="password" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">Repeat new password</label>
          <input type="password" className="form-control" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
