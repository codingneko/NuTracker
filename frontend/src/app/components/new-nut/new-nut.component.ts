import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-new-nut',
    templateUrl: './new-nut.component.html',
    styleUrls: ['./new-nut.component.scss'],
})
export class NewNutComponent {
    @Output()
    formSubmitted = new EventEmitter();

    newNutForm = this.formBuilder.group({
        date: [''],
        description: [''],
        score: [''],
    });

    constructor(private formBuilder: FormBuilder) {}
}
