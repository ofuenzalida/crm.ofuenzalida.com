/**
 * Libreria para manipulación de alertas en el sistema
 */
function Alert()
{
    let _this = this;
    // this.alert_types = ['rpm_alert','speed_alert','sos_alert','signal_alert','taller_alert'];
    
    _this.error = function (title, body)
    {
        _this.show(title, body, 'error');
    };

    _this.success = function (title, body)
    {
        _this.show(title, body, 'success');
    };

    _this.info = function (title, body)
    {
        _this.show(title, body, 'info');
    };

    _this.warning = function (title, body)
    {
        _this.show(title, body, 'warning');
    };

    _this.show = function (title, body, type)
    {
        swal.fire({
                      title: title || 'Peligro',
                      text: body || 'Sin Información',
                      type: type || 'info'
                  });
    }

    _this.prompt = function (title, body, icon)
    {
        swal({
                 title: title || 'Alerta',
                 text: body || 'Sin Información',
                 icon: icon || 'warning',
                 buttons: true,
                 dangerMode: true,
             })
            .then((willDelete) =>
                  {
                      return willDelete;
                      // if (willDelete)
                      // {
                      //     swal("Poof! Your imaginary file has been deleted!", {
                      //         icon: "success",
                      //     });
                      // }
                      // else
                      // {
                      //     swal("Your imaginary file is safe!", {
                      //         icon: "error",
                      //     });
                      // }

                  });
    };

    _this.paintIntoHtmlSpeedAlert = function (data,total,alert_type){
        document.getElementById('popup_speed_num').textContent = total;
        document.getElementById('popup_speed_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-speedlimit');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-speedlimit">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.vehicles_id} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> |
                                     ${element.speed} Km/s&nbsp;
                                 </p>
                                 <small class="notification-text">
                                     (${element.assgn_plant_code}) | ${element.addr_line_1} | 
                                     ${element.device_time_local}| ${element.rpm} RPM
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlRpmAlert = function (data,total,alert_type){
        document.getElementById('popup_rpm_num').textContent = total;
        document.getElementById('popup_rpm_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-rpmlimit');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-rpmlimit">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.vehicles_id} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> |
                                     ${element.speed} Km/s&nbsp;
                                 </p>
                                 <small class="notification-text">
                                     (${element.assgn_plant_code}) | ${element.addr_line_1} | 
                                     ${element.device_time_local}| ${element.rpm} RPM
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlSOSAlert = function (data,total,alert_type){
        document.getElementById('popup_sos_num').textContent = total;
        document.getElementById('popup_sos_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-sosalert');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-sosalert">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.plant_code}) | ${element.plant_name} | 
                                     ${element.description}| ${element.created_at}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }
    
    _this.paintIntoHtmlNoSignalAlert = function (data,total,alert_type){
        document.getElementById('popup_not_senal_num').textContent = total;
        document.getElementById('popup_not_senal_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-not-senal-alert');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-not-senal-alert">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.plant_code}) | ${element.plant_name} | 
                                      ${element.device_time_local}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlWorkShoplAlert = function (data,total,alert_type){
        document.getElementById('popup_workshop_num').textContent = total;
        document.getElementById('popup_workshop_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable_container_workshop_alert');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable_container_workshop_alert">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.addr_line_1}) | ${element.name} | 
                                      ${element.device_time_local}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlBatteryAlert = function (data,total,alert_type){
        document.getElementById('popup_batery_num').textContent = total[0]['counter'];
        document.getElementById('popup_batery_num_collapse').textContent = total[0]['counter'];

        let collapseinfo = document.getElementById('scrollable-container-baterylimit');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-baterylimit">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.addr_line_1}) | ${element.name} | 
                                      ${element.device_time_local}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.callApi = function (alert_type){
        axios
            .get(url + "/api/v2/alert/"+alert_type+"/" + user.id)
            .then((response) => {
                if('speed_alert' == alert_type){
                    _this.paintIntoHtmlSpeedAlert(response.data.top10,response.data.count,alert_type);
                } else if('rpm_alert' == alert_type){
                    _this.paintIntoHtmlRpmAlert(response.data.top10,response.data.count,alert_type);
                } else if('sos_alert' == alert_type){
                    _this.paintIntoHtmlSOSAlert(response.data.top10,response.data.count,alert_type);
                } else if('no_signal_alert' == alert_type){
                    _this.paintIntoHtmlNoSignalAlert(response.data.top10,response.data.count,alert_type);
                } else if('workshop_alert' == alert_type){
                    _this.paintIntoHtmlWorkShoplAlert(response.data.top10,response.data.count,alert_type);
                } else if('battery_disconnect_alert' == alert_type){
                    _this.paintIntoHtmlBatteryAlert(response.data.top10,response.data.count,alert_type);
                }
            })
            .catch(function (error)
            {
                if (isDebugCatch)
                {
                    console.error("AJAX | ERROR _> " + error);
                }
            });
    }

    _this.add = function (){
        _this.callApi('speed_alert');
        _this.callApi('rpm_alert');
        _this.callApi('sos_alert');
        _this.callApi('no_signal_alert');
        _this.callApi('workshop_alert');
        _this.callApi('battery_disconnect_alert');
    }

    _this.reload = function ()
    {
        setInterval(function () {
            _this.callApi('speed_alert');
            _this.callApi('rpm_alert');
            _this.callApi('sos_alert');
            _this.callApi('no_signal_alert');
            _this.callApi('workshop_alert');
            _this.callApi('battery_disconnect_alert');
        }, ajax_timer);
    };
}
