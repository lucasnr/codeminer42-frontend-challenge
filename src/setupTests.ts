// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import Adpater from 'enzyme-adapter-react-16';

import enableHooks from 'jest-react-hooks-shallow';

Enzyme.configure({ adapter: new Adpater() });

enableHooks(jest);
