export abstract class Model {
  public abstract id: string;

  public is(id: string) {
    return this.id === id;
  }

  public static getIdFromQuery(query: string | string[] | undefined): string {
    if (!this.isValidId(query)) {
      return "";
    }

    return query?.toString() || "";
  }

  public static isValidId(id: string | string[] | undefined) {
    if (id === undefined || Array.isArray(id)) {
      return false;
    }

    return id.trim().length > 0;
  }
}
