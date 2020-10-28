package com.whclab.healthdata.controller;

import com.whclab.healthdata.dto.Miband;
import com.whclab.healthdata.service.MibandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {

    @Autowired
    MibandService mibandService;

    @RequestMapping("/get")
    public List<Miband> query() throws Exception{
        return mibandService.getMibandAll();
    }

//    @RequestMapping("/")
//    public String main(){
//        return "index.html";
//    }

//    @RequestMapping("/get")
//    Miband getdata(int id) throws Exception{
//        return mibandService.getMibandById(1);
//    }

//    @RequestMapping("/save")
//    public Miband getdata(int id){
//        return mibandService.getMibandById(id);
//    }
}
