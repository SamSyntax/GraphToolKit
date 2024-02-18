import React, { useEffect, useState } from "react";
import "../app/styles/ProfileData.css";
import { Image } from "next/image";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const ProfileData = ({ graphData }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch data from local storage when component mounts
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      setDataLoaded(true);
    }
  }, []);

  return (
    <div id="profile-div">
      {dataLoaded ? (
        <>
          <p>
            <strong>First Name: </strong> {graphData.givenName}
          </p>
          <p>
            <strong>Last Name: </strong> {graphData.surname}
          </p>
          <p>
            <strong>Email: </strong> {graphData.userPrincipalName}
          </p>
          <p>
            <strong>Id: </strong> {graphData.id}
          </p>
          {/* Render the profile picture if available */}
          {graphData.profilePictureUrl && (
            <Image
              className="picture"
              src={graphData.profilePictureUrl}
              alt="Profile"
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
