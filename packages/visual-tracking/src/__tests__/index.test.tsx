import { NativeModules } from 'react-native';

const nativeMock = {
  handle: jest.fn(),
  view: jest.fn(),
};
NativeModules.RNKRTVisualTrackingModule = nativeMock;
const { VisualTracking } = require('../index');

test('VisualTracking test', () => {
  VisualTracking.handle('action', 'actionId', 'targetText');
  expect(nativeMock.handle).toBeCalled();
  VisualTracking.view('actino');
  expect(nativeMock.view).toBeCalled();
});
