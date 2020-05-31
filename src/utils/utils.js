/**
 * dispatch
 * @param {*} type
 */
export const createAction = type => payload => ({ type, payload });