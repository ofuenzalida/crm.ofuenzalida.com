import React, {Component} from "react";
import DataTable from "./DataTable";

export default class ReactDataTableApp extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const columns = ['id', 'name', 'imei', 'traccar_device_id', 'created_at'];
        return (
            <DataTable url="/api/v1/device/all" columns={columns}/>
        );
    }
}
