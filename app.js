// 학교 -> 역뒤
// 학교 -> 조치원역 뒤
const toStation = { 
    // 일요일 (0)
    0: ["17:00", "17:40", "18:40", "19:00", "19:40", "20:20", "21:10"], 
    // 월요일 (1)
    1: ['09:10', '09:30', '09:40', '09:50', '10:10', '10:30', '10:40', '11:00', '11:20', '11:40', '12:00', '12:10', '12:30', '12:40', '13:10', '13:30', '13:50', '14:10', '14:30', '15:00', '15:10', '15:30', '15:50', '16:10', '16:30', '16:50', '17:10', '17:20', '17:40', '18:10', '18:20', '18:40', '19:10', '19:40', '20:10', '20:50'], 
    // 화요일 (2)
    2: ['09:10', '09:30', '09:40', '09:50', '10:10', '10:30', '10:40', '11:00', '11:20', '11:40', '12:00', '12:10', '12:30', '12:40', '13:10', '13:30', '13:50', '14:10', '14:30', '15:00', '15:10', '15:30', '15:50', '16:10', '16:30', '16:50', '17:10', '17:20', '17:40', '18:10', '18:20', '18:40', '19:10', '19:40', '20:10', '20:50'], 
    // 수요일 (3)
    3: ['09:10', '09:30', '09:40', '09:50', '10:10', '10:30', '10:40', '11:00', '11:20', '11:40', '12:00', '12:10', '12:30', '12:40', '13:10', '13:30', '13:50', '14:10', '14:30', '15:00', '15:10', '15:30', '15:50', '16:10', '16:30', '16:50', '17:10', '17:20', '17:40', '18:10', '18:20', '18:40', '19:10', '19:40', '20:10', '20:50'], 
    // 목요일 (4)
    4: ['09:10', '09:30', '09:40', '09:50', '10:10', '10:30', '10:40', '11:00', '11:20', '11:40', '12:00', '12:10', '12:30', '12:40', '13:10', '13:30', '13:50', '14:10', '14:30', '15:00', '15:10', '15:30', '15:50', '16:10', '16:30', '16:50', '17:10', '17:20', '17:40', '18:10', '18:20', '18:40', '19:10', '19:40', '20:10', '20:50'], 
    // 금요일 (5) - 19:10 이후 운행 없음
    5: ['09:10', '09:30', '09:40', '09:50', '10:10', '10:30', '10:40', '11:00', '11:20', '11:40', '12:00', '12:10', '12:30', '12:40', '13:10', '13:30', '13:50', '14:10', '14:30', '15:00', '15:10', '15:30', '15:50', '16:10', '16:30', '16:50', '17:10', '17:20', '17:40', '18:10', '18:20', '18:40'], 
    // 토요일 (6)
    6: [], 
};

// 조치원역 뒤 -> 학교
const toSchool = { 
    // 일요일 (0)
    0: ["16:30", "17:10", "17:50", "18:50", "19:10", "19:50", "20:35", "21:20"], 
    // 월요일 (1)
    1: ['08:30', '08:30', '08:45', '09:20', '09:40', '09:50', '10:00', '10:20', '10:40', '10:50', '11:10', '11:30', '11:50', '12:20', '12:40', '12:50', '13:20', '13:40', '14:00', '14:20', '14:40', '15:10', '15:20', '15:40', '16:00', '16:20', '16:40', '17:00', '17:20', '17:30', '17:50', '18:30', '18:50', '19:20', '19:50', '20:20', '21:00'], 
    // 화요일 (2)
    2: ['08:30', '08:30', '08:45', '09:20', '09:40', '09:50', '10:00', '10:20', '10:40', '10:50', '11:10', '11:30', '11:50', '12:20', '12:40', '12:50', '13:20', '13:40', '14:00', '14:20', '14:40', '15:10', '15:20', '15:40', '16:00', '16:20', '16:40', '17:00', '17:20', '17:30', '17:50', '18:30', '18:50', '19:20', '19:50', '20:20', '21:00'],
    // 수요일 (3)
    3: ['08:30', '08:30', '08:45', '09:20', '09:40', '09:50', '10:00', '10:20', '10:40', '10:50', '11:10', '11:30', '11:50', '12:20', '12:40', '12:50', '13:20', '13:40', '14:00', '14:20', '14:40', '15:10', '15:20', '15:40', '16:00', '16:20', '16:40', '17:00', '17:20', '17:30', '17:50', '18:30', '18:50', '19:20', '19:50', '20:20', '21:00'],
    // 목요일 (4)
    4: ['08:30', '08:30', '08:45', '09:20', '09:40', '09:50', '10:00', '10:20', '10:40', '10:50', '11:10', '11:30', '11:50', '12:20', '12:40', '12:50', '13:20', '13:40', '14:00', '14:20', '14:40', '15:10', '15:20', '15:40', '16:00', '16:20', '16:40', '17:00', '17:20', '17:30', '17:50', '18:30', '18:50', '19:20', '19:50', '20:20', '21:00'],
    // 금요일 (5) - 18:50 이후 운행 없음
    5: ['08:30', '08:30', '08:45', '09:20', '09:40', '09:50', '10:00', '10:20', '10:40', '10:50', '11:10', '11:30', '11:50', '12:20', '12:40', '12:50', '13:20', '13:40', '14:00', '14:20', '14:40', '15:10', '15:20', '15:40', '16:00', '16:20', '16:40', '17:00', '17:20', '17:30', '17:50', '18:30'],
    // 토요일 (6)
    6: [], 
};
function calculateTime(targetTimes) {
    const now = new Date();
    const currentDayOfWeek = now.getDay();

    //targetTimesOfDay -> 해당 요일 시간 배열
    const targetTimesOfDay = targetTimes[currentDayOfWeek]; 

    if (currentDayOfWeek==6) {
        return {
            message: "토요일은 셔틀버스가 없어요.",
            currentTargetTime: null,
            remainingTime: null,
            nextTargetTime: null,
        };
    }

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    let nextTargetTime_1 = null;
    let nextTargetTime_2 = null;
    let nextTargetTime_3 = null;


     for(let i=0;i<targetTimesOfDay.length;i++) {

        targetTime=targetTimesOfDay[i];

        let [targetHour, targetMinute, targetSecond = 0] = targetTime.split(":").map(Number);

        if (currentHour <= targetHour || (currentHour === targetHour && currentMinute <= targetMinute)) {
            let hoursRemaining = targetHour - currentHour;
            let minutesRemaining = targetMinute - currentMinute;
            let secondsRemaining = targetSecond - currentSecond;

            if (minutesRemaining < 0) {
                minutesRemaining += 60;
                hoursRemaining -= 1;
            }

            if (secondsRemaining < 0) {
                secondsRemaining += 60;
                minutesRemaining -= 1;
            }


            const formatNumber = (num) => num.toString().padStart(2, "0");

            const currentTargetTime = `${formatNumber(targetHour)}시 ${formatNumber(targetMinute)}분`;
            let remainingTime = `${formatNumber(hoursRemaining)}시간 ${formatNumber(minutesRemaining)}분 ${formatNumber(secondsRemaining)}초`;
            
            //const formattedTargetHour = targetHour.toString().padStart(2, "0");
            //const formattedTargetMinute = targetMinute.toString().padStart(2, "0");


            // nextTargetTime 설정
            let nextTargetTimeInfo = null;
            if(i < targetTimesOfDay.length-3){

                // 다음버스_1
                nextTargetTime_1=targetTimesOfDay[i+1];
                let [nextTargetHour_1, nextTargetMinute_1, nextTargetSecond_1 = 0] = nextTargetTime_1.split(":").map(Number);

                // 다음버스_2
                nextTargetTime_2=targetTimesOfDay[i+2];
                let [nextTargetHour_2, nextTargetMinute_2, nextTargetSecond_2 = 0] = nextTargetTime_2.split(":").map(Number);

                // 다음버스_3
                nextTargetTime_3=targetTimesOfDay[i+3];
                let [nextTargetHour_3, nextTargetMinute_3, nextTargetSecond_3 = 0] = nextTargetTime_3.split(":").map(Number);

                
                nextTargetTimeInfo = `[${formatNumber(nextTargetHour_1)}시 ${formatNumber(nextTargetMinute_1)}분] `;
                nextTargetTimeInfo += `[${formatNumber(nextTargetHour_2)}시 ${formatNumber(nextTargetMinute_2)}분] `;
                nextTargetTimeInfo += `[${formatNumber(nextTargetHour_3)}시 ${formatNumber(nextTargetMinute_3)}분]`;
                
            }
            else if(i == targetTimesOfDay.length-3){

                // 다음버스_1
                nextTargetTime_1=targetTimesOfDay[i+1];
                let [nextTargetHour_1, nextTargetMinute_1, nextTargetSecond_1 = 0] = nextTargetTime_1.split(":").map(Number);

                // 다음버스_2
                nextTargetTime_2=targetTimesOfDay[i+2];
                let [nextTargetHour_2, nextTargetMinute_2, nextTargetSecond_2 = 0] = nextTargetTime_2.split(":").map(Number);
                
                nextTargetTimeInfo = `[${formatNumber(nextTargetHour_1)}시 ${formatNumber(nextTargetMinute_1)}분] `;
                nextTargetTimeInfo += `[${formatNumber(nextTargetHour_2)}시 ${formatNumber(nextTargetMinute_2)}분]`;
            }
            else if(i == targetTimesOfDay.length-2){
                // 다음버스_1
                nextTargetTime_1=targetTimesOfDay[i+1];
                let [nextTargetHour_1, nextTargetMinute_1, nextTargetSecond_1 = 0] = nextTargetTime_1.split(":").map(Number);
                
                nextTargetTimeInfo = `${formatNumber(nextTargetHour)}시 ${formatNumber(nextTargetMinute)}분`;
            }
            else{
                nextTargetTimeInfo="다음 버스가 없어요";
            }


            if (hoursRemaining == 0 && minutesRemaining >= 0 && secondsRemaining >= 0) {
                remainingTime = `${formatNumber(minutesRemaining)}분 ${formatNumber(secondsRemaining)}초`;
                return {
                    currentTargetTime,
                    remainingTime,
                    nextTargetTimeInfo,
                };
            }
            else if (hoursRemaining >= 0 && minutesRemaining >= 0 && secondsRemaining >= 0) {
                return {
                    currentTargetTime,
                    remainingTime,
                    nextTargetTimeInfo,
                };
            }

        }

        // 다음 타겟 시간 계산
        //nextTargetTime = `${targetHour}시${targetMinute}분`;
    }

    return {
        message: "셔틀 버스 종료",
        currentTargetTime: null,
        remainingTime: null,
        nextTargetTimeInfo: null,
    };
}


function updateCountdown() {
    const currentTargetTimeElementToStation = document.getElementById("toStationCurrentTargetTime");
    const remainingTimeElementToStation = document.getElementById("toStationRemainingTime");
    const nextTargetTimeElementToStation = document.getElementById("toStationNextTargetTime");
    const timeInfoToStation = calculateTime(toStation);
    
    if (timeInfoToStation.currentTargetTime) {
        currentTargetTimeElementToStation.textContent = `이번 셔틀 : ${timeInfoToStation.currentTargetTime}`;
        remainingTimeElementToStation.textContent = `남은 시간 : ${timeInfoToStation.remainingTime}`;
        nextTargetTimeElementToStation.textContent = `다음 셔틀 : ${timeInfoToStation.nextTargetTimeInfo}`;
    } else {
        currentTargetTimeElementToStation.textContent = "";
        remainingTimeElementToStation.textContent = timeInfoToStation.message;
        nextTargetTimeElementToStation.textContent = "";
    }

    const currentTargetTimeElementToSchool = document.getElementById("toSchoolCurrentTargetTime");
    const remainingTimeElementToSchool = document.getElementById("toSchoolRemainingTime");
    const nextTargetTimeElementToSchool = document.getElementById("toSchoolNextTargetTime");
    const timeInfoToSchool = calculateTime(toSchool);

    if (timeInfoToSchool.currentTargetTime) {
        currentTargetTimeElementToSchool.textContent = `이번 셔틀 : ${timeInfoToSchool.currentTargetTime}`;
        remainingTimeElementToSchool.textContent = `남은 시간 : ${timeInfoToSchool.remainingTime}`;
        nextTargetTimeElementToSchool.textContent = `다음 셔틀 : ${timeInfoToSchool.nextTargetTimeInfo}`;
    } else {
        currentTargetTimeElementToSchool.textContent = "";
        remainingTimeElementToSchool.textContent = timeInfoToSchool.message;
        nextTargetTimeElementToSchool.textContent = "";
    }
}

// 1초마다 업데이트
setInterval(updateCountdown, 1000);

// 초기 업데이트
updateCountdown();

const clock = document.querySelector("#clock");

function getClock(){
    const date = new Date;
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = (hours+":"+minutes+":"+seconds);
}
getClock();
setInterval(getClock,1000);
