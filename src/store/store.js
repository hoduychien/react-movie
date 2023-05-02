import { configureStore } from '@reduxjs/toolkit';

import homeSlice from './homeSilce';

export const store = configureStore({
    reducer: {
        home: homeSlice,
    },
});
