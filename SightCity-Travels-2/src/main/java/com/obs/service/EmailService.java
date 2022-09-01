package com.obs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
public class EmailService {
	@Autowired
	private MailSender mailSender;
	
	public void sendEmailForNewRegistration(String email,String text,String subject) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("sightcitytravelspvt@gmail.com");
		message.setTo(email);
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}
	
	public void sendEmailForBooking(String email,StringBuffer text,String subject) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("sightcitytravelspvt@gmail.com");
		message.setTo(email);
		message.setSubject(subject);
		message.setText(text.toString());
		mailSender.send(message);

	}
	
	public void sendEmailForForgetPassword(String email,String subject,String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("sightcitytravelspvt@gmail.com");
		message.setTo(email);
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}
}
