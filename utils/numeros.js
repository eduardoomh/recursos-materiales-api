
function padLeft(value, length) {
    return (value.toString().length < length) ? padLeft("0" + value, length) : 
    value;
}

function fechaInicio(){
    var f = new Date();
    return `${f.getFullYear()}-${padLeft(f.getMonth()+1,2)}-01`;
}

function fechaFinal(){
    var f = new Date();
    return `${f.getFullYear()}-${padLeft(f.getMonth()+1,2)}-28`;
}

module.exports = {
    fechaInicio,
    fechaFinal,
    padLeft
}