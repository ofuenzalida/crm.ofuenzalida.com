/**
 * Libreria para manipulación de Popud en el sistema
 */
function Popup()
{
    let _this = this;
    let timeOut = 10000;

    _this.error = function (title, body)
    {
        toastr.error(body || 'Sin información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.success = function (title, body)
    {
        toastr.success(body || 'Sin información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.info = function (title, body)
    {
        toastr.info(body || 'Sin Información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.warning = function (title, body)
    {
        toastr.warning(body || 'Sin Información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.loading = function (title, body)
    {
        toastr.warning(body || 'Sin información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.show = function (title, body, type)
    {
        switch (type)
        {
            case 'error':
            {
                _this.error(title, body);
                break;
            }
            case 'success':
            {
                _this.error(title, body);
                break;
            }
            case 'warning':
            {
                _this.error(title, body);
                break;
            }
            case 'info':
            {
                _this.error(title, body);
                break;
            }
            default:
            {
                _this.info(title, body);
                break;
            }
        }
    };

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
                  });
    };
}
