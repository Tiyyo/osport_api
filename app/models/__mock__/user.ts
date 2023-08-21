const mockUsers = [
  { id: 1, username: 'John', email: 'john.doe@example.com' },
  { id: 2, username: 'Jane', email: 'jane.doe@example.com' },
];

const create = async (data) => true;

const findOne = async (data) => {
  function condition(entity: any) {
    return entity.email === data.emailOrUsername
			|| entity.username === data.emailOrUsername;
  }
  const isUser = mockUsers.find((user) => condition(user));
  return isUser;
};
