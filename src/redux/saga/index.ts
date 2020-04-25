import { importDynamicSagas } from './dynamic-loader';

export { default as makeSagaCreator } from './creator';

export default importDynamicSagas();
