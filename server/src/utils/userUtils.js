const mapUserData = (users = []) => users.reduce((prevUsers, { id, name, email, photo }) => ({
  ...prevUsers,
  [id]: {
    id,
    name,
    email,
    profilePhoto: photo?.content_url
  }
}), Object.create(null));

const appendUserInfo = (ticketsBody) => {
  const { users } = ticketsBody;
  return { ...ticketsBody, users: mapUserData(users) };
};

export default {
  mapUserData,
  appendUserInfo
} 