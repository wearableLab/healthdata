package com.whclab.healthdata.controller;

import com.whclab.healthdata.dto.FitbitUserDto;
import com.whclab.healthdata.dto.UsersDto;
import com.whclab.healthdata.service.FitbitUserService;
import com.whclab.healthdata.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@AllArgsConstructor
public class PageController {

    @Autowired
    private FitbitUserService fitbitUserService;

    @GetMapping("/welcome")
    public String welcome(){
        return "welcome";
    }

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/fitbituser")
    public String list(Model model){
        List<FitbitUserDto> fitbitUserList = fitbitUserService.getFitbitUserlist();

        model.addAttribute("FitbitUserlist",fitbitUserList);
        return "userinfo";
    }

}
