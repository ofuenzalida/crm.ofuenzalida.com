function Controlling()
{
    let _this = this;

    _this.updateLoadIncomplete = function ()
    {
        Echo.channel('POL_PROD_MOVE_home').listen('NewMessage', (e) =>
        {
            if (isDebugInfo) {
                console.log(e); //isDebugInfo
            }
            $("#updateLoadIncomplete").html(e.message);
        });
    };
    _this.updateLoadIncompleteAjax = function ()
    {
        $.ajax({
                   data: '',
                   url: app.url.controlling.updateLoadIncomplete,
                   type: 'GET',
                   dataType: 'JSON',
                   success: function (res)
                   {
                       dd(res.data);
                       $("#updateLoadIncomplete").html(res.data);
                   },
                   error: function (data)
                   {
                       if (isDebugInfo) {
                           console.log('Error:', data); //isDebugInfo
                       }
                       //$('#saveBtn').html('Save Changes');
                   }
               });
    };
    _this.updateLoadCompleteAjax = function ()
    {
        $.ajax({
                   data: '',
                   url: app.url.controlling.updateLoadComplete,
                   type: 'GET',
                   dataType: 'JSON',
                   success: function (res)
                   {
                       dd(res.data);
                       $("#updateLoadComplete").html(res.data);
                   },
                   error: function (data)
                   {
                       if (isDebugInfo) {
                           console.log('Error:', data); //isDebugInfo
                       }
                       //$('#saveBtn').html('Save Changes');
                   }
               });
    };

    _this.updateLoadScheduledAjax = function ()
    {
        $.ajax({
                   data: '',
                   url: app.url.controlling.updateLoadScheduled,
                   type: 'GET',
                   dataType: 'JSON',
                   success: function (res)
                   {
                       dd(res.data);
                       $("#updateLoadScheduled").html(res.data);
                   },
                   error: function (data)
                   {
                       if (isDebugInfo) {
                           console.log('Error:', data); //isDebugInfo
                       }
                       //$('#saveBtn').html('Save Changes');
                   }
               });
    };
};
