import React, { memo } from 'react';
import UserProfile from '../../User/Profile';

const Profile = memo(() =>
    <>
        <div className="h-[100vh] p-20">
            <UserProfile />
        </div>
    </>)
export default Profile;