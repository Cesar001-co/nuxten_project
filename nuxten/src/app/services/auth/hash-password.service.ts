import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class HashPasswordService {
  
  constructor() { }

  encypt(password: string): any {
    return bcrypt.hash(password, 10);
  }

  compare(password: any, hashPassword: any) {
    return bcrypt.compare(password, hashPassword);
  } 
}
