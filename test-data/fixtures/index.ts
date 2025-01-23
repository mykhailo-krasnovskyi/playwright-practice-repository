import { mergeTests } from '@playwright/test';
import { test as dbTest } from './fixtureBase';
import { test as a11yTest } from './fixtureScreenSizes';

export const test = mergeTests(dbTest, a11yTest);