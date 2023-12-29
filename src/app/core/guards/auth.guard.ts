import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  return true;
};
