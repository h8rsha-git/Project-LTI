package com.obs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.obs.entity.Bus;
import com.obs.entity.User;
import com.obs.repository.BusReservationDao;
import com.obs.resource.BusReservationController;
import com.obs.service.BusReservationService;


@SpringBootTest
class SightCityTravelsApplicationTests {
	
	@Autowired
	BusReservationDao busReservationDao;

//	@Test
//	public void addBusTest() {
//		Bus bus = new Bus();
//		bus.setBusName("Volvo");
//		Bus addedBus  = busReservationDao.addBus(bus);
//		assertEquals(210, addedBus.getbusId()); // change this
//	}
	
	@Test
	public void loginUser() {
		assertEquals(true, busReservationDao.loginUser(1011, "bbbbb789@A"));
	}
	
	@Test
	public void updateBusTest(){
		int busChanged = busReservationDao.updateBus(203, "sourceB", "destinationB", 2600);
		assertEquals(1,busChanged);
	}

	  @Test
	  public void chooseBusTest() { 
		  assertEquals(2600.0,busReservationDao.chooseBus(203).getFare());
	  }
	  
	@Test
	public void frequentlyTravelledRoute() {
		// TODO Auto-generated method stub
		assertEquals(1, busReservationDao.frequentlyTravelledRoute().size());
	}
//

	@Test
	public void viewAllBusesTest() {
		// TODO Auto-generated method stub
		assertEquals(10, busReservationDao.viewAllBuses().size());
	}

	@Test
	public void viewAllRegsiteredCustomersTest() {
		// TODO Auto-generated method stub
		assertEquals(11,busReservationDao.viewAllRegsiteredCustomers().size());
	}

	
	@Test
	public void viewCustomerWhoRegisteredButwithNoBooking() {
		 assertEquals(8,busReservationDao.viewCustomerWhoRegisteredButwithNoBooking().size());
	}

	@Test
	public void ticketDetails() {
		// TODO Auto-generated method stub
		assertEquals("banwar@gmail.com",busReservationDao.ticketDetails(50008).getEmail());
	}

	@Test
	public void payThroughWallet() {
		// TODO Auto-generated method stub
		assertEquals(false,busReservationDao.payThroughWallet(1004, 2500.0));
	}
	
	@Test
	public void mostPreferredBus() {
		// TODO Auto-generated method stub
		assertEquals(203,busReservationDao.mostPreferredBus().get(0));
	}

	@Test
	public void viewTicketBookedByUserIdTests() {
		// TODO Auto-generated method stub
		assertEquals(2,busReservationDao.viewTicketBookedByUserId(1005).size());
	}

    //http://localhost:9090/getBusByTicketId
    @Test
    public void getBusByTicketIdTest() {
    	assertEquals("Volvo",busReservationDao.getBus(50007).getBusName());
    }
    
	
    @Test
    public void findUserTest() {
    	assertEquals("Mithil ", busReservationDao.findUser(1011).getFirstName());
    }

}
