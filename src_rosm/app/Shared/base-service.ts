//leaving here for now as I"m sure we will need this/or something like it later.

// /**
//  * Created by dhaslem on 12/21/2016.
//  */

// export abstract class BaseService {
//   /**
//    * Handles a standard network error
//    * @param error
//    * @returns {Promise<never>}
//    */
//   protected handleError(error: any): Promise<any> {
//     return Promise.reject(error.message || error);
//   }


//   /**
//    * Parses the specified validation summary and, if valid, returns the validated object id;
//    * otherwise, returns the results
//    * @param vs
//    */
//   protected handleValidationSummary(vs: IValidationSummaryDTO): Promise<string> {
//     if (vs.valid) {
//       return Promise.resolve(vs.validatedObjectId);
//     }
//     if (vs.valid === false) {
//       return Promise.reject(vs.results);
//     }
//   }
// }
