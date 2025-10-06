import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.models';

export const selectAuthFeature =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectUser = createSelector(
  selectAuthFeature,
  (state) => state.user
);
export const selectLoading = createSelector(
  selectAuthFeature,
  (state) => state.loading
);
export const selectError = createSelector(
  selectAuthFeature,
  (state) => state.error
);
