package com.whclab.healthdata.controller;

import com.whclab.healthdata.domain.entity.FitbitUser;
import com.whclab.healthdata.domain.entity.Heartrate;
import com.whclab.healthdata.domain.repository.StepRepository;
import com.whclab.healthdata.dto.*;
import com.whclab.healthdata.service.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class MainController {

    @Autowired
    private UserService userService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private SleepService sleepService;

    @Autowired
    private HeartrateService heartrateService;

    @Autowired
    private FitbitUserService fitbitUserService;
    @Autowired
    private StepService stepService;

    @Autowired
    MibandService mibandService;

    @RequestMapping("/get")
    public List<Miband> query() throws Exception{
        return mibandService.getMibandAll();
    }

    @PostMapping("/user/posts")
    public Long save(@RequestBody UsersDto usersDto) {
        return userService.savePost(usersDto);
    }

    @PostMapping("/activity/posts")
    public Long save(@RequestBody ActivityDto activityDto) {
        return activityService.saveActivity(activityDto);
    }

    @PostMapping("/sleeps/posts")
    public Long save(@RequestBody SleepDto sleepDto) {
        return sleepService.saveSleep(sleepDto);
    }

    @PostMapping("/heartrate/posts")
    public Long save(@RequestBody HeartrateDto heartrateDto) {
        return heartrateService.saveHeartrate(heartrateDto);
    }

    @PostMapping("/step/posts")
    public Long save(@RequestBody StepDto stepDto) {
        return stepService.saveStep(stepDto);
    }

}
