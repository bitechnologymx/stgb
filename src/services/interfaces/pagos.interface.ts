export class TipoOperacionPago {
    codigo: string;
    descripcion: string;
}

export class TrxFavoritaTjta {
    tipoOperacion : string;
    descripcion   : string;
    cuentaDebito  : string;
    numTarjeta    : string;
    monto         : string;
}

export class TrxFavoritaPmo {
    tipoOperacion : string;
    descripcion   : string;
    cuentaDebito  : string;
    numPrestamo   : string;
    monto         : string;
}

export class TrxFavoritaServ {
    tipoOperacion : string;
    descTipoOper  : string;
    categoria     : string;
    descCategoria : string;
    servicio      : string;
    descServicio  : string;
    cuentaDebito  : string;
    cuentaDestino : string;
    descripcion   : string;
    monto         : string;
}

export class Categoria {
    codigo      : string;
    descripcion : string;
}

export class Servicio {
    codigo      : string;
    descripcion : string;
}

export class LabelServicio {
    label      : string;
    longCuenta : string;
}