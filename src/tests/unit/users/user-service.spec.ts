import UserService from '../../../services/user-service';
import User from '../../../models/user';
import bcrypt, { hash } from 'bcryptjs';
import { successResponse } from '../../../utils/response-utils';

jest.mock('bcryptjs');
jest.mock('../../../models/user');

describe('UserService', () => {
  let userService: UserService;
  beforeEach(() => {
    userService = new UserService();
  });

  it('should be create a new user with hashed password', async () => {
    const userMock = {
      name: 'teste mock',
      email: 'testemock@gmail.com',
      password: '123456',
      role: 'GUEST',
    };
    const hashedPassword = 'hashedPassword123';
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (User.create as jest.Mock).mockResolvedValue({
      id: 1,
      ...userMock,
      password: hashedPassword,
    });
    const response = await userService.createUser(userMock);
    expect(bcrypt.hash).toHaveBeenCalledWith(userMock.password, 10);
    expect(User.create).toHaveBeenCalledWith({
      name: userMock.name,
      email: userMock.email,
      password: hashedPassword,
      role: userMock.role,
    });
    expect(response).toEqual({
      message: {
        id: 1,
        name: userMock.name,
        email: userMock.email,
        password: hashedPassword,
        role: userMock.role,
      },
      status: 201,
    });
  });

  it('should be get all users', async () => {
    const usersMock = [
      { id: 1, name: 'user1', email: 'email1@teste.com', role: 'GUEST' },
      { id: 2, name: 'user2', email: 'email2@teste.com', role: 'ADMIN' },
      { id: 3, name: 'user3', email: 'email3@teste.com', role: 'GUEST' },
    ];
    (User.findAll as jest.Mock).mockResolvedValue(usersMock);

    const response = await userService.getAllUsers();

    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      message: usersMock,
    });
  });

  it('should be get user by id', async () => {
    const userIdMock = '1';
    const userMock = {
      id: 1,
      name: 'teste',
      email: 'teste@teste.com',
      role: 'GUEST',
    };
    (User.findByPk as jest.Mock).mockResolvedValue(userMock);
    const response = await userService.getUserById(userIdMock);

    expect(User.findByPk).toHaveBeenCalledWith(userIdMock, {
      attributes: ['id', 'name', 'email', 'role'],
    });
    expect(User.findByPk).toHaveBeenCalledTimes(1);

    expect(response).toEqual({
      status: 200,
      message: userMock,
    });
  });

  it('should be return error when user not found', async () => {
    const userIdMock = '13';
    (User.findByPk as jest.Mock).mockResolvedValue(null);
    const response = await userService.getUserById(userIdMock);
    expect(User.findByPk).toHaveBeenCalledWith(userIdMock, {
      attributes: ['id', 'name', 'email', 'role'],
    });
    expect(User.findByPk).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      message: { message: 'Usuário não encontrado' },
      status: 404,
    });
  });
});
