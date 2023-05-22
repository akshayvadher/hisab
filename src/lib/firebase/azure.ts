export const lookupMsAzureProfilePhoto = async (accessToken: string) => {
  const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'image/jpg',
    },
  });
  return response.blob();
};

