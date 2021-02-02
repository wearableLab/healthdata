// get the url
var url = window.location.href;
console.log("주소" + url);
//getting the access token from url
var access_token = url.split("#")[1].split("=")[1].split("&")[0];
//var access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjdHNUwiLCJzdWIiOiI3VlpZV04iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNjA0NjM3Nzk4LCJpYXQiOjE2MDQ1NTEzOTh9.1F3Lmh0AhbQnNxTg10TxCzb04wTHeFhJKOXj4DZ2YPI";
// get the userid
var userId = url.split("#")[1].split("=")[2].split("&")[0];
var user_id = url.split("#")[1].split("=")[6].split("&")[0];
var user_code = url.split("#")[1].split("=")[7].split("&")[0];
console.log(access_token);
console.log(userId);
console.log(user_id);
console.log(user_code);


var obj,obj1,obj2,obj3,obj4,day;

var xhr = new XMLHttpRequest();
var xhr1 = new XMLHttpRequest();
var xhr2 = new XMLHttpRequest();
var xhr3 = new XMLHttpRequest();
var xhr4 = new XMLHttpRequest();
var xhr5 = new XMLHttpRequest();

//사용자정보 + usercode
var name, age, gender, height, weight;

//걸음수정보
var calories,step_sum,distance;

//수면정보
var total_sleep, sleep_type, start_time, end_time, deep, light, rem, wake;

//심박수정보
var datetime, calories_hr, fatout_minute, average_hr;

//데이터셋
var sleep_dataset,sleep_summary, heart_dataset, step_dataset;

$(document).ready(function() {
    var codestr = "사용자 코드 : " + user_code + " / 번호 : "+ user_id +"</br>";
    document.getElementById("user_code").innerHTML = codestr;

    // 활동 데이터 파일
    xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/profile.json');
    xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = xhr.responseText;
            obj = JSON.parse(json);
          //  console.log("사용자 정보.."+json);
            var str1 = "사용자 이름 : " + obj["user"]["displayName"] + "</br>";
            str1 += "나이 : " + obj["user"]["age"] + "</br>";
            str1 += "성별 : " + obj["user"]["gender"] + "</br>";
            str1 += "키 : " + obj["user"]["height"] + "</br>";
            str1 += "몸무게 : " + obj["user"]["weight"] + "</br>";
            document.getElementById("users").innerHTML = str1;
            name = obj["user"]["displayName"];
            age = obj["user"]["age"];
            gender = obj["user"]["gender"];
            height = obj["user"]["height"];
            weight = obj["user"]["weight"];
        }
    };
    xhr.send();

    $('button#input_date').click(function() {
        day = $('input#day').val();

        // 활동 데이터 파일
        xhr1.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/date/'+day+'.json');
        xhr1.setRequestHeader("Authorization", 'Bearer ' + access_token);
        xhr1.onload = function() {
            if (xhr1.status === 200) {
                var json1 = xhr1.responseText;
                obj1 = JSON.parse(json1);
                //console.log("전체" + json1);
                var str = "칼로리 소모량 : " + obj1["summary"]["caloriesOut"] + "kcal</br>";
                str += "걸음수 : " + obj1["summary"]["steps"] + "걸음</br>";
                str += "이동거리 : " + obj1["summary"]["distances"][0]["distance"] + "km</br>";
                str += "평균심박수 : " + obj1["summary"]["restingHeartRate"] + "bpm</br>";
                document.getElementById("activities").innerHTML = str;
                calories = obj1["summary"]["caloriesOut"];
                step_sum = obj1["summary"]["steps"];
                distance = obj1["summary"]["distances"][0]["distance"];
                average_hr = obj1["summary"]["restingHeartRate"];
            }
        };
        xhr1.send();


        // 걸음수 데이터 파일
        xhr2.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/steps/date/'+day+'/1d/1min.json');
        xhr2.setRequestHeader('Authorization',"Bearer " +access_token);
        xhr2.onload = function() {
            if (xhr2.status === 200) {
                var json2 = xhr2.responseText;
             //   console.log("걸음..." + json2);
                obj2 = JSON.parse(json2);
                step_dataset =  JSON.stringify(obj2["activities-steps-intraday"]["dataset"]);
                //StepsFunction(obj2["activities-steps-intraday"]["dataset"]);
               // console.log("걸음수1..."+step_dataset);
            }
        }
        xhr2.send();



            // 심박수 데이터 파일
           xhr4.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/heart/date/' + day +'/1d/1min.json');
           // xhr4.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/heart/date/'+day+'/1d/1min/time/'+s_time+'/'+e_time+'.json');
            xhr4.setRequestHeader("Authorization", 'Bearer ' + access_token);
            xhr4.onload = function() {
                if (xhr4.status === 200) {
                    var json4 = xhr4.responseText;
                 //   console.log("심박"+json4);
                    obj4 = JSON.parse(json4);
                     var str = "측정날짜 : " + obj4["activities-heart"][0]["dateTime"] + "</br>";
                     str += "지방연소 : " + obj4["activities-heart"][0]["value"]["heartRateZones"][1]["minutes"] + "분 </br>";
                     str += "평균심박 : " + obj4["activities-heart"][0]["value"]["restingHeartRate"]+ "bpm</br>";
                    document.getElementById("heartrate").innerHTML = str;
                    datetime = obj4["activities-heart"][0]["dateTime"];
                    fatout_minute = obj4["activities-heart"][0]["value"]["heartRateZones"][1]["minutes"];
                    heart_dataset = JSON.stringify(obj4["activities-heart-intraday"]["dataset"]);
                  //  HeartFunction(obj4["activities-heart-intraday"]["dataset"]);
                }
            }
            xhr4.send();


        xhr5.open('GET', 'https://api.fitbit.com/1.2/user/' + userId + '/sleep/date/'+day+'.json');
        xhr5.setRequestHeader("Authorization", 'Bearer ' + access_token);
        xhr5.onload = function() {
            if (xhr5.status === 200) {
                var json5 = xhr5.responseText;
                obj5 = JSON.parse(json5);
               // console.log("총 수면..."+obj5["sleep"][0]["timeInBed"]);
                //console.log("수면..."+JSON.stringify(obj5["sleep"]));

               // console.log("수면..."+JSON.stringify(obj5["summary"]));
               // console.log("deep..." + JSON.stringify(obj5["summary"]["stages"]));
               // console.log("deep type..." + obj5["summary"]["stages"]);
                //수면 데이터 값이 없을 경우에 그 이전 날짜 데이터가 들어가서 중복된다 => 해결하기!!
                //값이 없을때 undefined 변수로 구별하여 넣었지만 되지 않음
                if(JSON.stringify(obj5["sleep"]) == "[]"){

                        console.log("수면데이터 없음.."+ JSON.stringify(obj5["summary"]));
                        sleep_type = null;
                        start_time = null;
                        end_time = null;
                        deep = 0;
                        light = 0;
                        rem = 0;
                        wake = 0;
                        total_sleep = 0;
                        sleep_dataset = JSON.stringify(obj5["sleep"]);
                        sleep_summary = JSON.stringify(obj5["summary"]);

                        var str3 = "총 수면 : " + 0 + "분";
                        str3 += " / 수면타입 : " + null + "</br>";
                        str3 += "수면시작시간 : " + null + "</br>";
                        str3 += "수면종료시간 : " + null + "</br>" + "* 수면요약(분)" + "</br>";
                        str3 += "깊은수면 : " + 0;
                        str3 += " / 얕은수면 : " + 0 + "</br>";
                        str3 += "렘수면 : " + 0;
                        str3 += " / 깨어남 : " + 0 + "</br>";
                        document.getElementById("sleeps").innerHTML = str3;

                }else if(obj5["summary"]["stages"] == "" || obj5["summary"]["stages"] == null || obj5["summary"]["stages"] == undefined || ( obj5["summary"]["stages"] != null && typeof obj5["summary"]["stages"] == "object" && !Object.keys(obj5["summary"]["stages"]).length )){

                    console.log("총 수면..."+ obj5["sleep"][0]["timeInBed"]);
                    sleep_type = obj5["sleep"][0]["type"];
                    start_time = obj5["sleep"][0]["startTime"];
                    end_time = obj5["sleep"][0]["endTime"];
                    deep = 0;
                    light = 0;
                    rem = 0;
                    wake = 0;
                    total_sleep = obj5["sleep"][0]["timeInBed"];
                    sleep_dataset = JSON.stringify(obj5["sleep"][0]["levels"]["data"]);
                    sleep_summary = JSON.stringify(obj5["sleep"][0]["levels"]["summary"]);

                    var str4 = "총 수면 : " + obj5["sleep"][0]["timeInBed"] + "분";
                    str4 += " / 수면타입 : " + obj5["sleep"][0]["type"] + "</br>";
                    str4 += "수면시작시간 : " + obj5["sleep"][0]["startTime"] + "</br>";
                    str4 += "수면종료시간 : " + obj5["sleep"][0]["endTime"] + "</br>" + "* 수면요약(분)" + "</br>";
                    str4 += "깊은수면 : " + 0;
                    str4 += " / 얕은수면 : " + 0 + "</br>";
                    str4 += "렘수면 : " + 0;
                    str4 += " / 깨어남 : " + 0 + "</br>";
                    document.getElementById("sleeps").innerHTML = str4;

                }
                else{
                    console.log("총 수면..."+ obj5["sleep"][0]["timeInBed"]);
                    var str2 = "총 수면 : " + obj5["sleep"][0]["timeInBed"] + "분";
                    str2 += " / 수면타입 : " +  obj5["sleep"][0]["type"] + "</br>";
                    str2 += "수면시작시간 : " + obj5["sleep"][0]["startTime"] + "</br>";
                    str2 += "수면종료시간 : " + obj5["sleep"][0]["endTime"] + "</br>" + "* 수면요약(분)" + "</br>";
                    str2 += "깊은수면 : " + obj5["summary"]["stages"]["deep"];
                    str2 += " / 얕은수면 : " + obj5["summary"]["stages"]["light"] + "</br>";
                    str2 += "렘수면 : " + obj5["summary"]["stages"]["rem"];
                    str2 += " / 깨어남 : " + obj5["summary"]["stages"]["wake"] + "</br>";
                    document.getElementById("sleeps").innerHTML = str2;

                    sleep_type = obj5["sleep"][0]["type"];
                    start_time = obj5["sleep"][0]["startTime"];
                    end_time = obj5["sleep"][0]["endTime"];
                    deep = obj5["summary"]["stages"]["deep"];
                    light = obj5["summary"]["stages"]["light"];
                    rem = obj5["summary"]["stages"]["rem"];
                    wake = obj5["summary"]["stages"]["wake"];
                    total_sleep = obj5["sleep"][0]["timeInBed"];
                    sleep_dataset = JSON.stringify(obj5["sleep"][0]["levels"]["data"]);
                    sleep_summary = JSON.stringify(obj5["sleep"][0]["levels"]["summary"]);

                }



            }
        }
        xhr5.send();

});

    //사용자 데이터저장
    var userinfo = {
        init : function (){
            var _this = this;
            $('#btn-user-save').on('click',function (){
                _this.user_save();
            });
        },
        user_save:function (){

            //사용자정보데이터
            var userdata = {
                user_id: user_id,
                code : user_code,
                name : name,
                age : age,
                gender : gender,
                height : height,
                weight : weight
            };

            $.ajax({
                type:'POST',
                url:'/user/posts',
                dataType:'json',
                contentType:'application/json; charset = utf-8',
                data: JSON.stringify(userdata)
            }).done(function (){
                console.log("사용자정보 저장완료....");
            }).fail(function (error){
                console.log("오류..");
            });
        }
    };

    userinfo.init();

//세부정보저장
    var main = {
        init : function (){
            var _this = this;
            $('#btn-save').on('click',function (){
                _this.data_save();
            });
        },
        data_save:function (){
//활동데이터
            var activitydata = {
                user_id: user_id,
                calories_out : calories,
                step_sum : step_sum,
                distance : distance,
                average_hr : average_hr,
                sleep_total : total_sleep,
                datetime : datetime
            };

            $.ajax({
                type:'POST',
                url:'/activity/posts',
                dataType:'json',
                contentType:'application/json; charset = utf-8',
                data: JSON.stringify(activitydata)
            }).done(function (){
                console.log("활동 저장완료...."+datetime);
            }).fail(function (error){
                console.log("오류..");
            });

//수면데이터
            var sleepdata = {
                user_id: user_id,
                datetime: datetime,
                dataset: sleep_dataset,
                summary: sleep_summary,
                total_sleep : total_sleep,
                type : sleep_type,
                start_time : start_time,
                end_time : end_time,
                deep : deep,
                light : light,
                rem : rem,
                wake : wake,
            };

            $.ajax({
                type:'POST',
                url:'/sleeps/posts',
                dataType:'json',
                contentType:'application/json; charset = utf-8',
                data: JSON.stringify(sleepdata)
            }).done(function (){
                console.log("타입1..."+sleep_type + "시작시간"+start_time + "총수면"+total_sleep);
                console.log("수면 저장완료...."+datetime);
            }).fail(function (error){
                console.log("오류..");
            });


//심박데이터
            var heartdata = {
                user_id: user_id,
                datetime : datetime,
                calories_hr : calories_hr,
                fatout_minute : fatout_minute,
                avg_heart : average_hr,
                dataset : heart_dataset
            };

            $.ajax({
                type:'POST',
                url:'/heartrate/posts',
                dataType:'json',
                contentType:'application/json; charset = utf-8',
                data: JSON.stringify(heartdata)
            }).done(function (){
                console.log("심박수 저장완료...."+datetime);
            }).fail(function (error){
                console.log("오류..");
            });

//걸음데이터
            var stepdata = {
                user_id: user_id,
                datetime : datetime,
                calorie : calories,
                step_sum : step_sum,
                dataset : step_dataset
            };

            $.ajax({
                type:'POST',
                url:'/step/posts',
                dataType:'json',
                contentType:'application/json; charset = utf-8',
                data: JSON.stringify(stepdata)
            }).done(function (){
                console.log("걸음수 저장완료...."+datetime);
                window.location.href = url;
            }).fail(function (error){
                console.log("오류..");
            });

        }
    };

    main.init();


});



//함수
function HeartFunction(arr) {
    var i;
    for (i = 0; i < arr.length - 1; i++) {
        heart_value[i] = obj4["activities-heart-intraday"]["dataset"][i]["value"];
        heart_time[i] = obj4["activities-heart-intraday"]["dataset"][i]["time"];
    }

    var jsonObject = {
        data: {
            'heartrate': heart_value
        },
        keys: heart_time
    }

    console.log(jsonObject.keys);

    var chart = c3.generate({
        bindto: "#chart",
        data: {
            json: jsonObject.data
        },
        axis: {
            x: {
                type: 'category',
                categories: jsonObject.keys
            }
        }
    });
}

function StepsFunction(arr) {
    var out = "";
    var j;
    for (j = 0; j < arr.length; j++) {
        step_value[j] = obj2["activities-steps"][j]["value"];
        step_time[j] = obj2["activities-steps"][j]["dateTime"];
        calories_value[j] = obj3["activities-calories"][j]["value"];

    }



    var jsonObject1 = {
        data: {
            'steps': step_value,
            'calories': calories_value
        },
        keys: step_time
    }

    console.log(jsonObject1.keys);

    var chart1 = c3.generate({
        bindto: "#chart1",
        data: {
            json: jsonObject1.data,
            type: 'bar'
        },
        axis: {
            x: {
                type: 'category',
                categories: jsonObject1.keys
            }
        }
    });
}



