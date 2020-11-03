package com.whclab.healthdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

    @GetMapping("/account")
    public String main(){
        return "welcome";
    }

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
