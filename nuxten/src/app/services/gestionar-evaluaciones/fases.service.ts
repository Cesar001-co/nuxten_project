import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FasesService {

  private state = new BehaviorSubject<any>('');
  state$ = this.state.asObservable();

  emitirFase(newState: any) {
    this.state.next(newState);
  }


}
