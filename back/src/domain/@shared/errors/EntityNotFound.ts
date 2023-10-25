export default class EntityNotFound extends Error {
  constructor(message: string) {
    super(message);
  }
}
