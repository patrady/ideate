export abstract class Model {
  public abstract id: number;

  public is(id: number | string) {
    return this.id === id;
  }

  public static getIdFromQuery(query: string | string[] | undefined): number {
    if (!this.isValidId(query)) {
      return -1;
    }

    return parseInt(query as string, 10);
  }

  public static isValidId(id: string | string[] | undefined) {
    if (id === undefined || Array.isArray(id)) {
      return false;
    }

    return !isNaN(parseInt(id));
  }

  public static getSlugFromQuery(query: string | string[] | undefined): string {
    if (!this.isValidSlug(query)) {
      return "";
    }

    return query!.toString();
  }

  public static isValidSlug(slug: string | string[] | undefined) {
    if (slug === undefined || Array.isArray(slug)) {
      return false;
    }

    return true;
  }
}
