import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../environments/environment';

const BASE_URL = environment.baseUrl;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string = ''): string {
    return img ? `${BASE_URL}/api/uploads/img/${img}` : `${BASE_URL}/images/no-image.png`;
  }

}
