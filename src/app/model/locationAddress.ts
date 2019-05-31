export class LocationAddress {
public  LocationId:number;
  public formattedAddress: string;

  public latitude: number=18.5782813;//temp

  public longitude: number=73.6861474;//temp

  public getFormattedAddress(): string {

    return this.formattedAddress;
  }

  public getLatitude(): number {

    return this.latitude;
  }
  public getLongitude(): number {

    return this.longitude;
  }

  public setFormattedAddress(formattedAddress: string): void {

    this.formattedAddress = formattedAddress;
  }

  public setLatitude(Latitude: number): void {

    this.latitude = Latitude;
  }
  public setLongitude(Longitude: number): void {

    this.longitude = Longitude;
  }


}
