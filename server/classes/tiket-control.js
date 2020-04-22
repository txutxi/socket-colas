const fs = require('fs');


class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }

}




class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //para todos los tikets pendientes
        this.ultimos4 = []; // Los que muestro en la pantalla

        let data = require('../data/data.json');

        //console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }


    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        // let data = require('../data/data.json');
        // return data.ultimo;
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //shift(): elimina el primero del array ( <- )

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //unshift(): para añadir el nuevo ticket al inicio del array ( -> )
        this.ultimos4.unshift(atenderTicket);
        //elimino cuando sean + de 4 borra el ultimo elemento splice(-1,1):
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }


    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Reiniciando el sistema...');
        this.grabarArchivo();

    }


    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
        console.log('Grabando archivo..');

    }


}






module.exports = {
    TicketControl
}