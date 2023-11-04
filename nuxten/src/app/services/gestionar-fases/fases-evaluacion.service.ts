import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, getDoc } from "firebase/firestore";
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FasesEvaluacionService {

  constructor(
    private firestore: Firestore
  ) {

  }

  addFaseEva( evaluacion: JSON) {
    const placeRef = collection(this.firestore, 'fasesEva');
    return addDoc(placeRef, evaluacion);
  }

  // OBTENER LA INFORMACION DE LA EVALUACION POR MEDIO DEL ID DE LA FASE idfaseEva: number
  getFaseEva(idfaseEva: any) {
    
  }

  // //EDITAR LA INFORMACION DE LA EVALUACION
  // updateFaseEva(faseEva: any) {
  //   return this.httpClient.post(this.API_SERVER + "updateFaseEva", faseEva);
  // }
}
