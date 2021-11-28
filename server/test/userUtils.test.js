import chai from 'chai';
import UserUtils from '../src/utils/userUtils.js';
import ZendeskMockData from './mocks/zendesk.js';

const { expect } = chai;

describe('UserUtils', function() {
  describe('mapUserData', function() {
    const inputArray = ZendeskMockData.userArray;
    const expectedOutput = {
      1523620342702: {
        id: 1523620342702,
        name: 'Priyadarshan Vijay',
        email: 'priyadarshan@nyu.edu',
        profilePhoto: 'https://zccpriyadarshan.zendesk.com/system/photos/1501082840842/profile_image_1523713516041_11710571.png'
      }
    };
    const actualOutput = UserUtils.mapUserData(inputArray);
    it('should return user object', () => {
      expect(actualOutput).to.eql(expectedOutput);
    });
    it('should return empty object', () => {
      expect({}).to.eql(UserUtils.mapUserData([]));
    });
  });
  describe('appendUserInfo', function() {
    const input = {
      ticketData1: 'something1',
      ticketData2: 'something2',
      ticketData3: 'something3',
      users: ZendeskMockData.userArray
    };
    const expectedOutput = {
      ticketData1: 'something1',
      ticketData2: 'something2',
      ticketData3: 'something3',
      users: {
        1523620342702: {
          id: 1523620342702,
          name: 'Priyadarshan Vijay',
          email: 'priyadarshan@nyu.edu',
          profilePhoto: 'https://zccpriyadarshan.zendesk.com/system/photos/1501082840842/profile_image_1523713516041_11710571.png'
        }
      }
    };
    const actualOutput = UserUtils.appendUserInfo(input);
    it('should append user info with object that has user id as keys', () => {
      expect(actualOutput).to.eql(expectedOutput);
    });
  });
});
