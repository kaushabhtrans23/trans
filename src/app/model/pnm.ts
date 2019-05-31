import { LocationAddress } from "./locationAddress";
import { Items } from "../pnc/pnc.component";

export class Pnm{
  public withinCity:boolean
  public betweenCity:boolean
  public inspection:boolean
  public movingFrom:LocationAddress;
  public fromFloorNo:number;
  public fromServiceLift:boolean;
  public movingTo:LocationAddress;
  public toFloorNo:number;
  public toServiceLift:boolean;
  public type:string;
  public items:Items[];
  public date:string;
}