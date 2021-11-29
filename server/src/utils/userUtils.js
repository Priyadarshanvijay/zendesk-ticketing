// Mapping user data like this makes it easier to access the required data
// when a users id is present rather than traversing through the whole array
// finding the id, and then using the data related to it.
const mapUserData = (users = []) => users.reduce((prevUsers, { id, name, email, photo }) => ({
  ...prevUsers,
  [id]: {
    id,
    name,
    email,
    profilePhoto: photo?.content_url
  }
}), Object.create(null));

// Appends the mapped user data to tickets Response body
const appendUserInfo = (ticketsBody) => {
  const { users } = ticketsBody;
  return { ...ticketsBody, users: mapUserData(users) };
};

export default {
  mapUserData,
  appendUserInfo
} 