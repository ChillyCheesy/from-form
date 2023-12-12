import { EmbeddedViewRef, Injectable } from '@angular/core';
import { HTMLInputAccessor } from '../forms/accessor/html-input.accessor';
import { FromControllerAccessor } from '../forms/models';

@Injectable()
export class FromFormAccessorFactory {

  public createAccessor<T>(viewRef: EmbeddedViewRef<any>): FromControllerAccessor<T> | undefined {
    const inputElement: HTMLInputElement | undefined = this.searchHTMLInputElement<T>(viewRef);
    if (inputElement) return new HTMLInputAccessor<T>(inputElement);
    return undefined;
  }

  private searchHTMLInputElement<T>(viewRef: EmbeddedViewRef<any>): HTMLInputElement | undefined {
    const elements: HTMLElement[] = viewRef.rootNodes;
    for (const element of elements) {
      if (element instanceof HTMLInputElement) return element;
      else if (!(element instanceof HTMLElement)) continue;
      const inputElement: HTMLInputElement | null = element.querySelector('input');
      if (inputElement) return inputElement;
    }
    return undefined;
  }

}
