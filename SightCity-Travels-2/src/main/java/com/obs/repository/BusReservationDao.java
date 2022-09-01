package com.obs.repository;

import java.time.LocalDate;
import java.util.List;

import com.obs.entity.Admin;
import com.obs.entity.Bus;
import com.obs.entity.Feedback;
import com.obs.entity.Passenger;
import com.obs.entity.Ticket;
import com.obs.entity.User;

public interface BusReservationDao{

	public User registerOrUpdateUser(User user); //1

	public Bus addBus(Bus bus); //2

	public int updateBus(int busId, String source, String destination, double fare);
	
	public boolean loginUser(int userId, String password); //3

//	public Passenger addOrUpdatePassenger(Passenger passenger);

	public boolean changePassword(int userId, String password); //4
	
	public User forgotPassword(int userId, String email); //4


	public Ticket bookATicket(Ticket ticket); //5

	public List<Bus> searchBus(String source, String destination); //6

	public Bus chooseBus(int busId); //7
	
	public List<String> fetchBookedSeats(LocalDate travelDate, int busId); //8
	
	public List<Object[]> frequentlyTravelledRoute(); //9
	
	public List<Bus> viewAllBuses(); //10
	
	public List<User> viewAllRegsiteredCustomers(); //11
	
	public List<User> viewCustomerWhoRegisteredButwithNoBooking(); //12
	
	
	public User rechargeWallet(int userId,int rechargeAmount); //13
	
	public Ticket ticketDetails(int ticketId); //14
	
	public boolean payThroughWallet(int userId, double amount); //15
	
	public List<Integer> mostPreferredBus(); //16
	
	 public List<Ticket> bookingsBasedOnPeriod(int busId, LocalDate travelDate);
	
	public boolean cancelTicket(int ticketId); //17
	
	public List<Ticket> viewTicketBookedByUserId(int userId); //18
	
	public User findUser(int userId);
	
	public Boolean loginAdmin(int adminId, String password);
	
	public Boolean isCustomerPresent(String email);
	
	public List<Passenger> getPassenger(int ticketId);
	
	public Bus getBus(int ticketId);
	
	public Ticket setTicketForUser(Ticket ticket);
	
	public Ticket rescheduleTicket(int ticketId, LocalDate travelDate, List<String> seats);

	public User createUser();

	public void createAdmin();

	public void deleteBus(Integer id);

	public User getIdByMail(String email);

	public List<Ticket> getProfitsPerMonth();

	public void userFeedback(Feedback f);

	public Ticket getTicketById(int ticketId);

	public boolean mailExists(String mailId);
	
}
