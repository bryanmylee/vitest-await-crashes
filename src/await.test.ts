import {expect, it} from 'vitest';
import {renderServerTemplate} from './renderServerTemplate';

it('passes with promise callback', async () => {
	renderServerTemplate('Vite').then((rendered) => {
    expect(rendered).toContain('Vite');
	});
});

it('fails with await', async () => {
	const rendered = await renderServerTemplate('Vite');
  expect(rendered).toContain('Vite');
});