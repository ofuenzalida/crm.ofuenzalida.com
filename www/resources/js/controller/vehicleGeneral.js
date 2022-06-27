var on_focus_vehicle = '';
var selected_vehicle = null;

var on_focus_vehicle_bulk='';
var selected_vehicle_bulk = null;

var on_focus_vehicle_rent='';
var selected_vehicle_rent = null;

function clearAllpopUP(){
    let popUpInMap = document.getElementsByClassName('leaf-device-marker')
    for(let i=0;i<popUpInMap.length;i++){
        popUpInMap[i].style.zIndex = 0;
        popUpInMap[i].children[0].children[0].style.background = "#161246";
        popUpInMap[i].style.color = "#b4b7bd";
    }
}

function clearAllSelectedVehicle(){
    allFollowVehicleCheckbox = document.getElementsByName("checkBoxFollowVehicle")
    for(let i=0;i<allFollowVehicleCheckbox.length;i++){
        if(allFollowVehicleCheckbox[i] != null || allFollowVehicleCheckbox[i] != undefined){
            allFollowVehicleCheckbox[i].checked = false;
        }
    }
    
}