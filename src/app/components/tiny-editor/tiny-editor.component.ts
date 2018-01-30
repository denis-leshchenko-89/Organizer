import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output,
  forwardRef,
  OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/advlist/plugin.js';


import "tinymce/plugins/link/plugin.js";
import "tinymce/plugins/paste/plugin.js";
import "tinymce/plugins/table/plugin.js";
import "tinymce/plugins/advlist/plugin.js";
import "tinymce/plugins/anchor/plugin.js";
import "tinymce/plugins/autolink/plugin.js";
import "tinymce/plugins/autosave/plugin.js";
import "tinymce/plugins/charmap/plugin.js";
import "tinymce/plugins/code/plugin.js";
import "tinymce/plugins/colorpicker/plugin.js";
import "tinymce/plugins/contextmenu/plugin.js";
import "tinymce/plugins/fullscreen/plugin.js";
import "tinymce/plugins/image/plugin.js";
import "tinymce/plugins/lists/plugin.js";
import "tinymce/plugins/textpattern/plugin.js";
import "tinymce/plugins/noneditable/plugin.js";
import "tinymce/plugins/save/plugin.js";
import "tinymce/plugins/hr/plugin.js";
import "tinymce/plugins/preview/plugin.js";
import "tinymce/plugins/textcolor/plugin.js";
import "tinymce/plugins/nonbreaking/plugin.js";
import "tinymce/plugins/print/plugin.js";

import "tinymce/plugins/autoresize/plugin.js";
import "tinymce/plugins/fullpage/plugin.js";
import "tinymce/plugins/template/plugin.js";

declare var tinymce: any;

const contentAccessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TinyEditorComponent),
  multi: true
};

@Component({
  selector: 'org-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.scss'],
  providers: [contentAccessor],
})
export class TinyEditorComponent implements AfterViewInit, ControlValueAccessor,OnInit {


  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.editorContent = value;
  }

  @Input() elementId: String;
  @Input() content: String = null
  @Output() onEditorContentChange = new EventEmitter();

  constructor() { }

  editor;
  editorContent: string = null;

  ngOnInit() {
   
  }


  ngAfterViewInit() {
   tinymce.init({
      selector: `#${this.elementId}`,
      forced_root_block: "",
      plugins: 'advlist link paste table anchor autolink autosave charmap image lists colorpicker code contextmenu  textpattern noneditable save hr preview textcolor nonbreaking print',
      toolbar: 'formatselect | fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat ',
      fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 38px 40px 42px 44px 46px 48px 50px',
      image_advtab: true,
      skin_url: '/assets/skins/lightgray',
      language: 'ru',
      language_url: '/assets/languages/ru.js',
      schema: 'html5',
      height: 200,
      setup: editor => {
        this.editor = editor;

        editor.on('init', () => {
          const tinyContent = editor.setContent(this.content, { format: 'raw' });
          this.editorContent = tinyContent;
          this.onEditorContentChange.emit(tinyContent);
          this.onModelChange(tinyContent);
          this.onTouch();
        });

        editor.on('keyup change', () => {
          const tinyContent = editor.getContent();
          this.editorContent = tinyContent;
          this.onEditorContentChange.emit(tinyContent);
          this.onModelChange(tinyContent);
          this.onTouch();
        });

      }
    });  

  
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }


}
