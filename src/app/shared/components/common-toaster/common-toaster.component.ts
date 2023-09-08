import { Component,TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-common-toaster',
  templateUrl: './common-toaster.component.html',
  styleUrls: ['./common-toaster.component.scss']
})
export class CommonToasterComponent {
  constructor(public toastService: ToastService) {}

	isTemplate(toast:any) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}
