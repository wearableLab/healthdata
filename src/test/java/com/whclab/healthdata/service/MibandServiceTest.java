package com.whclab.healthdata.service;

import com.whclab.healthdata.dto.Miband;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestComponent;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class MibandServiceTest {

    @Autowired
    MibandService mibandService;

    @Test
    public void getMibandAll() throws Exception{
        List<Miband> mibandList = mibandService.getMibandAll();
        //log.info("miband: {} ",mibandList);
    }

    @Test
    public void getMibandById() {
        Miband miband = mibandService.getMibandById(1);
    }

    @Test
    public void addMiband() {
        mibandService.addMiband(new Miband(3,"AAA","68","300","7h"));
        mibandService.addMiband(new Miband(4,"BBB","69","400","8h"));
        mibandService.addMiband(new Miband(5,"CCC","70","500","9h"));
    }
}