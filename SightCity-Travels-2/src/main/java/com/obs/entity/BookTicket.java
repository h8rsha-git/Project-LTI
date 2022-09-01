package com.obs.entity;

import java.util.List;

public class BookTicket {

	Ticket ticket;
	List<Passenger> passengers;
	
	
	public Ticket getTicket() {
		return ticket;
	}
	
	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}
	
	public List<Passenger> getPassengers() {
		return passengers;
	}
	
	public void setPassengers(List<Passenger> passengers) {
		this.passengers = passengers;
	}
	
	
}
