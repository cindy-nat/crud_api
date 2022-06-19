import { getUsers } from '../controllers/userController';
import type {IncomingMessage, ServerResponse} from "http";

describe('Get all users request', () => {
  let mockRequest: Partial<IncomingMessage>;
  let mockResponse: Partial<ServerResponse>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      statusCode: 0,
      end: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  test('200- users', () => {
    const expectedStatusCode = 200;
    const expectedResponse: any[] = [] ;
    getUsers(mockRequest as IncomingMessage, mockResponse as ServerResponse);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  });
});
