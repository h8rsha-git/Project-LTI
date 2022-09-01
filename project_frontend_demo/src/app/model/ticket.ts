import { Status } from "../status";

export class Ticket{
    ticketId!:number;
	travelDate!:String;	
	email!:String;	
    totalAmount!:number;
    status!:Status;
	noOfPassengers!:number;

}