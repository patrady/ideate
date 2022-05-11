import { Organization } from "../models";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../db";

export class OrganizationRepository {
  public static contains(id: string) {
    return this.find(id) !== undefined;
  }

  public static async find(id: string): Promise<Organization | undefined> {
    return (await this.all()).find((organization) => organization.is(id));
  }

  public static async all(): Promise<Organization[]> {
    const organizations = await getDocs(collection(database, "organizations"));

    return organizations.docs.map((o) => Organization.for(o));
  }
}
