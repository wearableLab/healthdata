package com.whclab.healthdata.service;

import com.whclab.healthdata.dto.Miband;
import com.whclab.healthdata.dto.UsersDto;
import com.whclab.healthdata.mapper.DataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MibandService {

    @Autowired
    DataMapper dataMapper;

    public List<Miband> getMibandAll() throws Exception{
        return dataMapper.getMibandAll();
    }

    public Miband getMibandById(int id){
        return dataMapper.selectMibandById(id);
    }

    public void addMiband(Miband miband){
        dataMapper.saveMibandData(miband);
    }

}
