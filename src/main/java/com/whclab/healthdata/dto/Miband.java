package com.whclab.healthdata.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@Data
@Alias("miband")
public class Miband {  //반드시 mysql상의 데이터 이름과 형식이 같아야함!!
    private int miband_id;
    private String name;
    private String heartrate;
    private String step;
    private String sleep;

    public Miband(){

    }

    public Miband(int id,String name, String heartrate, String step, String sleep){
        this.miband_id=id;
        this.name = name;
        this.heartrate=heartrate;
        this.step=step;
        this.sleep=sleep;
    }

}
