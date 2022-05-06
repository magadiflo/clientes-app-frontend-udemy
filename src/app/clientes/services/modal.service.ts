import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _notificarUpload: EventEmitter<any> = new EventEmitter();

  public get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  constructor() { }
}
