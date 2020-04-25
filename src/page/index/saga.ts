import { SagasBuildOptions } from '@/redux/typings';

const sagas: SagasBuildOptions<any> = {
  * login(...arg: object[]) {
    console.log(arg);
    yield 1;
  },
  * timeout({ payload, type }, { select, call }) {
    console.log(payload);
    yield 1;
  },
};

export default sagas;
