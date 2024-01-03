import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbsSubject = new BehaviorSubject<string[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  setBreadcrumb(breadcrumbs: any[]): void {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  getBreadcrumb(): any[] {
    return this.breadcrumbsSubject.getValue();
  }
}
