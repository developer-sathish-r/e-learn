import React from "react";
import { ReactComponent as Email } from "../../../Assets/SVGs/Icons/email.svg";
import { ReactComponent as LinkedIn } from "../../../Assets/SVGs/Icons/linkedin.svg";

function ProfileCard({ user }) {
    // console.log('user: ', user);

    return (
        <div >
            <div className="flex flex-col items-center text-center">
                {/* Profile image or fallback */}
                {user?.profile_image?.uploaded_file ? (
                    <img
                        className="relative h-40 w-40 rounded-full"
                        src={user.profile_image.uploaded_file}
                        alt="profile_image"
                    />
                ) : (
                    <div className="bg-purple-500 text-white w-40 h-40 flex items-center justify-center rounded-full">
                        <span className="text-5xl font-semibold">{user?.name?.charAt(0)}</span>
                    </div>
                )}

                <h2 className="text-xl font-bold mt-4">{user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1) || "---"}</h2>

                {/* Social media icons */}
                <div className="my-3 flex flex-wrap gap-4 justify-center items-center">
                    {user?.email && <a href={`mailto:${user.email}`}><Email width={30} height={30} /></a>}
                    {user?.linkedin && <a href={user.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn width={35} height={35} /></a>}
                </div>
            </div>

            {/* User details */}
            {/* <div className="mt-6">
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-600 mt-2">{user?.phone_number || "---"}</p>
            </div> */}

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Batch</h3>
                <p className="text-gray-600 mt-2">Sep-2024</p>
            </div>


            <div className="mt-6">
                <h3 className="text-lg font-semibold">User From</h3>
                <p className="text-gray-600 mt-2">
                    {user?.profile_image?.createdAt ? new Date(user.profile_image.createdAt).toLocaleDateString('en-GB') : "---"}
                </p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Created By</h3>
                <p className="text-gray-600 mt-2">{user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1) || "09-01-2025"}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Branch</h3>
                <p className="text-gray-600 mt-2">Coimbatore</p>
            </div>
        </div>
    );
}

export default ProfileCard;
