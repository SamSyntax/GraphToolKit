import { graphConfig } from "./authConfig";
/** 

    @param accessToken

*/

export async function callMsGraph(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };
  try {
    const response = await fetch(graphConfig.graphMeEndpoint, options);
    const data = await response.json();

    const pictureResponse = await fetch(
      `${graphConfig.graphMeEndpoint}/photo/$value`,
      {
        headers: {
          Authorization: bearer,
        },
      }
    );

    if (pictureResponse.ok) {
      const blob = await pictureResponse.blob();
      const imageUrl = URL.createObjectURL(blob);
      data.profilePictureUrl = imageUrl;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
}
