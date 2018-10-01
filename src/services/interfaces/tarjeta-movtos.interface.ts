export class MovtoCorriente {
    fechaMov    : string;
    fechaPosteo : string;
    descripcion : string;
    monto       : string;
    referencia  : string;
    tc          : string;
}

export class MovtoFlotante {
    fechaMov    : string;
    descripcion : string;
    monto       : string;
    tc          : string;
}

export class MovtoResumen {
    nombre             : string;
    fechaCorte         : string;
    numCuenta          : string;
    fechaPagoContado   : string;
    pagoContado        : string;
    status             : string;
    fechaPagoMinimo    : string;
    tipoTarjeta        : string;
    balanceAnterior    : string;
    fechaVencimiento   : string;
    comprasRetiros     : string;
    cargosVarios       : string;
    cargosFinancieros  : string;
    limiteCredito      : string;
    pagosCreditos      : string;
    saldoActual        : string;
    saldoAlCorte       : string;
    flotes             : string;
    pagoMinimo         : string;
    creditoDisponible  : string;
    puntosPromerica    : string;
    sobregiro          : string;
    financiamiento     : string;
    numTjtasAdicionales: string;
}
