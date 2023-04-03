import axios from 'axios';

const getAvatar = async (url: string): Promise<string> => {
  const blobAvatar = await axios.get(url, { responseType: 'blob' });
  const avatar = URL.createObjectURL(blobAvatar.data);

  return avatar;
};

export default getAvatar;
