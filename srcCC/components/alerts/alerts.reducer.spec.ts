// /* tslint:disable:no-unused-variable */

// import { AlertType, Alert } from "./alert.class";
// import { alertsReducer } from "./alerts.reducer";
// import { AlertsActions } from "./alerts.actions";
// import "rxjs/add/operator/toPromise";

// describe("Alerts: Reducer", () => {

//   it("should successfully receive an alert attached to the payload of another, non-alert action type", () => {

//     const prevState = [];
//     const expectedState = [new Alert("1", AlertType.info, "some meaningful message")];

//     const action = {
//       type: "DOES NOT MATTER",
//       payload: {
//         foo: "does not matter",
//         alert: new Alert("1", AlertType.info, "some meaningful message")
//       }
//     };

//     const actualState = alertsReducer(prevState, action);

//     expect(actualState).toEqual(expectedState);
//   });

//   it("should successfully receive a regular alert (i.e., not attached to a payload of another action type", () => {

//     const prevState = [];
//     const expectedState = [new Alert("1", AlertType.info, "some meaningful message")];

//     const action = {
//       type: AlertsActions.ALERTS_CREATE,
//       payload: {
//         alert: new Alert("1", AlertType.info, "some meaningful message")
//       }
//     };

//     const actualState = alertsReducer(prevState, action);

//     expect(actualState).toEqual(expectedState);
//   });

//   it("should remove previous alerts with the same id", () => {

//     const prevState = [new Alert("1", AlertType.info, "some meaningful message")];
//     const expectedState = [new Alert("1", AlertType.info, "another alert with the same id")];

//     const action = {
//       type: "DOES NOT MATTER",
//       payload: {
//         alert: new Alert("1", AlertType.info, "another alert with the same id")
//       }
//     };

//     const actualState = alertsReducer(prevState, action);

//     expect(actualState).toEqual(expectedState);
//   });

//   it("should remove an alert with a specified id", () => {

//     const prevState = [
//       new Alert("1", AlertType.info, "some meaningful message"),
//       new Alert("2", AlertType.info, "another alert")
//     ];
//     const expectedState = [new Alert("1", AlertType.info, "some meaningful message")];

//     const action = {
//       type: AlertsActions.ALERTS_REMOVE,
//       payload: {
//         alertId: "2"
//       }
//     };

//     const actualState = alertsReducer(prevState, action);

//     expect(actualState).toEqual(expectedState);
//   });

// });
