function statesvehiclesdate (op,div,ticket_id)
{ 
        let fdiv = div + "_" + ticket_id;
        let uri = "tracking/export/excel/history/ticket?ticket_code="+ticket_id+"&tbl=true";
        let cont;
        
        if (ticket_id !== "" || ticket_id !== null)
        {
            if (op == 0)
            {    
                cont = `<div><td style="white-space: pre-wrap;"><font color="#31314B">S/I</font></td></div>
                        <div><td style="white-space: pre-wrap;"><font color="#31314B">S/I</font></td></div>`;
                if (document.getElementById(fdiv) !== null) document.getElementById(fdiv).innerHTML = cont; 
            }   
            else
            {    
                let rst;
                let cont;
                let fcont;
                let hcont;
                fetch(uri)
                    .then(rst => rst.json())
                    .then((rst) => {

                        if (div == "ao") cont = rst.to_job_start.slice(0, 16);
                        if (div == "eo") cont = rst.job_start.slice(0, 16);
                        if (div == "de") cont = rst.unload_start.slice(0, 16);
                        if (div == "ap") cont = rst.to_plant_start.slice(0, 16);

                        if (cont !== "" || cont !== null)
                        {    
                
                            fcont = cont.slice(0, 10);
                            hcont = cont.slice(10, 16);
                            fcont = fcont.replace('T',' ');
                            hcont = hcont.replace('T',' ');
                            fcont = fcont.replace(' ','');
                            hcont = hcont.replace(' ','');

                            cont = `<div class="row"><td style="white-space: pre-wrap;">`+fcont+`</td></div><div class="row"><td>`+hcont+`</td></tr>`
                            if (document.getElementById(fdiv) !== null) document.getElementById(fdiv).innerHTML = cont; 
                        }    
                })   
            }
        }
}