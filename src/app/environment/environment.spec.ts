import { environment as productionEnvironment } from './environment';
import { environment as developmentEnvironment } from './environment.development';

describe('environment configuration', () => {
  it('uses a same-origin API path in production', () => {
    expect(productionEnvironment.production).toBeTrue();
    expect(productionEnvironment.apiUrl).toBe('/api');
  });

  it('keeps development requests on the same-origin proxy', () => {
    expect(developmentEnvironment.production).toBeFalse();
    expect(developmentEnvironment.apiUrl).toBe('/api');
  });
});
