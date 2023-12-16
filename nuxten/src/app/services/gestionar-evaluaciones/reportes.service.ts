import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EvidenciasService } from '../gestionar-fases/evidencias.service';
import { ToastrService } from 'ngx-toastr';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private API_SERVER = environment.posgresDB.API_SERVER + "reporteController/";
  evidencias!: any;

  constructor(
    private httpClient: HttpClient,
    private _evidenciasService: EvidenciasService,
    private toast: ToastrService
  ) {

  }

  guardarReporte(infoReport: any, reporte: any) {
    const reporteInfo = {
      nombreSitio: infoReport.evaInfo.nombreSitio,
      verUrl: infoReport.evaInfo.urlSitio,
      idEvaluacion: infoReport.evaInfo.idEvaluacion,
      archivoReporte: reporte,
      idGrupo: infoReport.evaInfo.idGrupo
    }
    return this.httpClient.post(this.API_SERVER + "saveReportData", reporteInfo);
  }

  generarContenido(imagenesConTitulos: any[]) {
    const contenido = [];

    imagenesConTitulos.forEach((imagen) => {
      const imagenDefinicion = [
        { image: imagen.imagen, width: 300, alignment: 'center' }, // Agrega la imagen
        { text: 'Evidencia.' + imagen.idEvid, alignment: 'center', style: 'Texto', margin: [0, 0, 0, 10] }, // Agrega el título
      ];

      contenido.push(imagenDefinicion);
    });

    return contenido;
  }

  generarReporte(infoReport: any) {
    const evaInfo = {
      idEva: infoReport.evaInfo.idEvaluacion,
      nombre: infoReport.evaInfo.nombreSitio,
      urlVer: infoReport.evaInfo.urlSitio,
      fecha: this.setDate(infoReport.evaInfo.fechaCreacion),
      tipo: infoReport.evaInfo.tipoSitio
    }

    const lista_expertos = infoReport.evaInfo.expertos.map(expert => [
      expert.nombres + ' ' + expert.apellidos,
      expert.correo,
      expert.numeroCelular
    ])

    const lista_problemas = infoReport.problemas.map(prob => [
      prob.num,
      prob.defProb,
      prob.expProb,
      prob.principios,
      prob.idEvid
    ]);

    const lista_prob_desv_prom = infoReport.problemasPromDesv.map(prob => [
      prob.num,
      prob.problema,
      prob.promedio.severidad.toFixed(1),
      prob.promedio.frecuencia.toFixed(1),
      prob.promedio.criticidad.toFixed(1),
      prob.desvEst.severidad.toFixed(4),
      prob.desvEst.frecuencia.toFixed(4),
      prob.desvEst.criticidad.toFixed(4),
    ]);

    const lista_soluciones = infoReport.soluciones.map(item => [
      item.num,
      item.def,
      item.solucion
    ]);

    this._evidenciasService.getAllEvidencias(infoReport.evaInfo.idEvaluacion).subscribe((evid: any) => {
      this.evidencias = evid;
      let lista_evidenvias = [];
      this.evidencias.map(evid => lista_evidenvias.push({
        idEvid: evid.idEvidencia,
        imagen: 'data:image/png;base64,' + evid.imagen
      }));
      const documentDefinition = {
        content: [
          {
            image: 'logo',
            width: 100,
            alignment: 'center'
          },
          { text: '\nDatos generales de la evaluación', style: 'header' },
          {
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
            ],
            style: 'separador'
          }, // separador
          {
            columns: [
              {
                width: 'auto',
                text: 'Evaluación: ',
                bold: true
              },
              {
                text: evaInfo.idEva,
                style: 'evainfo'
              }
            ]
          },
          {
            columns: [
              {
                width: 'auto',
                text: 'Nombre del sitio: ',
                bold: true
              },
              {
                text: evaInfo.nombre,
                style: 'evainfo'
              }
            ]
          },
          {
            columns: [
              {
                width: 'auto',
                text: 'Url / Version: ',
                bold: true
              },
              {
                text: evaInfo.urlVer,
                style: 'evainfo'
              }
            ]
          },
          {
            columns: [
              {
                width: 'auto',
                text: 'Fecha creación: ',
                bold: true
              },
              {
                text: evaInfo.fecha,
                style: 'evainfo'
              }
            ]
          },
          {
            columns: [
              {
                width: 'auto',
                text: 'Tipo de sitio: ',
                bold: true
              },
              {
                text: evaInfo.tipo,
                style: 'evainfo'
              }
            ]
          },
          {
            columns: [
              {
                width: 'auto',
                text: 'Expertos: ',
                bold: true
              }
            ]
          },
          {
            table: {
              body: [
                [{ text: 'Experto', style: 'tableHeader' }, { text: 'Correo Electronico', style: 'tableHeader' }, { text: 'Telefono', style: 'tableHeader' }],
                ...lista_expertos
              ]
            }
          },
          { text: '\nListado de problemas', style: 'header' },
          {
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
            ],
            style: 'separador'
          }, // separador
          {
            table: {
              body: [
                [{ text: 'Problema', style: 'tableHeader' }, { text: 'Definición del problema', style: 'tableHeader' }, { text: 'Descripción del problema', style: 'tableHeader' }, { text: 'Principios Incumplidos', style: 'tableHeader' }, { text: 'Evidencia', style: 'tableHeader' }],
                ...lista_problemas
              ]
            }
          },
          { text: '\nListado de problemas por promedio y desviación estandar', style: 'header' },
          {
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
            ],
            style: 'separador'
          }, // separador
          {
            table: {
              body: [
                [{ text: 'Problema', style: 'tableHeader' },
                { text: 'Def. del problema', style: 'tableHeader' },
                { text: 'Promedio Severidad', style: 'tableHeader' },
                { text: 'Promedio Frecuencia', style: 'tableHeader' },
                { text: 'Promedio Criticidad', style: 'tableHeader' },
                { text: 'Desv. Est. Severidad', style: 'tableHeader' },
                { text: 'Desv. Est. Frecuencia', style: 'tableHeader' },
                { text: 'Desv. Est. Criticidad', style: 'tableHeader' }],
                ...lista_prob_desv_prom
              ]
            }
          },
          // { text: '\n\nGrafica desviación', style: 'header' },
          // {
          //   stack: [
          //     { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
          //   ],
          //   style: 'separador'
          // }, // separador
          { text: '\nLista de soluciones', style: 'header' },
          {
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
            ],
            style: 'separador'
          }, // separador
          {
            table: {
              body: [
                [{ text: 'Problema', style: 'tableHeader' },
                { text: 'Definición del problema', style: 'tableHeader' },
                { text: 'Solución', style: 'tableHeader' }],
                ...lista_soluciones
              ]
            }
          },
          { text: '\nEvidencias', style: 'header' },
          {
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
            ],
            style: 'separador'
          }, // separador
          this.generarContenido(lista_evidenvias),
        ],
        footer: {
          text: 'NUXTEN',
          style: 'pieDePagina'
        },
        styles: {
          header: {
            fontSize: 14,
            bold: true
          },
          tableHeader: {
            alignment: 'center',
            fillColor: '#cccccc',
            bold: true
          },
          evainfo: {
            margin: [11, 0, 0, 0]
          },
          evid: {
            alignment: 'center'
          },
          Texto: {
            italics: true
          },
          pieDePagina: {
            fontSize: 10,
            italic: true,
            color: '#999999',
            alignment: 'center'
          },
          separador: {
            margin: [0, 10, 0, 10], // Margen superior e inferior para la línea
            border: [0, 0, 0, 1], // Configuración del borde inferior para simular la línea
          }
        },
        images: {
          logo: 'data:image/png;base64,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'
        }
      };
      // pdfMake.createPdf(documentDefinition).open();
      pdfMake.createPdf(documentDefinition).getBase64((reporte: string) => {
        this.guardarReporte(infoReport, reporte).subscribe({
          error: (error: any) => {
            if (error.status == 200) {
              this.toast.success("Reporte generado", "Mensaje de Confirmación");
            } else {
              this.toast.error("Algo salio mal, intenta de nuevo", "Mensaje de ERROR");
              console.log(error);
            }
          },
        });
      });
    });
  }

  getReportesByUserID(idUser: any) {
    return this.httpClient.get(this.API_SERVER + "obtenerReportesPorIdUser/" + idUser)
  }

  //RETORNA LA FECHA EN 
  setDate(fecha: any) {
    //CAMBIAR EL FORMATO DE LA FECHA DE CREACION
    const opcionesFechaHora: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    const fechaCreacion = new Date(fecha);
    return fechaCreacion.toLocaleString('es-ES', opcionesFechaHora);
  }
}
