import { Passenger } from "../passenger";
import { Ticket } from "../model/ticket";

export class BookaTicketDto{
    ticket!:Ticket;
    passengers!:Passenger[];
}