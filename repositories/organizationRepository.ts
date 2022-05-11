import { Organization } from "../models";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../db";

export class OrganizationRepository {
  public static contains(slug: string) {
    return this.find(slug) !== undefined;
  }

  public static async find(slug: string): Promise<Organization | undefined> {
    return (await this.all()).find((organization) => organization.is(slug));
  }

  public static async all(): Promise<Organization[]> {
    const organizations = await getDocs(collection(database, "organizations"));

    return organizations.docs.map((o) => Organization.for(o));
  }
}
