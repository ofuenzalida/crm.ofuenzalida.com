// se da funcionalidad de click simple a doble click en mapa
if(map != undefined){
    map._events.dblclick = map._events.click
    // se elimina cualquier evento click izquierdo en el MAPA
    map._events.click = false
}
