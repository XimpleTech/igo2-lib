import {
  Directive, HostListener, HostBinding, EventEmitter,
  Output, Input
} from '@angular/core';

@Directive({
  selector: '[igoDragAndDrop]'
})
export class DragAndDropDirective {
  get background(): string {
    return this._background;
  }
  @Input()
  get allowed_extensions() { return this._allowed_extensions; }
  set allowed_extensions(value: Array<string>) {
    this._allowed_extensions = value;
  }
  private _allowed_extensions: Array<string> = [];

  @Output() protected filesDropped: EventEmitter<File[]> = new EventEmitter();
  @Output() protected filesInvalid: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private _background = 'inherit';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this._background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this._background = 'inherit';
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this._background = 'inherit';
    const filesObj = this.validExtensions(evt);
    if (filesObj.valid.length) {
      this.filesDropped.emit(filesObj.valid);
    }
    if (filesObj.invalid.length) {
      this.filesInvalid.emit(filesObj.invalid);
    }
  }

  private validExtensions(evt) {
    const files = evt.dataTransfer.files;
    const filesObj = {
      valid: [],
      invalid: []
    };
    if (files.length > 0) {
      for (const file of files) {
        const ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowed_extensions.lastIndexOf(ext) !== -1 && file.size !== 0) {
          filesObj.valid.push(file);
        } else {
          filesObj.invalid.push(file);
        }
      };
    }

    return filesObj;
  }

}
