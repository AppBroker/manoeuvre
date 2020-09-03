import test from 'ava';
import manoeuvre from './src';

test('main', t => {
	t.throws(() => {
		manoeuvre(123);
	}, {
		instanceOf: TypeError,
		message: 'Expected a string, got number'
	});

	t.is(manoeuvre('unicorns'), 'unicorns & rainbows');
});
