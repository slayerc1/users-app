import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../interfaces/users.interface';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(user: User): string {
    if (user.urlImage) {
      return user.urlImage;
    } else {
      return 'assets/no-image.png';
    }
  }
}
