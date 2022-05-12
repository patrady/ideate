import { Organization } from "../models";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "../db";

export class OrganizationRepository {
  public static contains(id: string) {
    return this.find(id) !== undefined;
  }

  public static async find(id: string): Promise<Organization | undefined> {
    const organization = await getDoc(doc(database, "organizations", id));
    if (!organization.exists()) {
      return undefined;
    }

    return Organization.for(organization);
  }

  public static async all(): Promise<Organization[]> {
    const organizations = await getDocs(collection(database, "organizations"));

    return organizations.docs.map((o) => Organization.for(o));
  }
}
