package com.obs;

import org.springframework.beans.factory.annotation.Autowired;

import com.obs.entity.Admin;

public class InitialSetup {
	@Autowired
	Admin admin;
	
	public InitialSetup(){
		admin.setAdminName("admin");
		admin.setPassword("admin");
	}
}
