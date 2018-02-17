/**
 * Class represents custom error for Bad Request
 * @param {string | null} [message = null] - error message
 */
export default class ErrorBadRequest extends Error {
  /**
   * Create ErrorBadRequest
   * @param {string | null} [message = null] - error message
   */
  constructor(message = null) {
    super(message);
    this.name = 'Bad Request';
    this.statusText = 'Bad Request';
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorBadRequest);
    } else {
      this.stack = new Error().stack;
    }
  }
}