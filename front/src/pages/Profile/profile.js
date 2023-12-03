// Profile.jsx

import React from 'react';
import GeneralSettings from './GeneralSettings';
import ChangePassword from './ChangePassword';
import AccountInfo from './AccountInfo';
import SocialLinks from './SocialLinks';
import '../../assets/css/profile.css';


const Profile = () => {
    return (
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="/home">Home</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Info</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <GeneralSettings />
                <ChangePassword />
                <AccountInfo />
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
        <div className="text-right mt-3">
          <button type="button" className="btn btn-primary">Save changes</button>&nbsp;
          <button type="button" className="btn btn-default">Cancel</button>
        </div>
      </div>
    );
  };

export default Profile;
