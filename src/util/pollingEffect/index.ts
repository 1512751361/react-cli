import { ModelEffectsFunction, ModelEffects } from '@src/redux/typings';

export default function pollingEffect<Payload>(
  callback: ModelEffectsFunction<Payload>
): ModelEffects<Payload> {
  return [
    function* (_, effect) {
      const { delay, take, race, fork, cancel } = effect;
      const doWatch: ModelEffectsFunction<Payload> = function* (action) {
        while (true) {
          if (callback) {
            yield callback(action, effect);
          }
          yield delay(1000 * 5);
        }
      };
      let cancelTask: any = null;
      while (true) {
        const { watch } = yield race({
          watch: take('watch'),
          unwatch: take('unwatch')
        });
        if (cancelTask) {
          yield cancel(cancelTask);
        }
        if (watch) {
          cancelTask = yield fork(doWatch, watch.payload);
        }
      }
    },
    {
      type: 'watcher'
    }
  ];
}
