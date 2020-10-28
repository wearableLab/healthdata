package com.whclab.healthdata.mapper;

import com.whclab.healthdata.dto.Miband;

import java.util.List;

public interface DataMapper {

    List<Miband> getMibandAll();
    void saveMibandData(Miband miband);
    Miband selectMibandById(int id);
}
