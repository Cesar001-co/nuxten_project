import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FasesEvaluacionService {

  constructor(
    private firestore: AngularFirestore
  ) {

  }

  addFaseEva(evaluacion: JSON) {
    return this.firestore.collection('fasesEva').add(evaluacion);
  }

  // OBTENER LA INFORMACION DE LA EVALUACION POR MEDIO DEL ID DE LA FASE idfaseEva: number
  getFaseEva(idfaseEva: any) {
    return this.firestore.doc('fasesEva/' + idfaseEva).valueChanges();
  }

  // OBTENER LA INFORMACION DE LA EVALUACION POR MEDIO DEL ID DE LA FASE idfaseEva: number (SIN DETECTAR CAMBIOS)
  getFaseEvaNoChanges(idfaseEva: any) {
    return this.firestore.doc('fasesEva/' + idfaseEva).get();
  }

  // ELIMINAR LA INFORMACION DE LA EVALUACION
  deleteFaseEva(idfaseEva: any) {
    return this.firestore.collection('fasesEva').doc(idfaseEva).delete();
  }

  // EDITAR LA INFORMACION DE LA EVALUACION
  updateFaseEva(idFaseEva: any, faseEva: any) {
    return this.firestore.collection('fasesEva').doc(idFaseEva).update(faseEva);
  }

  //AGREGAR UN PROBLEMA A LA LISTA DEL EXPERTO
  addProblema(idFaseEva: any, problema: any, usePos: any) {
    return this.firestore.collection('fasesEva').doc(idFaseEva).get().toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          let fase1Problemas = doc.data()?.Fase1.problemas;
          fase1Problemas[usePos].listaProb.push(problema);
          const rutaListaProb = `Fase1.problemas`;
          return this.firestore.collection('fasesEva').doc(idFaseEva).update({
            [rutaListaProb]: fase1Problemas
          });
        } else {
          console.log('El documento no existe o es nulo/undefined');
          return Promise.reject('Documento no encontrado');
        }
      });
  }

  //METODO PARA ELIMINAR UN PROBLEMA DE LA LISTA DE PROBLEMAS DE LA FASE 1 DEL EXPERTO
  deleteProblema(idFaseEva: any, problemas: any, usePos: any) {
    return this.firestore.collection('fasesEva').doc(idFaseEva).get().toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          let fase1Problemas = doc.data()?.Fase1.problemas;
          fase1Problemas[usePos].listaProb = problemas;
          const rutaListaProb = `Fase1.problemas`;
          return this.firestore.collection('fasesEva').doc(idFaseEva).update({
            [rutaListaProb]: fase1Problemas
          });
        } else {
          console.log('El documento no existe o es nulo/undefined');
          return Promise.reject('Documento no encontrado');
        }
      });
  }

  //EDITAR EL PROBLEMA EN ESPEFICIFICO DE LA LISTAPROBLEMAS
  updateProblema(idFaseEva: any, problema: any, posicion: number): Promise<void> {
    return this.firestore.collection('fasesEva').doc(idFaseEva).get().toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          const listaProblemas = doc.data()?.listaProblemas || [];

          // Actualizar solo el elemento en la posición especificada
          if (listaProblemas.length > posicion) {
            listaProblemas[posicion] = problema;
          }

          // Guardar la matriz actualizada en el documento
          return this.firestore.collection('fasesEva').doc(idFaseEva).update({
            listaProblemas: listaProblemas
          });
        } else {
          console.log('El documento no existe o es nulo/undefined');
          return Promise.reject('Documento no encontrado');
        }
      })
      .catch(error => {
        console.error('Error al actualizar elemento de listaProblemas:', error);
        return Promise.reject(error);
      });
  }

  //CONTAR CUANTOS EXPERTOS EN LA FASE ESTAN EN TRUE
  expertosCount(evaFases: any): number {
    let count = 0;
    for (let index = 0; index < evaFases.length; index++) {
      if (evaFases[index] == true) {
        count++;
      }
    }
    return count
  }
}
