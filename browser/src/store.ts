import { init, RematchRootState } from '@rematch/core'
import * as models from './models'

export const store = init({
    models,
});
