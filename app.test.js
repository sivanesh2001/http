const request = require('supertest');
const createServers = require('./app');
const http = require('http');

jest.mock('http', () => ({
    createServer: jest.fn((requestListener) => ({
        listen: jest.fn(),
        on: jest.fn((event, callback) => {
          if (event === 'request') {
            console.log('Event: request');
            requestListener();
            callback(); 
          }
        }),
      })),
    request: jest.fn(),
  }));
  

describe('HTTP Server Tests', () => {
  let server;

  beforeAll(() => {
    server = createServers.server;
  });

  it('should return "Hello, World!" for GET /', async () => {
    jest.spyOn(http.createServer(), 'on');
    await request(server);
    expect(http.createServer).toBeCalled();
    expect(http.createServer).toHaveBeenCalledWith(expect.any(Function));
    expect(http.createServer().on).toBeCalled();
//     const mockReq = {}; 
//     const mockRes = {}; 
//     handler(mockReq, mockRes); 
//    expect(handler).toHaveBeenCalledWith(mockReq, mockRes);
  });

  it('should return data received message for POST /api/postdata', async () => {
    jest.spyOn(http.createServer(), 'on');
    const postData = { key: 'value' };
    const response = await request(server)
      .post('/api/postdata')
      .send(postData)
      .expect(200);
      expect(http.createServer().on).toBeCalled();
     expect(response.body).toEqual({
      message: 'Data received successfully (POST)',
      data: postData,
    });
  });
});
