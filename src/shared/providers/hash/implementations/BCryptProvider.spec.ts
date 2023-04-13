/* eslint-disable no-unused-expressions */
import { IHashProvider } from '../IHashProvider';
import { BCryptProvider } from './BCryptProvider';

describe('BCryptProvider', () => {
  let hashProvider: IHashProvider;

  beforeEach(() => {
    hashProvider = new BCryptProvider();
  });

  it('should be able to hash a value', async () => {
    const value = 'Teste123';

    const hasedValue = await hashProvider.hash(value);

    expect(hasedValue).not.toThrow;
  });

  it('should be able to compare a hashed value', async () => {
    const value = 'Teste123';

    const hasedValue = await hashProvider.hash(value);
    const isValid = await hashProvider.compare(value, hasedValue);

    expect(isValid).toEqual(true);
  });
});
