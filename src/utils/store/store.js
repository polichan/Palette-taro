import models from "../../models";
import dva from "./dva";
import { createAction } from "../utils";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    console.log("dva error", e);
    dispatch(createAction("sys/error")(e));
  }
});
const store = dvaApp.getStore();

export default store;
