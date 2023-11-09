import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EvaluacionJS } from 'src/app/interfaces/Evaluaciones';


@Injectable({
  providedIn: 'root'
})
export class FasesEvaluacionService {

  constructor(
    private firestore: AngularFirestore
  ) {

  }

  addFaseEva( evaluacion: JSON) {
    return this.firestore.collection('fasesEva').add(evaluacion);
  }

  // OBTENER LA INFORMACION DE LA EVALUACION POR MEDIO DEL ID DE LA FASE idfaseEva: number
  getFaseEva(idfaseEva: any) {
    return this.firestore.doc('fasesEva/' + idfaseEva).valueChanges();
  }

  // ELIMINAR LA INFORMACION DE LA EVALUACION
  deleteFaseEva(idfaseEva: any) {
    return this.firestore.collection('fasesEva').doc(idfaseEva).delete();
  }

  // EDITAR LA INFORMACION DE LA EVALUACION
  updateFaseEva(idFaseEva: any, faseEva: any) {
    return this.firestore.collection('fasesEva').doc(idFaseEva).update(faseEva);
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
