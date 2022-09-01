package com.obs.repository;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.obs.entity.Admin;
import com.obs.entity.Bus;
import com.obs.entity.Feedback;
import com.obs.entity.Passenger;
import com.obs.entity.Status;
import com.obs.entity.Ticket;
import com.obs.entity.User;

@Repository
public class BusReservationDaoImpl implements BusReservationDao {

	@PersistenceContext
	EntityManager em;

	@Transactional
	public User registerOrUpdateUser(User user) {
		
		User u = null;
		try {			
		MessageDigest md=MessageDigest.getInstance("MD5");
		md.reset();	
		byte[] b = md.digest(user.getPassword().getBytes());  
        // Convert byte array into signum representation
        BigInteger no = new BigInteger(1, b);
        // Convert message digest into hex value
        String hashtext = no.toString(16);
        while (hashtext.length() < 32) {
            hashtext = "0" + hashtext;
        }
        user.setPassword(hashtext);
        u=em.merge(user);
        
    } 

    // For specifying wrong message digest algorithms
    catch (NoSuchAlgorithmException e) {
        throw new RuntimeException(e);
    }
		
		return u;
		
		//User userPersisted = em.merge(user);
		//return userPersisted;
	}

	

	@Transactional
	public Bus addBus(Bus bus) {
		Bus busPersisted = em.merge(bus);
		return busPersisted;
	}
	
	@Transactional
	public void deleteBus(Integer id) {
		Bus toBeDeleted = em.find(Bus.class, id);
		em.remove(toBeDeleted);
	}

	@Transactional
	public boolean loginUser(int userId, String password) {
		User user=em.find(User.class,userId);
		System.out.println(user);
		if(user!=null) {
			try {
				MessageDigest md=MessageDigest.getInstance("MD5");
			md.reset();
				md.update(password.getBytes());
				
				byte[] digest = md.digest();
				  
		        BigInteger bigInt = new BigInteger(1, digest);

		        String hashtext = bigInt.toString(16);
		        
		        while (hashtext.length() < 32) {
		            hashtext = "0" + hashtext;
		        }
		        
		        if(user!=null && user.getPassword().equals(hashtext)) {
		        	return true;
		        }
			}
		catch (NoSuchAlgorithmException e) {
		        e.printStackTrace();
		    }
		}
		return false;
}
	
	@Transactional
	public boolean changePassword(int userId, String password) {
		
		String jpql = "select u from User u where u.userId=:id";
		TypedQuery<User> query = em.createQuery(jpql, User.class);
		query.setParameter("id", userId);
		//query.setParameter("pass", password);
		User user = query.getSingleResult();
		
		//User user=em.find(User.class,userId);
		// Error handling
		if(user == null) {
			return false;
		}
		
		User u = null;
		try {
			
		MessageDigest md=MessageDigest.getInstance("MD5");
		md.reset();
		
		byte[] b = md.digest(password.getBytes());
		  
	    BigInteger no = new BigInteger(1, b);

	    String hashtext = no.toString(16);
	    while (hashtext.length() < 32) {
	        hashtext = "0" + hashtext;
	    }
	    user.setPassword(hashtext);
	    u=em.merge(user);
	} 

	catch (NoSuchAlgorithmException e) {
	    throw new RuntimeException(e);
	}
		
		if(u!=null) {
			return true;
		}
		else
			return false;
		
	}

	@Transactional
	public Ticket bookATicket(Ticket ticket) { 
		Ticket persistedTicket = em.merge(ticket);
		return persistedTicket;
	}

	@Transactional
	public List<Bus> searchBus(String source, String destination) {
		String jpql = " select b from Bus b where b.source=:s and b.destination=:d";

		TypedQuery<Bus> query = em.createQuery(jpql, Bus.class);
		query.setParameter("s", source);
		query.setParameter("d", destination);
		List<Bus> bus = query.getResultList();
		return bus;
	}

	@Transactional
	public Bus chooseBus(int busId) {
		String jpql = "select b from Bus b where b.busId=:bid";
		TypedQuery<Bus> query = em.createQuery(jpql, Bus.class);
		query.setParameter("bid", busId);
		Bus bus = query.getSingleResult();
		return bus;
	}

	@Transactional
	public List<String> fetchBookedSeats(LocalDate travelDate, int busId) {

		String jpql = "select p.seatNo from Passenger p where p.ticket.travelDate=:tvlDate "
				+ "and p.ticket.bus.busId=:bId";
		TypedQuery<String> query = em.createQuery(jpql, String.class);
		query.setParameter("tvlDate", travelDate);
		query.setParameter("bId", busId);
		List<String> seatNo = query.getResultList();
		return seatNo;

	}

	@Transactional
	public List<Bus> viewAllBuses() {
		String jpql = "select b from Bus b";

		TypedQuery<Bus> query = em.createQuery(jpql, Bus.class);
		List<Bus> buses = query.getResultList();

		return buses;
	}
	

	@Transactional
	public List<User> viewAllRegsiteredCustomers() {
		String jpql = "select u from User u";
		TypedQuery<User> query = em.createQuery(jpql, User.class);
		List<User> users = query.getResultList();

		return users;

	}

	@Transactional
	public List<Object[]> frequentlyTravelledRoute() {

		String jpql = "select count(*),t.bus.source,t.bus.destination from Ticket t "
				+ "group by t.bus.source,t.bus.destination order by count(*) desc";
		TypedQuery<Object[]> query = em.createQuery(jpql, Object[].class);
		List<Object[]> routes = query.getResultList();
		return routes;
	}

	@Transactional
	public List<User> viewCustomerWhoRegisteredButwithNoBooking() {
		String jpql = "select u from User u where u.userId not in "
				+ "(select nvl2(t.user.userId,t.user.userId,0) from Ticket t)";
		TypedQuery<User> query = em.createQuery(jpql, User.class);
		List<User> user = query.getResultList();
		return user;
	}

	/*
	 * public Bus updateRoute(int busId, String source, String destination) { String
	 * jqpl = "select b from Bus b where b.busId=:bid";
	 * 
	 * TypedQuery<Bus> query = em.createQuery(jqpl, Bus.class);
	 * query.setParameter("bid", busId); Bus bus = null;
	 * 
	 * bus = query.getSingleResult(); bus.setSource(source);
	 * bus.setDestination(destination); tx.begin(); em.merge(bus); tx.commit();
	 * 
	 * return bus;
	 * 
	 * }
	 */

	@Transactional
	public User rechargeWallet(int userId, int rechargeAmount) {
		User user = em.find(User.class, userId);
		user.setWallet(user.getWallet() + rechargeAmount);

		User user1 = em.merge(user);

		return user1;

	}

	@Transactional
	public Ticket ticketDetails(int ticketId) {
		// String jpql = "select t , p from Ticket t , Passenger p where t.ticketId=:tid
		// and p.ticket.ticketId=:tid";
		String jpql = "select t from Ticket t where t.ticketId=:tid";
		TypedQuery<Ticket> query = em.createQuery(jpql, Ticket.class);
		query.setParameter("tid", ticketId);
		Ticket ticketdetails = query.getSingleResult();

		return ticketdetails;
	}

	@Transactional
	public boolean payThroughWallet(int userId, double amount) {

		User user = em.find(User.class, userId);
		if (user.getWallet() < amount) {
			return false;
		} else {
			user.setWallet(user.getWallet() - amount);

			em.merge(user); 
			return true;
		}

	}

	
	@Transactional
	public List<Integer> mostPreferredBus() {
		// 1. query in a string
		String jpql = "select t.bus.busId from Ticket t group by t.bus.busId order by count(*) desc";

		//2. Using em.createQuery(string, class) -> Query object
		TypedQuery<Integer> query = em.createQuery(jpql, Integer.class);
		
		//3. getting the results -> query.getResultList(); and query.getSingleResult();
		List<Integer> tickets = query.getResultList();

		return tickets;
	}

	@Transactional
	public List<Ticket> bookingsBasedOnPeriod(int choice, LocalDate travelDate, int month) {
		if (choice == 1) {
			String jpql = "select t from Ticket t where t.travelDate=:td";
		} else if (choice == 2) {
			String jpql = "select t from Ticket t where month(t.travelDate)";
		}

		return null;
	}
	@Transactional
	public boolean cancelTicket(int ticketId) {
		Ticket ticket = em.find(Ticket.class, ticketId);
		if (ticket.getTravelDate().isBefore(LocalDate.now())) {
			return false;
			
		} else {
			ticket.setStatus(Status.CANCELLED);
			double refund = ticket.getTotalAmount();
		try {	
			User user = this.getIdByMail(ticket.getEmail());
			user.setWallet(user.getWallet() + refund);		
			} catch (Exception e) {
			 return false;
			}

			// entity m, methods
			em.merge(ticket);

			String jpql = "delete from Passenger p where p.ticket.ticketId=:tid";
			Query query = em.createQuery(jpql);
			query.setParameter("tid", ticketId);

			query.executeUpdate();
			return true;
		}
	}

	@Transactional
	public List<Ticket> viewTicketBookedByUserId(int userId) {
		String jpql = "select t from Ticket t where t.user.userId=:uid order by t.ticketId DESC";
		TypedQuery<Ticket> query = em.createQuery(jpql, Ticket.class);
		query.setParameter("uid", userId);
		List<Ticket> tickets = query.getResultList();
		return tickets;
	}

	@Transactional
	public User findUser(int userId) {

		User user = null;
		user = em.find(User.class, userId);

		if (Objects.isNull(user)) {
			return user;
		}

		return user;
	}

	@Transactional
	public Boolean loginAdmin(int adminId, String password) {		
		String jpql1 = "select a from Admin a where a.adminId=:id and a.password=:pass";
		TypedQuery<Admin> query = em.createQuery(jpql1, Admin.class);
		query.setParameter("id", adminId);
		query.setParameter("pass", password);
		Admin admin = null;
		try {
			admin = query.getSingleResult();

		} catch (Exception e) {

		}
		if (admin == null) {
			return false;
		}
		return true;
	}

	@Transactional
	public Boolean isCustomerPresent(String email) {
		return (Long) em.createQuery("select count(u.userId) from User u where u.email = :em").setParameter("em", email)
				.getSingleResult() == 1 ? true : false;
	}

	@Transactional
	public List<Passenger> getPassenger(int ticketId) {
		String jpql = "select  p from Passenger p where p.ticket.ticketId=:tid";
		TypedQuery<Passenger> query = em.createQuery(jpql, Passenger.class);
		query.setParameter("tid", ticketId);
		List<Passenger> passsengerList = query.getResultList();

		return passsengerList;
	}

	@Transactional
	public Bus getBus(int ticketId) {
		String jpql = "select b from Bus b where b.busId =(select t.bus.busId from Ticket t where t.ticketId=:tid)";
		TypedQuery<Bus> query = em.createQuery(jpql, Bus.class);
		query.setParameter("tid", ticketId);
		Bus getBus = query.getSingleResult();

		return getBus;

	}

	@Transactional
	public int updateBus(int busId, String source, String destination, double fare) {
		String jpql = "update Bus b set b.source=:s, b.destination=:d , b.fare=:f where b.busId=:bid";
		Query query = em.createQuery(jpql);
		query.setParameter("bid", busId);
		query.setParameter("s", source);
		query.setParameter("d", destination);
		query.setParameter("f", fare);
		int res = query.executeUpdate();
		return res;
	}

	@Transactional
	public List<Ticket> bookingsBasedOnPeriod(int busId, LocalDate travelDate) {
		String jpql = "select t from Ticket t where t.bus.busId=:bid and t.travelDate=:td";
		TypedQuery<Ticket> query = em.createQuery(jpql, Ticket.class);
		query.setParameter("bid", busId);
		query.setParameter("td", travelDate);
		List<Ticket> tickets = query.getResultList();
		return tickets;
	}

	@Transactional
	public User forgotPassword(int userId, String email) {
		String jpql = "select u from User u where u.userId=:id and u.email=:Email";

		TypedQuery<User> query = em.createQuery(jpql, User.class);

		query.setParameter("id", userId);
		query.setParameter("Email", email);
		User user = query.getSingleResult();

		return user;
	}

	@Transactional
	public Ticket rescheduleTicket(int ticketId, LocalDate travelDate, List<String> seats) {
		
		Ticket ticket = em.find(Ticket.class, ticketId);
		ticket.setTravelDate(travelDate);
		
	
		   List<Passenger> passengerList = ticket.getPassengers();
			for(int i=0; i<ticket.getNoOfPassengers();i++) {			
				passengerList.get(i).setSeatNo(seats.get(i));
		}
			em.merge(ticket);
			for(int i=0; i<ticket.getNoOfPassengers();i++) {
				em.merge(passengerList.get(i));
			}
			
		return ticket;
	}

	@Transactional
	public Ticket setTicketForUser(Ticket ticket) {
		Ticket ticketPersisted = em.merge(ticket);
		return ticketPersisted;
	}

	@Override
	public User createUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	public void createAdmin() {
		Admin a = new Admin();
		a.setAdminName("admin");
		a.setPassword("bbbbb789@A");
		em.merge(a);
	}

	@Transactional
	public User getIdByMail(String email) {
		String jpql = "select u from User u where u.email = :Email";
		TypedQuery<User> query = em.createQuery(jpql, User.class);
		query.setParameter("Email", email);
		System.out.println(query.getSingleResult());
		return query.getSingleResult();
	}

	@Transactional
	public List<Ticket> getProfitsPerMonth() {
		//logic 
		String jpql = "select t from Ticket t";
		TypedQuery<Ticket> query = em.createQuery(jpql, Ticket.class);
		//query.setParameter("date", LocalDate.now());
		return query.getResultList();
	}

	@Transactional
	public void userFeedback(Feedback feedback) {
		// TODO Auto-generated method stub
		System.out.println("Sending the feedback");
		em.merge(feedback);
	}

	@Override
	public Ticket getTicketById(int ticketId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	public boolean mailExists(String mailId) {
		String jpql = "select count(*) from Ticket t where t.email = :mail";
		Query query = em.createQuery(jpql, Long.class);
		query.setParameter("mail", mailId);
		long count = (long) query.getSingleResult();
		if(count == 0)
			return false;
		return true;
	}
	
}
