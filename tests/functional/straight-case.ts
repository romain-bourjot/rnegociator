import test from 'tape';

import { createNegociator } from '../../src/index';

const versions = {
  '4.250.0': 'V 4_250_0',
  '3.1.1': 'V_3_1_1',
  '3.0.0': 'V_3_0_0',
  '3.1.3': 'V_3_1_3',
  'v1.1.0': 'V_1_1_0',
  '4.50.0': 'V_4_50_0',
};
const defaultVersion = 'DEFAULT_VERSION';

const negociator = createNegociator(versions, defaultVersion);

test('CAT0_functional/straight-case | Should return default when requested version is too low', (t) => {
  t.plan(1);

  const result = negociator('0.0.0');

  t.equal(result, 'DEFAULT_VERSION');
});

test('CAT0_functional/straight-case | Should return the right exact version', (t) => {
  t.plan(1);

  const result = negociator('3.1.1');

  t.equal(result, 'V_3_1_1');
});

test('CAT0_functional/straight-case | Should return the highest inferior version', (t) => {
  t.plan(1);

  const result = negociator('4.200.1');

  t.equal(result, 'V_4_50_0');
});

test('CAT0_functional/straight-case | Should ignore leading "v" in definition', (t) => {
  t.plan(1);

  const result = negociator('1.1.0');

  t.equal(result, 'V_1_1_0');
});

test('CAT0_functional/straight-case | Should ignore leading "v" in request', (t) => {
  t.plan(1);

  const result = negociator('v3.1.4');

  t.equal(result, 'V_3_1_3');
});